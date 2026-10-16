// Página do médico (issue V2 #15): lê o resumo do relatório direto da API REST
// do Firestore, sem chave de API e sem login. As regras do Firestore só
// liberam o GET de um link válido (não revogado, não expirado) e a criação do
// registro de abertura { at: horário do servidor }.
// O token vem do fragmento da URL (#token) e só é enviado ao Firestore.

/** Projeto do Firestore (não aparece em nenhum texto da página). */
export const FIRESTORE_PROJECT_ID: string = import.meta.env.VITE_REPORT_FIRESTORE_PROJECT_ID || 'diabetesia-backend';

const API = 'https://firestore.googleapis.com/v1';

/** 32 bytes em base64url = 43 caracteres. */
export const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

/** Token do fragmento (#token); null quando ausente ou malformado. */
export function tokenFromHash(hash: string): string | null {
  const t = (hash || '').replace(/^#/, '').trim();
  return TOKEN_RE.test(t) ? t : null;
}

// ---------- tipos de valor da API REST do Firestore ----------

export type FsValue =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { stringValue: string }
  | { timestampValue: string }
  | { mapValue: { fields?: Record<string, FsValue> } }
  | { arrayValue: { values?: FsValue[] } };

/** Converte um valor REST do Firestore em JS (timestamp vira string ISO). */
export function decodeValue(v: FsValue): unknown {
  if ('nullValue' in v) return null;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return Number(v.doubleValue);
  if ('stringValue' in v) return v.stringValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('mapValue' in v) return decodeFields(v.mapValue.fields ?? {});
  if ('arrayValue' in v) return (v.arrayValue.values ?? []).map(decodeValue);
  return undefined;
}

export function decodeFields(fields: Record<string, FsValue>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = decodeValue(v);
  return out;
}

// ---------- modelo do relatório compartilhado (esquema v1) ----------

export interface Pair {
  systolic: number;
  diastolic: number;
}

export interface DailyRow {
  day: string;
  count: number;
  mean: number;
  min: number;
  max: number;
}

export interface Summary {
  v: 1;
  days: number;
  daysWithAnyRecord: number;
  glucose: {
    count: number;
    daysWithData: number;
    average: number | null;
    min: number | null;
    max: number | null;
    below70: number;
    inRange: number;
    above180: number;
    daily: DailyRow[];
  };
  bloodPressure: { count: number; days: number; average: Pair | null; highest: Pair | null; lowest: Pair | null } | null;
  medication: { records: number; daysWithRecord: number };
  meals: { count: number; daysWithRecord: number };
}

export interface SharedReport {
  summary: Summary;
  period: 'week' | 'month';
  from: string;
  to: string;
  createdAt: string;
  expiresAt: string;
  revoked: boolean;
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const isNumOrNull = (v: unknown) => v === null || isNum(v);
const isDay = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isPairOrNull = (v: unknown) => v === null || (isObj(v) && isNum(v.systolic) && isNum(v.diastolic));

/** Confere a forma antes de mostrar (o backend já validou; aqui é defesa). */
export function parseSharedReport(doc: Record<string, unknown>): SharedReport | null {
  const s = doc.summary;
  if (!isObj(s) || s.v !== 1 || !isNum(s.days) || !isNum(s.daysWithAnyRecord)) return null;
  const g = s.glucose;
  if (!isObj(g) || !isNum(g.count) || !isNum(g.daysWithData) || !isNumOrNull(g.average) || !isNumOrNull(g.min) || !isNumOrNull(g.max)) return null;
  if (!isNum(g.below70) || !isNum(g.inRange) || !isNum(g.above180) || !Array.isArray(g.daily)) return null;
  for (const r of g.daily) if (!isObj(r) || !isDay(r.day) || !isNum(r.count) || !isNum(r.mean) || !isNum(r.min) || !isNum(r.max)) return null;
  const bp = s.bloodPressure;
  if (bp !== null && !(isObj(bp) && isNum(bp.count) && isNum(bp.days) && isPairOrNull(bp.average) && isPairOrNull(bp.highest) && isPairOrNull(bp.lowest))) return null;
  const m = s.medication;
  const meals = s.meals;
  if (!isObj(m) || !isNum(m.records) || !isNum(m.daysWithRecord) || !isObj(meals) || !isNum(meals.count) || !isNum(meals.daysWithRecord)) return null;
  if ((doc.period !== 'week' && doc.period !== 'month') || !isDay(doc.from) || !isDay(doc.to)) return null;
  if (typeof doc.createdAt !== 'string' || typeof doc.expiresAt !== 'string' || typeof doc.revoked !== 'boolean') return null;
  if (Number.isNaN(Date.parse(doc.createdAt)) || Number.isNaN(Date.parse(doc.expiresAt))) return null;
  return {
    summary: s as unknown as Summary,
    period: doc.period,
    from: doc.from,
    to: doc.to,
    createdAt: doc.createdAt,
    expiresAt: doc.expiresAt,
    revoked: doc.revoked,
  };
}

// ---------- estados da página ----------

export type LoadResult =
  | { status: 'ok'; report: SharedReport }
  /** Expirado, revogado ou apagado: a mesma mensagem nos três casos. */
  | { status: 'unavailable' }
  /** Token ausente, malformado ou documento ilegível. */
  | { status: 'invalid' }
  /** Rede ou erro do servidor: dá para tentar de novo. */
  | { status: 'error' };

type FetchLike = (input: string, init?: RequestInit) => Promise<Pick<Response, 'status' | 'ok' | 'json'>>;

const docUrl = (projectId: string, token: string) => `${API}/projects/${projectId}/databases/(default)/documents/sharedReports/${token}`;

/** Sem cookies, sem cache, sem Referer. */
const PRIVATE_FETCH: RequestInit = { credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer' };

/**
 * 200 → relatório (ou "não disponível" se já expirou/foi revogado no relógio local);
 * 403 → não disponível (as regras negam expirado, revogado e inexistente);
 * 404/400 → inválido; outro status ou falha de rede → erro (tentar de novo).
 */
export async function loadReport(token: string | null, { fetch: f = fetch as FetchLike, projectId = FIRESTORE_PROJECT_ID, now = () => new Date() } = {}): Promise<LoadResult> {
  if (!token || !TOKEN_RE.test(token)) return { status: 'invalid' };
  let res: Awaited<ReturnType<FetchLike>>;
  try {
    res = await f(docUrl(projectId, token), { ...PRIVATE_FETCH, method: 'GET' });
  } catch {
    return { status: 'error' };
  }
  if (res.status === 403) return { status: 'unavailable' };
  if (res.status === 404 || res.status === 400) return { status: 'invalid' };
  if (!res.ok) return { status: 'error' };
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    return { status: 'error' };
  }
  const fields = isObj(body) && isObj(body.fields) ? (body.fields as Record<string, FsValue>) : null;
  const report = fields ? parseSharedReport(decodeFields(fields)) : null;
  if (!report) return { status: 'invalid' };
  if (report.revoked || Date.parse(report.expiresAt) <= now().getTime()) return { status: 'unavailable' };
  return { status: 'ok', report };
}

/** Id aleatório de 20 caracteres para o documento de acesso. */
export function randomId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

/**
 * Corpo do commit que registra uma abertura: cria
 * sharedReports/{token}/accesses/{id} só com `at` = horário do servidor
 * (transform REQUEST_TIME), como as regras exigem.
 */
export function accessCommitBody(projectId: string, token: string, id: string) {
  return {
    writes: [
      {
        update: { name: `projects/${projectId}/databases/(default)/documents/sharedReports/${token}/accesses/${id}`, fields: {} },
        updateTransforms: [{ fieldPath: 'at', setToServerValue: 'REQUEST_TIME' }],
        currentDocument: { exists: false },
      },
    ],
  };
}

/** Registra a abertura. Nunca quebra a página: falha é ignorada. */
export async function logAccess(token: string, { fetch: f = fetch as FetchLike, projectId = FIRESTORE_PROJECT_ID, id }: { fetch?: FetchLike; projectId?: string; id?: string } = {}): Promise<boolean> {
  try {
    const res = await f(`${API}/projects/${projectId}/databases/(default)/documents:commit`, {
      ...PRIVATE_FETCH,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accessCommitBody(projectId, token, id ?? randomId())),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}
