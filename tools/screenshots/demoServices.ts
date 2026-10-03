// Drop-in replacement for '@/services' used ONLY by the screenshot harness
// (vite.config.demo.ts aliases '@/services' -> this file). Everything is
// in-memory, fictional demo data — no network, no Firebase, no /api.
// It re-exports exactly the same names as src/services/index.ts.
import type { AuthService, AppUser } from '@/services/auth/authService';
import type { EntryRepository, PrescriptionRepository } from '@/services/entries/entryRepository';
import type { ProfileRepository } from '@/services/profile/profileRepository';
import type { ConsentRecord, DataCounts, PrivacyRepository } from '@/services/privacy/privacyRepository';
import type { TrendSummaryRepository } from '@/services/tracking/trendSummaryRepository';
import type { AiService } from '@/services/ai/aiService';
import type {
  Entry,
  EntryKind,
  FoodEntry,
  FoodInput,
  GlucoseEntry,
  GlucoseInput,
  MedicationEntry,
  MedicationInput,
  Prescription,
  PrescriptionInput,
} from '@/types/entries';
import type { Checkin, CheckinInput, HealthProfile, HealthProfileInput } from '@/types/profile';
import type {
  AiCloudUsage,
  ChatMessage,
  GlucoseReading,
  MealReading,
  MedicationReading,
  PrescriptionReading,
} from '@/types/ai';
import type { TrendSummaryCache, TrendSummaryInput, TrendSummaryResult } from '@/types/tracking';

export { isFirebaseConfigured } from './demoFirebaseApp';

// ─── Demo user ──────────────────────────────────────────────────────────────

const DEMO_USER: AppUser = {
  uid: 'demo-ana-souza',
  displayName: 'Ana Souza',
  email: 'ana@exemplo.com',
  photoUrl: null,
};

const loggedOut = typeof location !== 'undefined' && new URLSearchParams(location.search).get('demo') === 'loggedout';

export type { AppUser };

// ─── authService ────────────────────────────────────────────────────────────

export const authService: AuthService = {
  onChange(listener) {
    // Fire asynchronously, like a real Firebase onAuthStateChanged.
    const id = setTimeout(() => listener(loggedOut ? null : DEMO_USER), 0);
    return () => clearTimeout(id);
  },
  async signInWithGoogle() {
    // no-op in the demo harness
  },
  async signOut() {
    // no-op in the demo harness
  },
  async getIdToken() {
    return 'demo-token';
  },
};

// ─── tiny in-memory "database" ──────────────────────────────────────────────

let nextId = 1;
const id = () => `demo-${nextId++}`;

const now = new Date();
const daysAgo = (n: number, hour = 8, minute = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  d.setHours(hour, minute, 0, 0);
  return d;
};

const GLUCOSE_ANALYSIS =
  'Registro de jejum dentro da faixa geral usada no app (70–180 mg/dL).';
const MEAL_ANALYSIS =
  'Refeição com arroz, feijão e salada; carboidratos informados: 55 g.';
const MED_ANALYSIS =
  'Registro de medicamento: Metformina, 500 mg, horário informado às 08:15';

let glucoseEntries: GlucoseEntry[] = [
  mkGlucose(9, 8, 10, 98, 'fasting'),
  mkGlucose(9, 13, 0, 142, 'postMeal'),
  mkGlucose(8, 7, 50, 91, 'fasting'),
  mkGlucose(8, 22, 10, 65, 'beforeSleep', 'Senti um pouco de tremor antes de medir.'),
  mkGlucose(7, 8, 5, 104, 'fasting'),
  mkGlucose(7, 19, 30, 178, 'postMeal'),
  mkGlucose(6, 8, 0, 96, 'fasting'),
  mkGlucose(6, 14, 15, 230, 'postMeal', 'Comi um pedaço de bolo na festa.'),
  mkGlucose(5, 7, 45, 88, 'fasting'),
  mkGlucose(4, 20, 0, 150, 'postMeal'),
  mkGlucose(3, 8, 20, 92, 'fasting'),
  mkGlucose(2, 13, 10, 160, 'postMeal'),
  mkGlucose(1, 7, 40, 99, 'fasting'),
  mkGlucose(0, 8, 0, 108, 'random', 'Medição da manhã, antes do café.'),
];

function mkGlucose(
  day: number,
  hour: number,
  minute: number,
  value: number,
  context: GlucoseEntry['context'],
  description?: string,
): GlucoseEntry {
  const createdAt = daysAgo(day, hour, minute);
  return {
    id: id(),
    userId: DEMO_USER.uid,
    description,
    aiAnalysis: GLUCOSE_ANALYSIS,
    createdAt,
    updatedAt: createdAt,
    kind: 'glucose',
    value,
    unit: 'mg/dL',
    context,
  };
}

let foodEntries: FoodEntry[] = [
  mkFood(9, 12, 30, 'Arroz, feijão, frango grelhado e salada', 'lunch', 65),
  mkFood(8, 8, 0, 'Pão integral com queijo branco e café com leite', 'breakfast', 40),
  mkFood(7, 19, 0, 'Macarrão ao molho de tomate com carne moída', 'dinner', 70),
  mkFood(6, 16, 0, 'Fruta (maçã) e castanhas', 'snack', 20),
  mkFood(4, 19, 30, 'Sopa de legumes com frango desfiado', 'dinner', 35),
  mkFood(2, 12, 45, 'Peixe grelhado, purê de batata e legumes', 'lunch', 45),
];

function mkFood(day: number, hour: number, minute: number, description: string, mealType: FoodEntry['mealType'], carbs: number): FoodEntry {
  const createdAt = daysAgo(day, hour, minute);
  return {
    id: id(),
    userId: DEMO_USER.uid,
    description,
    aiAnalysis: MEAL_ANALYSIS,
    createdAt,
    updatedAt: createdAt,
    kind: 'food',
    mealType,
    estimatedCarbs: carbs,
  };
}

let medicationEntries: MedicationEntry[] = [
  mkMedication(9, 8, 15, 'Metformina', '500', 'mg'),
  mkMedication(9, 20, 15, 'Insulina NPH', '10', 'UI'),
  mkMedication(7, 8, 15, 'Metformina', '500', 'mg'),
  mkMedication(7, 20, 15, 'Insulina NPH', '10', 'UI'),
  mkMedication(5, 8, 15, 'Metformina', '500', 'mg'),
  mkMedication(3, 8, 15, 'Metformina', '500', 'mg'),
  mkMedication(1, 8, 15, 'Metformina', '500', 'mg'),
  mkMedication(0, 8, 15, 'Metformina', '500', 'mg'),
];

function mkMedication(day: number, hour: number, minute: number, name: string, dose: string, unit: string): MedicationEntry {
  const createdAt = daysAgo(day, hour, minute);
  return {
    id: id(),
    userId: DEMO_USER.uid,
    description: undefined,
    aiAnalysis: MED_ANALYSIS,
    createdAt,
    updatedAt: createdAt,
    kind: 'medication',
    medicationName: name,
    dose,
    unit,
    takenAt: createdAt,
  };
}

let prescriptions: Prescription[] = [
  {
    id: id(),
    userId: DEMO_USER.uid,
    doctorName: 'Dra. Camila Nogueira (CRM 123456)',
    notes: 'Metformina 500mg 2x/dia; Insulina NPH 10 UI à noite. Retorno em 3 meses.',
    photoUrls: [],
    driveFileIds: [],
    createdAt: daysAgo(30, 10, 0),
    updatedAt: daysAgo(30, 10, 0),
  },
];

function allEntries(): Entry[] {
  return [...glucoseEntries, ...foodEntries, ...medicationEntries].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

// ─── entryRepository / prescriptionRepository ──────────────────────────────

export const entryRepository: EntryRepository = {
  watchRecent(_userId, since, onData) {
    onData(allEntries().filter((e) => e.createdAt >= since));
    return () => {};
  },

  async listInRange(_userId, from, to) {
    return allEntries().filter((e) => e.createdAt >= from && e.createdAt <= to);
  },

  async get(_userId, kind, entryId) {
    return allEntries().find((e) => e.kind === kind && e.id === entryId) ?? null;
  },

  async createGlucose(_userId, input: GlucoseInput) {
    const createdAt = new Date();
    glucoseEntries = [
      {
        id: id(),
        userId: DEMO_USER.uid,
        description: input.description,
        aiAnalysis: input.aiAnalysis,
        createdAt,
        updatedAt: createdAt,
        kind: 'glucose',
        value: input.value,
        unit: input.unit,
        context: input.context,
      },
      ...glucoseEntries,
    ];
  },

  async createFood(_userId, input: FoodInput) {
    const createdAt = new Date();
    foodEntries = [
      {
        id: id(),
        userId: DEMO_USER.uid,
        description: input.description,
        aiAnalysis: input.aiAnalysis,
        createdAt,
        updatedAt: createdAt,
        kind: 'food',
        mealType: input.mealType,
        estimatedCarbs: input.estimatedCarbs,
      },
      ...foodEntries,
    ];
  },

  async createMedication(_userId, input: MedicationInput) {
    const createdAt = new Date();
    medicationEntries = [
      {
        id: id(),
        userId: DEMO_USER.uid,
        description: input.description,
        aiAnalysis: input.aiAnalysis,
        createdAt,
        updatedAt: createdAt,
        kind: 'medication',
        medicationName: input.medicationName,
        dose: input.dose,
        unit: input.unit,
        takenAt: input.takenAt ?? createdAt,
      },
      ...medicationEntries,
    ];
  },

  async updateGlucose(_userId, entryId, input: GlucoseInput) {
    glucoseEntries = glucoseEntries.map((e) =>
      e.id === entryId
        ? { ...e, value: input.value, unit: input.unit, context: input.context, description: input.description, aiAnalysis: input.aiAnalysis, updatedAt: new Date() }
        : e,
    );
  },

  async updateFood(_userId, entryId, input: FoodInput) {
    foodEntries = foodEntries.map((e) =>
      e.id === entryId
        ? { ...e, description: input.description, mealType: input.mealType, estimatedCarbs: input.estimatedCarbs, aiAnalysis: input.aiAnalysis, updatedAt: new Date() }
        : e,
    );
  },

  async updateMedication(_userId, entryId, input: MedicationInput) {
    medicationEntries = medicationEntries.map((e) =>
      e.id === entryId
        ? { ...e, medicationName: input.medicationName, dose: input.dose, unit: input.unit, description: input.description, aiAnalysis: input.aiAnalysis, updatedAt: new Date() }
        : e,
    );
  },

  async remove(_userId, kind: EntryKind, entryId) {
    if (kind === 'glucose') glucoseEntries = glucoseEntries.filter((e) => e.id !== entryId);
    if (kind === 'food') foodEntries = foodEntries.filter((e) => e.id !== entryId);
    if (kind === 'medication') medicationEntries = medicationEntries.filter((e) => e.id !== entryId);
  },
};

export const prescriptionRepository: PrescriptionRepository = {
  watchAll(_userId, onData) {
    onData(prescriptions);
    return () => {};
  },
  async create(_userId, input: PrescriptionInput) {
    prescriptions = [
      {
        id: id(),
        userId: DEMO_USER.uid,
        doctorName: input.doctorName,
        notes: input.notes,
        photoUrls: [],
        driveFileIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...prescriptions,
    ];
  },
  async remove(_userId, entryId) {
    prescriptions = prescriptions.filter((p) => p.id !== entryId);
  },
};

// ─── profileRepository ──────────────────────────────────────────────────────

let profile: HealthProfile = {
  sex: 'female',
  birthDate: '1988-04-12',
  heightCm: 165,
  weightKg: 68.4,
  weightUpdatedAt: daysAgo(3),
  createdAt: daysAgo(60),
  updatedAt: daysAgo(3),
};

let checkins: Checkin[] = [
  {
    month: monthKey(daysAgo(3)),
    weightKg: 68.4,
    smoking: 'no',
    physicallyActive: true,
    exerciseDaysPerWeek: 3,
    source: 'v2',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    month: monthKey(daysAgo(33)),
    weightKg: 69.2,
    smoking: 'no',
    physicallyActive: true,
    exerciseDaysPerWeek: 2,
    source: 'v2',
    createdAt: daysAgo(33),
    updatedAt: daysAgo(33),
  },
];

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export const profileRepository: ProfileRepository = {
  async getProfile() {
    return profile;
  },
  async saveProfile(_userId, input: HealthProfileInput) {
    profile = { ...profile, ...input, updatedAt: new Date() };
  },
  async getCheckin(_userId, month) {
    return checkins.find((c) => c.month === month) ?? null;
  },
  async listCheckins() {
    return [...checkins].sort((a, b) => (a.month < b.month ? 1 : -1));
  },
  async saveCheckin(_userId, month, input: CheckinInput, isCurrentMonth) {
    const existing = checkins.find((c) => c.month === month);
    const record: Checkin = {
      month,
      weightKg: input.weightKg,
      smoking: input.smoking,
      physicallyActive: input.physicallyActive,
      exerciseDaysPerWeek: input.exerciseDaysPerWeek,
      source: 'v2',
      createdAt: existing?.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
    checkins = [record, ...checkins.filter((c) => c.month !== month)];
    if (isCurrentMonth) profile = { ...profile, weightKg: input.weightKg, weightUpdatedAt: new Date() };
  },
};

// ─── privacyRepository / aiConsentStore ─────────────────────────────────────

let aiCloudAccepted = true; // already accepted, cloud AI included, so the consent gate never blocks the demo

export const aiConsentStore = {
  get(): boolean {
    return aiCloudAccepted;
  },
  set(value: boolean): void {
    aiCloudAccepted = value;
  },
};

let consent: ConsentRecord = {
  policyVersion: 'v1',
  acceptedAt: daysAgo(60),
  aiCloudAccepted: true,
  source: 'v2',
};

export const privacyRepository: PrivacyRepository = {
  async getCurrentConsent() {
    return consent;
  },
  async saveConsent(_userId, aiCloudAcceptedValue) {
    consent = { ...consent, aiCloudAccepted: aiCloudAcceptedValue, acceptedAt: new Date() };
    aiCloudAccepted = aiCloudAcceptedValue;
  },
  async getDataCounts(): Promise<DataCounts> {
    return {
      profile: true,
      checkins: checkins.length,
      glucoseEntries: glucoseEntries.length,
      foodEntries: foodEntries.length,
      medicationEntries: medicationEntries.length,
      prescriptions: prescriptions.length,
    };
  },
  async exportData(_userId, user) {
    return {
      exportedAt: new Date().toISOString(),
      policyVersion: consent.policyVersion,
      user,
      profile: null,
      checkins: [],
      consents: [],
      glucose_entries: [],
      food_entries: [],
      medication_entries: [],
      prescriptions: [],
      trend_summaries: [],
    };
  },
  async deleteAccount() {
    // no-op in the demo harness
  },
  async reauthenticateWithGoogle() {
    // no-op in the demo harness
  },
};

// ─── trendSummaryRepository ─────────────────────────────────────────────────

const trendCache = new Map<string, TrendSummaryCache>();

export const trendSummaryRepository: TrendSummaryRepository = {
  async get(_userId, weekStart) {
    return trendCache.get(weekStart) ?? null;
  },
  async save(_userId, weekStart, cache) {
    trendCache.set(weekStart, cache);
  },
};

// ─── usageStore ──────────────────────────────────────────────────────────────

let usage: AiCloudUsage = { used: 3, limit: 50, remaining: 47 };
const usageListeners = new Set<() => void>();

export const usageStore = {
  get: () => usage,
  set(next: AiCloudUsage) {
    usage = next;
    usageListeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    usageListeners.add(listener);
    return () => usageListeners.delete(listener);
  },
};

// ─── AiCloudConsentError (re-exported type/class, kept for compatibility) ───

export class AiCloudConsentError extends Error {
  constructor() {
    super('Você não autorizou o uso de IA em nuvem. Ative em Privacidade.');
    this.name = 'AiCloudConsentError';
  }
}

// ─── fake aiService ──────────────────────────────────────────────────────────

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function bumpUsage() {
  usage = { used: Math.min(usage.used + 1, usage.limit), limit: usage.limit, remaining: Math.max(0, usage.limit - usage.used - 1) };
  usageListeners.forEach((l) => l());
}

export const aiService: AiService = {
  async readGlucometer(): Promise<GlucoseReading> {
    await wait(400);
    bumpUsage();
    return {
      value: 118,
      unit: 'mg/dL',
      otherValues: [],
      uncertainFields: [],
      observation: 'Leitura do visor registrada com nitidez.',
    };
  },

  async analyzeGlucose({ value, context }) {
    await wait(400);
    bumpUsage();
    return `Registro de ${value} mg/dL, contexto: ${context}. Valor dentro da faixa geral usada no app (70–180 mg/dL).`;
  },

  async analyzeMealPhoto(): Promise<MealReading> {
    await wait(400);
    bumpUsage();
    return {
      foods: [
        { name: 'Arroz branco', quantity: '1 porção média' },
        { name: 'Feijão carioca', quantity: '1 concha' },
        { name: 'Frango grelhado', quantity: '1 filé' },
      ],
      uncertainFoods: [],
      observation: MEAL_ANALYSIS,
    };
  },

  async analyzeMealText() {
    await wait(400);
    bumpUsage();
    return MEAL_ANALYSIS;
  },

  async analyzeMedicationPhoto(): Promise<MedicationReading> {
    await wait(400);
    bumpUsage();
    return {
      medication: { name: 'Metformina', activeIngredient: 'Cloridrato de metformina', strength: '500 mg', form: 'Comprimido', manufacturer: null },
      otherMedications: [],
      uncertainFields: ['manufacturer'],
      observation: 'Rótulo identificado: Metformina 500 mg, comprimido.',
    };
  },

  async analyzeMedicationText() {
    await wait(400);
    bumpUsage();
    return MED_ANALYSIS;
  },

  async readPrescription(): Promise<PrescriptionReading> {
    await wait(400);
    bumpUsage();
    return {
      medications: [
        {
          name: 'Metformina',
          activeIngredient: 'Cloridrato de metformina',
          strength: '500 mg',
          dose: '1 comprimido',
          frequency: '2x ao dia',
          schedule: 'Café da manhã e jantar',
          duration: 'Uso contínuo',
          quantity: '60 comprimidos',
          uncertain: false,
        },
        {
          name: 'Insulina NPH',
          activeIngredient: 'Insulina humana NPH',
          strength: '100 UI/mL',
          dose: '10 UI',
          frequency: '1x ao dia',
          schedule: 'Antes de dormir',
          duration: 'Uso contínuo',
          quantity: '1 frasco',
          uncertain: false,
        },
      ],
      instructions: 'Texto da receita transcrito conforme a imagem.',
      uncertainFields: [],
      observation: 'Receita legível, dois itens identificados.',
    };
  },

  async chat(message: string): Promise<string> {
    await wait(500);
    bumpUsage();
    if (/hipo|baixa/i.test(message)) {
      return 'O registro de 230 mg/dL está acima da faixa geral usada no app (70–180 mg/dL) para esse contexto. Os registros de jejum da semana ficaram, em geral, entre 88 e 108 mg/dL.';
    }
    return 'Nos últimos registros, os valores de jejum ficaram entre 88 e 108 mg/dL, e os valores após refeições variaram de 142 a 230 mg/dL. Os dados completos estão disponíveis em Relatórios.';
  },

  async getUsage(): Promise<AiCloudUsage | null> {
    return usage;
  },

  async trendSummary(_input: TrendSummaryInput): Promise<TrendSummaryResult> {
    await wait(500);
    bumpUsage();
    return {
      type: 'trend_summary',
      observations: [
        { text: 'Registro de glicemia presente na maioria dos dias desta semana.', classification: 'observed', factRefs: [] },
        { text: 'Os valores após o almoço ficaram, em média, mais altos que os de jejum.', classification: 'pattern', factRefs: [] },
        { text: 'Um registro de 65 mg/dL foi encontrado antes de dormir.', classification: 'observed', factRefs: [] },
      ],
      forDoctor: [
        'Valores pós-refeição mais altos em alguns dias da semana.',
        'Um registro de 65 mg/dL antes de dormir.',
      ],
    };
  },
};
