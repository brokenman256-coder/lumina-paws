"use client";

import { CharityBanner } from "../../components/CharityBanner";
import { REWARDS } from "../../lib/rewards";
import { useStore } from "../../lib/store";
import { useMemo, useState } from "react";

export default function RemindersPage() {
  const { state, completeReminder, activePet } = useStore();
  const isCat = state.speciesMode === "cat";
  const [toast, setToast] = useState<string | null>(null);

  const list = useMemo(
    () => state.reminders.filter((r) => r.species === state.speciesMode),
    [state.reminders, state.speciesMode],
  );

  const score = list.filter((r) => r.done).length * REWARDS.questBonus;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <p className="text-sm text-[var(--muted)]">Wellness</p>
        <h1 className="font-display text-3xl font-bold">Smart Reminders</h1>
        <p className="text-sm text-[var(--muted)]">
          Everything on the schedule for {activePet.name}.
        </p>
      </header>

      <section className={`card p-4 ${isCat ? "royal-sheen" : ""}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
              Today&apos;s quests
            </p>
            <p className="font-display text-2xl font-bold">Score {score}</p>
          </div>
          <p className="text-3xl">{isCat ? "👑" : "🦴"}</p>
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Complete care tasks — quest bonus is +{REWARDS.questBonus} (kept low on purpose).
        </p>
      </section>

      <section className="space-y-3">
        {list.map((r) => (
          <div key={r.id} className="card flex items-center justify-between gap-3 p-4">
            <div>
              <p className={`font-semibold ${r.done ? "line-through opacity-60" : ""}`}>
                {r.title}
              </p>
              <p className="text-sm text-[var(--muted)]">{r.note}</p>
              <span className="chip mt-2">{r.when}</span>
            </div>
            {!r.done ? (
              <button
                type="button"
                className="btn btn-soft shrink-0"
                onClick={() => {
                  const n = completeReminder(r.id);
                  setToast(`Done · +${n} 🪙`);
                  setTimeout(() => setToast(null), 2000);
                }}
              >
                Done +{REWARDS.reminderDone}
              </button>
            ) : (
              <span className="text-sm font-semibold text-[var(--success)]">✓</span>
            )}
          </div>
        ))}
      </section>

      <CharityBanner compact />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
