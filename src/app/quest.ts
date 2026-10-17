export interface Quest {
  id: string;
  title: string;
  goal: number;
  progress: number;
  xp: number;
}

export const QUESTS: Quest[] = [
  { id: '1', title: 'Popij 8 čaša vode', goal: 8, progress: 3, xp: 50 },
  { id: '2', title: 'Prošetaj 5 km', goal: 5, progress: 4, xp: 100 },
  { id: '3', title: 'Pročitaj 3 poglavlja', goal: 3, progress: 0, xp: 50 },
  { id: '4', title: 'Nauči 5 novih reči', goal: 5, progress: 0, xp: 100 },
];
