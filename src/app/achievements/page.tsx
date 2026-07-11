"use client";

import { useStore } from "../../lib/store";
import { useMemo } from "react";

export default function AchievementsPage() {
  const { state, activePet, moodLabel } = useStore();
  const isCat = state.speciesMode === "cat";
  const mood = moodLabel(activePet.happiness);

  const badges = useMemo(
    () => state.achievements.filter((a) => a.species === state.speciesMode),
    [state.achievements, state.speciesMode],
  );

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <p className="text-sm text-[var(--muted)]">Accolades</p>
        <h1 className="font-display text-3xl font-bold">
          {activePet.name}&apos;s Badges
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Celebrating every milestone.
        </p>
      </header>

      <section className={`card p-4 ${isCat ? "royal-sheen" : ""}`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
          Mood tracker
        </p>
        <p className="mt-2 font-display text-3xl font-bold">
          {mood.emoji} {activePet.happiness}%
        </p>
        <p className="text-sm text-[var(--muted)]">{mood.label}</p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="card p-4">
          <p className="text-sm text-[var(--muted)]">
            {isCat ? "Play streak" : "Walk streak"}
          </p>
          <p className="font-display text-2xl font-bold">{state.walkStreak} days</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-[var(--muted)]">Treat streak</p>
          <p className="font-display text-2xl font-bold">{state.treatStreak} days</p>
        </div>
      </section>

      <section className="space-y-3">
        {badges.map((a) => (
          <div
            key={a.id}
            className={`card flex gap-3 p-4 ${a.unlockedAt ? "" : "opacity-50"}`}
          >
            <span className="text-3xl">{a.emoji}</span>
            <div>
              <p className="font-display font-bold">{a.title}</p>
              <p className="text-sm text-[var(--muted)]">{a.description}</p>
              <p className="mt-1 text-xs text-[var(--gold)]">
                {a.unlockedAt ? `Unlocked ${a.unlockedAt}` : "Locked"}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
