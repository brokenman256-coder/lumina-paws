"use client";

import { CharityBanner } from "../../components/CharityBanner";
import { REWARDS } from "../../lib/rewards";
import { useStore } from "../../lib/store";
import { useState } from "react";

const ACTIONS = [
  { id: "feed" as const, emoji: "🍖", label: "Feed", reward: REWARDS.feed },
  { id: "cuddle" as const, emoji: "🤗", label: "Cuddle", reward: REWARDS.cuddle },
  { id: "groom" as const, emoji: "🛁", label: "Groom", reward: REWARDS.groom },
  {
    id: "walk" as const,
    emoji: "🦴",
    label: "Walk",
    reward: REWARDS.walk,
    catLabel: "Stroll",
    catEmoji: "🐈",
  },
  {
    id: "play" as const,
    emoji: "🎾",
    label: "Play",
    reward: REWARDS.play,
    catEmoji: "🪶",
  },
];

export default function PetPage() {
  const { activePet, care, moodLabel, state } = useStore();
  const isCat = state.speciesMode === "cat";
  const mood = moodLabel(activePet.happiness);
  const [toast, setToast] = useState<string | null>(null);

  const onCare = (id: (typeof ACTIONS)[number]["id"]) => {
    const amount = care(id);
    setToast(`+${amount} 🪙  ·  ${activePet.name} loved that`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <p className="text-sm font-medium text-[var(--muted)]">
          {isCat ? "Royal companion" : "Companion"}
        </p>
        <h1 className="font-display text-3xl font-bold">
          {activePet.name}
        </h1>
        <p className="text-sm text-[var(--muted)]">
          {isCat
            ? "Offer tribute, brush, play & stroll to keep the court thriving."
            : "Feed, cuddle, groom & walk to keep them thriving."}
        </p>
      </header>

      <section
        className={`card relative overflow-hidden p-6 text-center ${isCat ? "royal-sheen" : ""}`}
      >
        <div className="absolute right-4 top-4 chip">
          {mood.emoji} {mood.label}
        </div>
        <p className="text-7xl drop-shadow-lg">{activePet.avatarEmoji}</p>
        <h2 className="mt-3 font-display text-2xl font-bold">
          {isCat && <span className="mr-1">👑</span>}
          {activePet.name}
        </h2>
        <p className="text-sm text-[var(--muted)]">
          {activePet.breed} · ⭐ Level {activePet.level}
        </p>
        <div className="progress mx-auto mt-4 max-w-xs">
          <span style={{ width: `${activePet.xp}%` }} />
        </div>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {activePet.xp}% to next level
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {[
          { label: "Health", value: activePet.health, emoji: "❤️" },
          { label: "Happiness", value: activePet.happiness, emoji: "😊" },
          { label: "Cuddle pts", value: activePet.cuddle, emoji: "🤗" },
          { label: "Neat pts", value: activePet.neat, emoji: "✨" },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-xs text-[var(--muted)]">
              {s.emoji} {s.label}
            </p>
            <p className="font-display text-2xl font-bold">{s.value}%</p>
            <div className="progress mt-2">
              <span style={{ width: `${Math.min(100, s.value)}%` }} />
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-2 font-display text-lg font-bold">
          Care for {activePet.name}
        </h2>
        <p className="mb-3 text-sm text-[var(--muted)]">
          Each interaction raises stats and earns coins — rewards are intentionally light so care stays meaningful.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onCare(a.id)}
              className="card flex flex-col items-center gap-1 p-4 transition hover:bg-white/5 active:scale-[0.98]"
            >
              <span className="text-3xl">
                {isCat && a.catEmoji ? a.catEmoji.trim() || a.emoji : a.emoji}
              </span>
              <span className="font-semibold">
                {isCat && a.catLabel ? a.catLabel : a.label}
              </span>
              <span className="chip">+{a.reward} 🪙</span>
            </button>
          ))}
        </div>
      </section>

      <CharityBanner compact />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
