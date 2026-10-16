// Demo "Água do dia": in-memory entries for today (fictitious), same interface
// as the V2 firestoreWaterRepository. Nothing touches Firebase.
interface WaterEntry {
  id: string;
  ml: number;
  createdAt: Date;
}

const today = (h: number, m: number) => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

let entries: WaterEntry[] = [
  { id: 'w1', ml: 300, createdAt: today(8, 10) },
  { id: 'w2', ml: 500, createdAt: today(10, 30) },
].filter((e) => e.createdAt.getTime() <= Date.now());
let goal: number | null = 2000;
let seq = 10;

export const firestoreWaterRepository = {
  listSince: async (_userId: string, since: Date) => entries.filter((e) => e.createdAt >= since).map((e) => ({ ...e })),
  add: async (_userId: string, ml: number, at: Date) => {
    const id = `w${++seq}`;
    entries = [...entries, { id, ml, createdAt: at }];
    return id;
  },
  remove: async (_userId: string, id: string) => {
    entries = entries.filter((e) => e.id !== id);
  },
  getGoal: async () => goal,
  saveGoal: async (_userId: string, ml: number) => {
    goal = ml;
  },
};
