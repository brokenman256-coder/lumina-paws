export type Species = "dog" | "cat";

export type Mood = "thriving" | "happy" | "chill" | "sleepy" | "spicy" | "worried";

export interface PetProfile {
  id: string;
  species: Species;
  name: string;
  breed: string;
  birthday: string; // ISO date
  bio: string;
  nicknames: string[];
  personality: string[];
  favoriteFoods: string[];
  favoriteToys: string[];
  health: number;
  happiness: number;
  cuddle: number;
  neat: number;
  level: number;
  xp: number;
  avatarEmoji: string;
}

export interface Memory {
  id: string;
  species: Species;
  type: "photo" | "moment" | "achievement" | "video";
  title: string;
  body: string;
  date: string;
  emoji: string;
}

export interface Reminder {
  id: string;
  species: Species;
  title: string;
  note: string;
  when: string;
  done: boolean;
}

export interface Earning {
  id: string;
  label: string;
  amount: number;
  at: string;
  species: Species;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt?: string;
  species: Species;
}

export interface FamilyTask {
  id: string;
  owner: "mama" | "papa";
  title: string;
  emoji: string;
  done: boolean;
  species: Species;
}

export interface AppState {
  coins: number;
  dogsRescued: number;
  catsRescued: number;
  walkStreak: number;
  treatStreak: number;
  dailyCheckInDate?: string;
  pets: PetProfile[];
  activePetId: string;
  memories: Memory[];
  reminders: Reminder[];
  earnings: Earning[];
  achievements: Achievement[];
  familyTasks: FamilyTask[];
  speciesMode: Species;
  adminStats: {
    totalUsers: number;
    charityRaisedUsd: number;
    dailyActive: number;
  };
}
