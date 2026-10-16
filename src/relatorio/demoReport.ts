// Dados FICTÍCIOS para ver a página no `npx vite` (dev). Só é importado quando
// import.meta.env.DEV é verdadeiro: não entra no build de produção.
import type { LoadResult, SharedReport } from './firestoreRest';

const day = (offset: number) => {
  const d = new Date(Date.now() + offset * 86_400_000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const MEANS = [131, 152, 127, 146, 161, 118, 134];
const MINS = [98, 104, 64, 101, 122, 67, 92];
const MAXS = [176, 241, 188, 212, 205, 171, 184];
const COUNTS = [6, 5, 6, 5, 4, 6, 6];

export const DEMO_REPORT: SharedReport = {
  period: 'week',
  from: day(-7),
  to: day(-1),
  createdAt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
  expiresAt: new Date(Date.now() + 7 * 86_400_000 - 2 * 3_600_000).toISOString(),
  revoked: false,
  summary: {
    v: 1,
    days: 7,
    daysWithAnyRecord: 7,
    glucose: {
      count: 38,
      daysWithData: 7,
      average: 138,
      min: 64,
      max: 241,
      below70: 2,
      inRange: 27,
      above180: 9,
      daily: MEANS.map((mean, i) => ({ day: day(i - 7), count: COUNTS[i], mean, min: MINS[i], max: MAXS[i] })),
    },
    bloodPressure: { count: 9, days: 5, average: { systolic: 128, diastolic: 82 }, highest: { systolic: 142, diastolic: 90 }, lowest: { systolic: 116, diastolic: 74 } },
    medication: { records: 13, daysWithRecord: 6 },
    meals: { count: 19, daysWithRecord: 7 },
  },
};

export function demoResult(key: string): LoadResult | null {
  switch (key) {
    case 'demo':
      return { status: 'ok', report: DEMO_REPORT };
    case 'demo-indisponivel':
      return { status: 'unavailable' };
    case 'demo-invalido':
      return { status: 'invalid' };
    case 'demo-erro':
      return { status: 'error' };
    default:
      return null;
  }
}
