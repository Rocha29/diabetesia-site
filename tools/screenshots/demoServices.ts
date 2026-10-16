// Drop-in replacement for '@/services' used ONLY by the screenshot harness
// (vite.config.demo.ts aliases '@/services' -> this file). Everything is
// in-memory, fictional demo data — no network, no Firebase, no /api.
// It re-exports exactly the same names as src/services/index.ts.
import type { AuthService, AppUser } from '@/services/auth/authService';
import type { EntryRepository, PrescriptionRepository } from '@/services/entries/entryRepository';
import type { ProfileRepository } from '@/services/profile/profileRepository';
import type { ConsentRecord, DataCounts, PrivacyRepository } from '@/services/privacy/privacyRepository';
import type { TrendSummaryRepository } from '@/services/tracking/trendSummaryRepository';
import type { FeedbackRepository } from '@/services/feedback/feedbackRepository';
import type { AiService } from '@/services/ai/aiService';
import type { FeedbackInput } from '@/types/feedback';
import type {
  BloodPressureEntry,
  BloodPressureInput,
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
  mkFood(9, 12, 30, 'Arroz, feijão, frango grelhado e salada', 'lunch', 65, 610),
  mkFood(8, 8, 0, 'Pão integral com queijo branco e café com leite', 'breakfast', 40, 330),
  mkFood(7, 19, 0, 'Macarrão ao molho de tomate com carne moída', 'dinner', 70, 640),
  mkFood(6, 16, 0, 'Fruta (maçã) e castanhas', 'snack', 20, 190),
  mkFood(4, 19, 30, 'Sopa de legumes com frango desfiado', 'dinner', 35, 280),
  mkFood(2, 12, 45, 'Peixe grelhado, purê de batata e legumes', 'lunch', 45, 470),
  mkFood(0, 7, 30, 'Pão francês com manteiga e café com leite', 'breakfast', 64, 400),
  mkFood(0, 12, 20, 'Arroz, feijão, frango grelhado e salada', 'lunch', 58, 590),
];

function mkFood(day: number, hour: number, minute: number, description: string, mealType: FoodEntry['mealType'], carbs: number, kcal?: number): FoodEntry {
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
    estimatedCalories: kcal,
    nutritionMethod: kcal ? 'table' : undefined,
  };
}

let bloodPressureEntries: BloodPressureEntry[] = [
  mkBp(9, 8, 5, 132, 85, 74),
  mkBp(8, 8, 10, 128, 82, 72, 'before'),
  mkBp(7, 20, 30, 124, 80, 70, 'after'),
  mkBp(6, 8, 0, 130, 84, 75),
  mkBp(5, 8, 15, 126, 81, 71, 'before'),
  mkBp(3, 8, 0, 122, 79, 69),
  mkBp(2, 20, 10, 127, 82, 73, 'after'),
  mkBp(1, 8, 5, 125, 80, 70),
  mkBp(0, 7, 50, 123, 79, 68, 'before', 'photo'),
];

function mkBp(day: number, hour: number, minute: number, systolic: number, diastolic: number, heartRate?: number, medicationTiming?: BloodPressureEntry['medicationTiming'], method: BloodPressureEntry['method'] = 'manual'): BloodPressureEntry {
  const createdAt = daysAgo(day, hour, minute);
  return { id: id(), userId: DEMO_USER.uid, createdAt, updatedAt: createdAt, kind: 'bloodPressure', systolic, diastolic, heartRate, medicationTiming, method };
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
  return [...glucoseEntries, ...foodEntries, ...medicationEntries, ...bloodPressureEntries].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

// ─── entryRepository / prescriptionRepository ──────────────────────────────

export const entryRepository: EntryRepository = {
  watchRecent(_userId, since, onData) {
    onData(allEntries().filter((e) => e.createdAt >= since));
    return () => {};
  },

  async listInRange(_userId, from, to, kinds) {
    return allEntries().filter((e) => e.createdAt >= from && e.createdAt <= to && (!kinds || kinds.includes(e.kind)));
  },

  async createBloodPressure(_userId, input: BloodPressureInput) {
    const createdAt = input.measuredAt;
    bloodPressureEntries = [{ id: id(), userId: DEMO_USER.uid, createdAt, updatedAt: new Date(), kind: 'bloodPressure', ...input }, ...bloodPressureEntries];
  },

  async updateBloodPressure(_userId, entryId, input: BloodPressureInput) {
    bloodPressureEntries = bloodPressureEntries.map((e) => (e.id === entryId ? { ...e, ...input, createdAt: input.measuredAt, updatedAt: new Date() } : e));
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
        estimatedCalories: input.estimatedCalories,
        nutritionItems: input.nutritionItems,
        nutritionMethod: input.nutritionMethod,
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
    if (kind === 'bloodPressure') bloodPressureEntries = bloodPressureEntries.filter((e) => e.id !== entryId);
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
      feedback: [],
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

// ─── feedbackRepository / feedbackPromptStore ───────────────────────────────

const feedbackEntries: { ces: number; comment: string | null; trigger: string }[] = [];

export const feedbackRepository: FeedbackRepository = {
  async submit(_userId, input: FeedbackInput) {
    feedbackEntries.push({ ces: input.ces, comment: input.comment, trigger: input.trigger });
  },
};

// Pretends the demo account is a long-time user with no prompt history, so
// the automatic feedback card never shows up in screenshots by surprise.
export const feedbackPromptStore = {
  getOrInitFirstUseAt(_now: Date): Date {
    return daysAgo(60);
  },
  getLastFeedbackAt(): Date | null {
    return null;
  },
  recordFeedbackSent(_now: Date): void {
    // no-op in the demo harness
  },
  getLastDismissedAt(): Date | null {
    return null;
  },
  recordDismissed(_now: Date): void {
    // no-op in the demo harness
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
        { name: 'Arroz branco', quantity: '4 colheres de sopa', amount: 4, measure: 'colher_sopa', confidence: 'high' },
        { name: 'Feijão carioca', quantity: '1 concha', amount: 1, measure: 'concha', confidence: 'medium' },
        { name: 'Frango grelhado', quantity: '1 filé', amount: 1, measure: 'file', confidence: 'high' },
        { name: 'Farofa de bacon', quantity: null, amount: null, measure: null, confidence: 'low' },
      ],
      uncertainFoods: [],
      observation: MEAL_ANALYSIS,
    };
  },

  async readMealText(): Promise<MealReading> {
    await wait(400);
    bumpUsage();
    return {
      foods: [
        { name: 'pão francês', quantity: '2 pães', amount: 2, measure: 'unidade', confidence: 'high' },
        { name: 'manteiga', quantity: null, amount: null, measure: null, confidence: 'low' },
        { name: 'café com leite', quantity: '1 xícara', amount: 1, measure: 'xicara', confidence: 'high' },
      ],
      uncertainFoods: [],
      observation: '',
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

// ---- Added for the design-system harness (services/index.ts grew since this demo was written) ----
import { createTelemetry } from '@/telemetry';
import type { JourneyPreferencesRepository } from '@/services/preferences/journeyPreferencesRepository';
import type { ModulePreferences, ModulePreferencesRepository } from '@/services/preferences/modulePreferencesRepository';

const noStorage = { getItem: () => null, setItem: () => undefined, removeItem: () => undefined };
export const telemetry = createTelemetry({
  enabled: false,
  storage: noStorage as never,
  sessionStorage: noStorage as never,
  endpoint: '/demo/analytics',
  getToken: async () => null,
  client: { app: 'demo', app_version: 'demo', platform: 'web' },
} as never);
export const track = telemetry.track;

let journeyGoal: { year: number; goalDays: number } | null = null;
export const journeyPreferencesRepository: JourneyPreferencesRepository = {
  async get() {
    return journeyGoal ? { goalDaysPerYear: journeyGoal.goalDays, goalsByYear: { [String(journeyGoal.year)]: journeyGoal.goalDays } } : null;
  },
  async saveGoal(_u, year, goalDays) {
    journeyGoal = { year, goalDays };
  },
};
const modulePrefs: ModulePreferences = { bloodPressure: true };
export const modulePreferencesRepository: ModulePreferencesRepository = {
  async get() {
    return { ...modulePrefs };
  },
  async setBloodPressure(_u, enabled) {
    modulePrefs.bloodPressure = enabled;
  },
};

import type { NutritionGoals, NutritionGoalsRepository } from '@/services/preferences/nutritionGoalsRepository';
let nutritionGoals: NutritionGoals = { dailyCaloriesGoal: 1800, carbsPerMealGoal: 60 };
export const nutritionGoalsRepository: NutritionGoalsRepository = {
  async get() {
    return { ...nutritionGoals };
  },
  async save(_u, goals) {
    nutritionGoals = { ...goals };
  },
};

// ─── "Quem me acompanha" (demo) ───────────────────────────────────────────────

import type { SharedAccessRepository } from '@/services/sharedAccess/sharedAccessRepository';
import type { SharedAccessSummary, SharedEntriesPage } from '@/types/sharedAccess';

const isoAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const todayAt = (h: number, m: number) => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

const sharedSummary = (): SharedAccessSummary => ({
  sharedWith: [
    { id: 'sa_00000000000000a1', label: 'Mãe', status: 'active', createdAt: isoAgo(60 * 24 * 20), expiresAt: null, acceptedAt: isoAgo(60 * 24 * 19), lastViewedAt: isoAgo(95) },
    { id: 'sa_00000000000000a2', label: 'Dra. Paula (endócrino)', status: 'active', createdAt: isoAgo(60 * 24 * 10), expiresAt: null, acceptedAt: isoAgo(60 * 24 * 9), lastViewedAt: isoAgo(60 * 24 * 3) },
    { id: 'sa_00000000000000a3', label: 'Pedro (irmão)', status: 'pending', createdAt: isoAgo(60 * 17), expiresAt: new Date(Date.now() + 31 * 3_600_000).toISOString(), acceptedAt: null, lastViewedAt: null },
  ],
  following: [
    { id: 'sa_00000000000000b1', label: 'Pai', since: isoAgo(60 * 24 * 30), alertsEnabled: true, lastGlucose: { value: 142, unit: 'mg/dL', context: 'postMeal', at: isoAgo(40) } },
    { id: 'sa_00000000000000b2', label: 'Vó Lúcia', since: isoAgo(60 * 24 * 12), lastGlucose: { value: 64, unit: 'mg/dL', context: 'random', at: isoAgo(120) } },
    { id: 'sa_00000000000000b3', label: 'Tio Carlos', since: isoAgo(60 * 24 * 5), lastGlucose: { value: 131, unit: 'mg/dL', context: 'random', at: isoAgo(60 * 30) } },
  ],
  limit: 5,
  consentVersion: '2026-10-12',
});

export const sharedAccessRepository: SharedAccessRepository = {
  summary: async () => sharedSummary(),
  cachedSummary: () => sharedSummary(),
  createInvite: async (label) => ({ id: 'sa_00000000000000c1', label, code: 'K7QM-4TXP', expiresAt: new Date(Date.now() + 48 * 3_600_000).toISOString() }),
  accept: async (_code, label) => ({ id: 'sa_00000000000000b1', label }),
  end: async () => {},
  entries: async (): Promise<SharedEntriesPage> => ({
    id: 'sa_00000000000000b1',
    label: 'Pai',
    from: todayAt(0, 0),
    to: todayAt(23, 59),
    entries: [
      { id: 'g2', kind: 'glucose', at: todayAt(13, 50), value: 142, unit: 'mg/dL', context: 'postMeal' },
      { id: 'f1', kind: 'food', at: todayAt(12, 40), mealType: 'lunch', description: 'Arroz, feijão, frango grelhado e salada', estimatedCarbs: 62, estimatedCalories: 540 },
      { id: 'm1', kind: 'medication', at: todayAt(8, 0), medicationName: 'Metformina', dose: '500', unit: 'mg' },
      { id: 'b1', kind: 'bloodPressure', at: todayAt(7, 20), systolic: 128, diastolic: 82, heartRate: 70, medicationTiming: null },
      { id: 'g1', kind: 'glucose', at: todayAt(7, 10), value: 98, unit: 'mg/dL', context: 'fasting' },
    ],
  }),
  setAlerts: async () => {},
  glucoseEvent: async () => {},
  removeAll: async () => {},
  clearCache: () => {},
};

// ─── Push (demo: nada é enviado) ──────────────────────────────────────────────

export const pushTokens = {
  register: async () => {},
  unregister: async () => {},
};

// ─── Relato de bug (demo: nunca cria issue) ───────────────────────────────────

export const bugReportRepository = {
  submit: async () => ({ number: 0, url: '' }),
};

// ─── Link do relatório para o médico (demo, V2 issue #15) ────────────────────

import type { ReportLinkRepository } from '@/services/reportLinks/reportLinkRepository';
import type { ReportLink } from '@/types/reportLinks';

const demoDay = (daysAgo: number) => {
  const d = new Date(Date.now() - daysAgo * 86_400_000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const demoUrl = (n: number) => `https://rocha29.github.io/diabetesia-site/relatorio/#k7Qm${String(n).repeat(35).slice(0, 35)}x2Fa`;
const hoursFromNow = (h: number) => new Date(Date.now() + h * 3_600_000).toISOString();
let demoLinks: ReportLink[] = [
  { id: 'rl_000000000000000000000001', period: 'week', from: demoDay(7), to: demoDay(1), createdAt: hoursFromNow(-3), expiresAt: hoursFromNow(7 * 24 - 3), revokedAt: null, status: 'active', accessCount: 2, lastAccessAt: hoursFromNow(-1.5), url: demoUrl(1) },
  { id: 'rl_000000000000000000000002', period: 'month', from: demoDay(30), to: demoDay(1), createdAt: hoursFromNow(-20), expiresAt: hoursFromNow(2), revokedAt: null, status: 'active', accessCount: 0, lastAccessAt: null, url: demoUrl(2) },
  { id: 'rl_000000000000000000000003', period: 'week', from: demoDay(16), to: demoDay(10), createdAt: hoursFromNow(-9 * 24), expiresAt: hoursFromNow(-2 * 24), revokedAt: hoursFromNow(-6 * 24), status: 'revoked', accessCount: 1, lastAccessAt: hoursFromNow(-8 * 24), url: null },
  { id: 'rl_000000000000000000000004', period: 'month', from: demoDay(45), to: demoDay(16), createdAt: hoursFromNow(-15 * 24), expiresAt: hoursFromNow(-6 * 24), revokedAt: null, status: 'expired', accessCount: 0, lastAccessAt: null, url: null },
];

export const reportLinkRepository: ReportLinkRepository = {
  list: async () => ({ links: demoLinks.map((l) => ({ ...l })), maxActive: 5, consentVersion: '2026-10-14' }),
  create: async (input) => {
    const link: ReportLink = {
      id: `rl_${String(demoLinks.length + 1).padStart(24, '0')}`,
      period: input.period,
      from: input.from,
      to: input.to,
      createdAt: new Date().toISOString(),
      expiresAt: hoursFromNow(input.validityDays * 24),
      revokedAt: null,
      status: 'active',
      accessCount: 0,
      lastAccessAt: null,
      url: demoUrl(demoLinks.length + 1),
    };
    demoLinks = [link, ...demoLinks];
    return { id: link.id, url: link.url!, period: link.period, from: link.from, to: link.to, createdAt: link.createdAt, expiresAt: link.expiresAt };
  },
  revoke: async (id) => {
    demoLinks = demoLinks.map((l) => (l.id === id ? { ...l, status: 'revoked', revokedAt: new Date().toISOString(), url: null } : l));
  },
  removeAll: async () => {
    demoLinks = [];
  },
};
