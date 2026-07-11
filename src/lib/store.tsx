"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { REWARDS } from "./rewards";
import { createSeedState } from "./seed";
import type {
  AppState,
  Mood,
  PetProfile,
  Species,
} from "./types";

const STORAGE_KEY = "lumina-paws-v2";

type CareAction = "feed" | "cuddle" | "groom" | "walk" | "play";

interface StoreApi {
  ready: boolean;
  state: AppState;
  activePet: PetProfile;
  setSpeciesMode: (s: Species) => void;
  setActivePet: (id: string) => void;
  care: (action: CareAction) => number;
  completeReminder: (id: string) => number;
  completeFamilyTask: (id: string) => number;
  dailyCheckIn: () => number;
  sharePhoto: () => number;
  buyPack: (coins: number, charityUsd: number) => void;
  spendCoins: (amount: number, label: string) => boolean;
  addMemory: (title: string, body: string, type?: "moment" | "photo") => void;
  updatePet: (patch: Partial<PetProfile>) => void;
  resetDemo: () => void;
  adminAdjustCoins: (delta: number) => void;
  adminBoostCharity: (usd: number) => void;
  moodLabel: (happiness: number) => { mood: Mood; emoji: string; label: string };
  petsForMode: PetProfile[];
}

const StoreContext = createContext<StoreApi | null>(null);

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => createSeedState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppState;
        setState({ ...createSeedState(), ...parsed });
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota */
    }
  }, [state, ready]);

  const petsForMode = useMemo(
    () => state.pets.filter((p) => p.species === state.speciesMode),
    [state.pets, state.speciesMode],
  );

  const activePet = useMemo(() => {
    const preferred = state.pets.find((p) => p.id === state.activePetId);
    if (preferred && preferred.species === state.speciesMode) return preferred;
    return petsForMode[0] ?? state.pets[0];
  }, [state.pets, state.activePetId, state.speciesMode, petsForMode]);

  const earn = useCallback((amount: number, label: string, species: Species) => {
    setState((s) => ({
      ...s,
      coins: s.coins + amount,
      earnings: [
        {
          id: uid("e"),
          label,
          amount,
          at: new Date().toISOString().slice(0, 10),
          species,
        },
        ...s.earnings,
      ].slice(0, 40),
    }));
  }, []);

  const setSpeciesMode = useCallback((species: Species) => {
    setState((s) => {
      const nextPet =
        s.pets.find((p) => p.species === species && p.id === s.activePetId) ??
        s.pets.find((p) => p.species === species) ??
        s.pets[0];
      return { ...s, speciesMode: species, activePetId: nextPet.id };
    });
  }, []);

  const setActivePet = useCallback((id: string) => {
    setState((s) => ({ ...s, activePetId: id }));
  }, []);

  const care = useCallback(
    (action: CareAction) => {
      const reward = REWARDS[action];
      const labels: Record<CareAction, string> = {
        feed: "Fed companion",
        cuddle: "Cuddle session",
        groom: "Groomed",
        walk: state.speciesMode === "cat" ? "Patio stroll" : "Walk completed",
        play: "Playtime",
      };

      setState((s) => {
        const pets = s.pets.map((p) => {
          if (p.id !== activePet.id) return p;
          let health = p.health;
          let happiness = p.happiness;
          let cuddle = p.cuddle;
          let neat = p.neat;
          let xp = p.xp + (action === "walk" ? 8 : 4);
          let level = p.level;

          if (action === "feed") {
            health = clamp(health + 4);
            happiness = clamp(happiness + 2);
          } else if (action === "cuddle") {
            happiness = clamp(happiness + 5);
            cuddle = clamp(cuddle + 3, 0, 99);
          } else if (action === "groom") {
            neat = clamp(neat + 4, 0, 99);
            happiness = clamp(happiness + 2);
          } else if (action === "walk") {
            health = clamp(health + 5);
            happiness = clamp(happiness + 4);
          } else if (action === "play") {
            happiness = clamp(happiness + 6);
            health = clamp(health + 2);
          }

          if (xp >= 100) {
            level += 1;
            xp = xp - 100;
          }

          return { ...p, health, happiness, cuddle, neat, xp, level };
        });

        return {
          ...s,
          pets,
          coins: s.coins + reward,
          walkStreak: action === "walk" ? s.walkStreak + 1 : s.walkStreak,
          treatStreak:
            action === "feed" ? Math.min(s.treatStreak + 1, 99) : s.treatStreak,
          earnings: [
            {
              id: uid("e"),
              label: labels[action],
              amount: reward,
              at: new Date().toISOString().slice(0, 10),
              species: activePet.species,
            },
            ...s.earnings,
          ].slice(0, 40),
        };
      });

      return reward;
    },
    [activePet.id, activePet.species, state.speciesMode],
  );

  const completeReminder = useCallback((id: string) => {
    const reward = REWARDS.reminderDone;
    setState((s) => ({
      ...s,
      coins: s.coins + reward,
      reminders: s.reminders.map((r) =>
        r.id === id ? { ...r, done: true } : r,
      ),
      earnings: [
        {
          id: uid("e"),
          label: "Reminder completed",
          amount: reward,
          at: new Date().toISOString().slice(0, 10),
          species: s.speciesMode,
        },
        ...s.earnings,
      ].slice(0, 40),
    }));
    return reward;
  }, []);

  const completeFamilyTask = useCallback((id: string) => {
    const reward = REWARDS.familyTask;
    setState((s) => ({
      ...s,
      coins: s.coins + reward,
      familyTasks: s.familyTasks.map((t) =>
        t.id === id ? { ...t, done: true } : t,
      ),
      earnings: [
        {
          id: uid("e"),
          label: "Family care task",
          amount: reward,
          at: new Date().toISOString().slice(0, 10),
          species: s.speciesMode,
        },
        ...s.earnings,
      ].slice(0, 40),
    }));
    return reward;
  }, []);

  const dailyCheckIn = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (state.dailyCheckInDate === today) return 0;
    const reward = REWARDS.dailyCheckIn;
    setState((s) => {
      if (s.dailyCheckInDate === today) return s;
      return {
        ...s,
        dailyCheckInDate: today,
        coins: s.coins + reward,
        earnings: [
          {
            id: uid("e"),
            label: "Daily check-in",
            amount: reward,
            at: today,
            species: s.speciesMode,
          },
          ...s.earnings,
        ].slice(0, 40),
      };
    });
    return reward;
  }, [state.dailyCheckInDate]);

  const sharePhoto = useCallback(() => {
    const reward = REWARDS.sharePhoto;
    earn(reward, "Shared a cute photo", state.speciesMode);
    return reward;
  }, [earn, state.speciesMode]);

  const buyPack = useCallback((coins: number, charityUsd: number) => {
    setState((s) => ({
      ...s,
      coins: s.coins + coins,
      dogsRescued:
        s.speciesMode === "dog"
          ? s.dogsRescued + Math.max(1, Math.round(charityUsd / 12))
          : s.dogsRescued,
      catsRescued:
        s.speciesMode === "cat"
          ? s.catsRescued + Math.max(1, Math.round(charityUsd / 12))
          : s.catsRescued,
      adminStats: {
        ...s.adminStats,
        charityRaisedUsd: s.adminStats.charityRaisedUsd + charityUsd,
      },
      earnings: [
        {
          id: uid("e"),
          label: "Coin pack purchase",
          amount: coins,
          at: new Date().toISOString().slice(0, 10),
          species: s.speciesMode,
        },
        ...s.earnings,
      ].slice(0, 40),
    }));
  }, []);

  const spendCoins = useCallback(
    (amount: number, label: string) => {
      if (state.coins < amount) return false;
      setState((s) => ({
        ...s,
        coins: s.coins - amount,
        earnings: [
          {
            id: uid("e"),
            label,
            amount: -amount,
            at: new Date().toISOString().slice(0, 10),
            species: s.speciesMode,
          },
          ...s.earnings,
        ].slice(0, 40),
      }));
      return true;
    },
    [state.coins],
  );

  const addMemory = useCallback(
    (title: string, body: string, type: "moment" | "photo" = "moment") => {
      setState((s) => ({
        ...s,
        memories: [
          {
            id: uid("m"),
            species: s.speciesMode,
            type,
            title,
            body,
            date: new Date().toISOString().slice(0, 10),
            emoji: type === "photo" ? "📸" : "💫",
          },
          ...s.memories,
        ],
      }));
    },
    [],
  );

  const updatePet = useCallback(
    (patch: Partial<PetProfile>) => {
      setState((s) => ({
        ...s,
        pets: s.pets.map((p) =>
          p.id === activePet.id ? { ...p, ...patch } : p,
        ),
      }));
    },
    [activePet.id],
  );

  const resetDemo = useCallback(() => {
    const fresh = createSeedState();
    setState(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  }, []);

  const adminAdjustCoins = useCallback((delta: number) => {
    setState((s) => ({ ...s, coins: Math.max(0, s.coins + delta) }));
  }, []);

  const adminBoostCharity = useCallback((usd: number) => {
    setState((s) => ({
      ...s,
      adminStats: {
        ...s.adminStats,
        charityRaisedUsd: s.adminStats.charityRaisedUsd + usd,
      },
    }));
  }, []);

  const moodLabel = useCallback((happiness: number) => {
    if (happiness >= 90)
      return { mood: "thriving" as Mood, emoji: "🤩", label: "Thriving" };
    if (happiness >= 75)
      return { mood: "happy" as Mood, emoji: "😄", label: "Happy" };
    if (happiness >= 60)
      return { mood: "chill" as Mood, emoji: "😊", label: "Chill" };
    if (happiness >= 45)
      return { mood: "sleepy" as Mood, emoji: "😴", label: "Sleepy" };
    if (happiness >= 30)
      return { mood: "spicy" as Mood, emoji: "😤", label: "Spicy" };
    return { mood: "worried" as Mood, emoji: "😟", label: "Needs love" };
  }, []);

  const api: StoreApi = {
    ready,
    state,
    activePet,
    setSpeciesMode,
    setActivePet,
    care,
    completeReminder,
    completeFamilyTask,
    dailyCheckIn,
    sharePhoto,
    buyPack,
    spendCoins,
    addMemory,
    updatePet,
    resetDemo,
    adminAdjustCoins,
    adminBoostCharity,
    moodLabel,
    petsForMode,
  };

  return (
    <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
