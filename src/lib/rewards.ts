/** Reduced coin economy — earn less, spend feels premium */
export const REWARDS = {
  feed: 1,
  cuddle: 1,
  groom: 1,
  walk: 2, // was 3
  play: 1,
  sharePhoto: 4, // was 10
  dailyCheckIn: 2, // was 5
  reminderDone: 1, // was 3
  familyTask: 1, // was 2
  questBonus: 2, // was 10-15
} as const;

export const COIN_PACKS = [
  {
    id: "starter",
    name: "Starter Pouch",
    coins: 20, // smaller packs
    priceUsd: 0.99,
    charityPct: 80,
    badge: "Popular",
  },
  {
    id: "care",
    name: "Care Bundle",
    coins: 55,
    priceUsd: 2.49,
    charityPct: 80,
    badge: "Best value",
  },
  {
    id: "rescue",
    name: "Rescue Vault",
    coins: 120,
    priceUsd: 4.99,
    charityPct: 85,
    badge: "Charity boost",
  },
] as const;

export const STUDIO_COST = 3; // generate art costs a few coins
