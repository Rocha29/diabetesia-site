// Formatos da página do médico (pt-BR), puros.

const pad = (n: number) => String(n).padStart(2, '0');
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/** '2026-10-07' → '07/10/2026'. */
export const fmtDay = (day: string) => `${day.slice(8, 10)}/${day.slice(5, 7)}/${day.slice(0, 4)}`;
/** '2026-10-07' → '07/10'. */
export const fmtDayShort = (day: string) => `${day.slice(8, 10)}/${day.slice(5, 7)}`;
/** '2026-10-07' → 'Ter, 07/10' (dia da semana do próprio dia, sem fuso). */
export const fmtWeekday = (day: string) => `${WEEKDAYS[new Date(`${day}T12:00:00Z`).getUTCDay()]}, ${fmtDayShort(day)}`;
/** ISO → '14/10/2026 às 09:12' no horário de quem abre. */
export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} às ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Número pt-BR com no máximo 1 casa (138 / 152,3). */
export const fmtNum = (n: number) => (Math.round(n * 10) / 10).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
export const pct = (part: number, total: number) => (total > 0 ? Math.round((part / total) * 100) : 0);
export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** Marca do valor fora da faixa: seta + cor (nunca só cor). */
export function rangeMark(v: number): 'low' | 'high' | null {
  if (v < 70) return 'low';
  if (v > 180) return 'high';
  return null;
}

/** Pontos do gráfico de média diária (viewBox 320×110; faixa 70–180 sombreada). */
export function chartPoints(rows: { day: string; mean: number }[]) {
  const yMin = 40;
  const yMax = 300;
  const top = 8;
  const bottom = 92;
  const y = (v: number) => top + ((yMax - Math.min(yMax, Math.max(yMin, v))) / (yMax - yMin)) * (bottom - top);
  const left = 40;
  const right = 300;
  const n = rows.length;
  const x = (i: number) => (n <= 1 ? (left + right) / 2 : left + (i * (right - left)) / (n - 1));
  const every = Math.max(1, Math.ceil(n / 7));
  return {
    band: { y180: y(180), y70: y(70) },
    points: rows.map((r, i) => ({ x: Math.round(x(i) * 10) / 10, y: Math.round(y(r.mean) * 10) / 10, day: r.day, mean: r.mean, label: i % every === 0 || i === n - 1 })),
  };
}
