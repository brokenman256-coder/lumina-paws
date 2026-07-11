import type { Species } from "./types";

export const DOG_QUOTES = [
  "Today is a perfect day for a park victory lap.",
  "Someone is thinking about tennis balls. A lot.",
  "Belly rubs are a human right — and a dog delight.",
  "Zoomies scheduled for 7pm. Be ready.",
  "Your pup believes you are the main character.",
  "Treat diplomacy is highly effective today.",
  "A good walk fixes almost everything.",
  "Squirrel alert level: mild chaos.",
];

export const CAT_QUOTES = [
  "Her Majesty accepts tribute in soft blankets.",
  "The throne has been claimed. Again.",
  "Silence is golden. Sunbeams are better.",
  "A royal inspection of the kitchen is imminent.",
  "Treats are not optional. They are decree.",
  "The court grants you one gentle chin scratch.",
  "Nap protocol: do not disturb the crown.",
  "Elegance is non-negotiable today.",
];

export const DOG_POPUPS = [
  {
    title: "Walk window!",
    body: "Golden hour is calling. A short loop earns streak love 🦴",
    emoji: "🌅",
  },
  {
    title: "Hydration hero",
    body: "Fresh water = happy heart. Tap Play after for bonus sparkles.",
    emoji: "💧",
  },
  {
    title: "Photo moment",
    body: "Catch that goofy grin — Memories love real life cuteness.",
    emoji: "📸",
  },
  {
    title: "Rescue ripple",
    body: "Every coin pack you buy sends care to shelter pups. You're the good human.",
    emoji: "💛",
  },
  {
    title: "Streak saver",
    body: "Don't break the walk streak — even 8 minutes counts.",
    emoji: "🔥",
  },
  {
    title: "Cuddle protocol",
    body: "Two minutes of petting raises happiness more than you'd think.",
    emoji: "🤗",
  },
  {
    title: "Treat wisely",
    body: "One tiny treat + one big praise = training magic.",
    emoji: "🍖",
  },
];

export const CAT_POPUPS = [
  {
    title: "Sunbeam court",
    body: "A warm window seat awaits. Royalty prefers the light.",
    emoji: "☀️",
  },
  {
    title: "Royal brush hour",
    body: "A few gentle strokes keep the coat throne-ready.",
    emoji: "✨",
  },
  {
    title: "Velvet charity",
    body: "Your coin packs fund shelter cats — pure royal good.",
    emoji: "👑",
  },
  {
    title: "Play decree",
    body: "Wand toy, three minutes. The kingdom will thank you.",
    emoji: "🪶",
  },
  {
    title: "Quiet tribute",
    body: "Soft voice + slow blinks = maximum cat diplomacy.",
    emoji: "👁️",
  },
  {
    title: "Treat treasury",
    body: "One dainty treat. Make it feel like a coronation.",
    emoji: "🐟",
  },
];

export function randomQuote(species: Species) {
  const list = species === "cat" ? CAT_QUOTES : DOG_QUOTES;
  return list[Math.floor(Math.random() * list.length)];
}

export function randomPopup(species: Species) {
  const list = species === "cat" ? CAT_POPUPS : DOG_POPUPS;
  return list[Math.floor(Math.random() * list.length)];
}
