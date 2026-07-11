"use client";

import { CharityBanner } from "../components/CharityBanner";
import { randomQuote } from "../lib/quotes";
import { useStore } from "../lib/store";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const { state, activePet, moodLabel, dailyCheckIn, ready } = useStore();
  const isCat = state.speciesMode === "cat";
  const mood = moodLabel(activePet.happiness);
  const [toast, setToast] = useState<string | null>(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(randomQuote(state.speciesMode));
  }, [state.speciesMode]);

  useEffect(() => {
    if (!ready) return;
    const earned = dailyCheckIn();
    if (earned > 0) {
      setToast(`Daily check-in +${earned} 🪙`);
      const t = setTimeout(() => setToast(null), 2800);
      return () => clearTimeout(t);
    }
  }, [ready, dailyCheckIn]);

  const reminders = useMemo(
    () =>
      state.reminders.filter(
        (r) => r.species === state.speciesMode && !r.done,
      ).slice(0, 3),
    [state.reminders, state.speciesMode],
  );

  const memory = useMemo(
    () =>
      state.memories.find((m) => m.species === state.speciesMode) ??
      state.memories[0],
    [state.memories, state.speciesMode],
  );

  const doneToday = state.reminders.filter(
    (r) => r.species === state.speciesMode && r.done,
  ).length;
  const totalToday = state.reminders.filter(
    (r) => r.species === state.speciesMode,
  ).length;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="space-y-1">
        <p className="text-sm font-medium text-[var(--muted)]">
          Welcome back
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {activePet.name}&apos;s{" "}
          <span className="text-[var(--gold)]">
            {isCat ? "court" : "world"}
          </span>
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Here&apos;s everything happening today. {isCat ? "👑" : "🐾"}
        </p>
      </header>

      <div className="card flex items-start gap-3 p-4">
        <span className="text-2xl">{isCat ? "👑" : "🐾"}</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            Today&apos;s quote
          </p>
          <p className="mt-1 font-display text-lg leading-snug">
            “{quote || "Loading joy…"}”
          </p>
        </div>
      </div>

      <section className="card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-[var(--muted)]">Happiness meter</p>
            <p className="mt-1 flex items-center gap-2 font-display text-2xl font-bold">
              <span>{mood.emoji}</span>
              {activePet.happiness}%
            </p>
            <p className="text-sm text-[var(--muted)]">{mood.label}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl">{activePet.avatarEmoji}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Lv {activePet.level} · {activePet.xp}% XP
            </p>
          </div>
        </div>
        <div className="progress mt-4">
          <span style={{ width: `${activePet.happiness}%` }} />
        </div>
      </section>

      {memory && (
        <section className="card p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            On this day
          </p>
          <h3 className="mt-1 font-display text-lg font-bold">
            {memory.emoji} {memory.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{memory.body}</p>
          <p className="mt-2 text-xs text-[var(--muted)]">{memory.date}</p>
        </section>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Upcoming</h2>
          <Link href="/reminders" className="text-sm font-semibold text-[var(--gold)]">
            All
          </Link>
        </div>
        {reminders.length === 0 ? (
          <div className="card p-4 text-sm text-[var(--muted)]">
            All clear — you&apos;re crushing care today ✨
          </div>
        ) : (
          reminders.map((r) => (
            <div key={r.id} className="card flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-sm text-[var(--muted)]">{r.note}</p>
              </div>
              <span className="chip">{r.when}</span>
            </div>
          ))
        )}
      </section>

      <section className="grid grid-cols-3 gap-3">
        <div className="card p-3 text-center">
          <p className="font-display text-2xl font-bold text-[var(--gold)]">
            {state.walkStreak}
          </p>
          <p className="text-[11px] text-[var(--muted)]">
            {isCat ? "play streak" : "walk streak"}
          </p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-2xl font-bold text-[var(--gold)]">
            {state.treatStreak}
          </p>
          <p className="text-[11px] text-[var(--muted)]">treat streak</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-2xl font-bold text-[var(--gold)]">
            {doneToday}/{totalToday}
          </p>
          <p className="text-[11px] text-[var(--muted)]">reminders</p>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/create" className="card block p-4 transition hover:bg-white/5">
          <p className="text-2xl">🎨</p>
          <p className="mt-1 font-display font-bold">AI Artwork</p>
          <p className="text-sm text-[var(--muted)]">
            Turn a photo into magical art
          </p>
        </Link>
        <Link href="/pet" className="card block p-4 transition hover:bg-white/5">
          <p className="text-2xl">{isCat ? "👑" : "🦴"}</p>
          <p className="mt-1 font-display font-bold">
            {isCat ? "Care for royalty" : "Care for " + activePet.name}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Feed, cuddle, play — earn coins
          </p>
        </Link>
      </div>

      <CharityBanner />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
