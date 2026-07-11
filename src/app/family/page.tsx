"use client";

import { CharityBanner } from "../../components/CharityBanner";
import { REWARDS } from "../../lib/rewards";
import { useStore } from "../../lib/store";
import { useMemo, useState } from "react";

export default function FamilyPage() {
  const { state, completeFamilyTask } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  const tasks = useMemo(
    () => state.familyTasks.filter((t) => t.species === state.speciesMode),
    [state.familyTasks, state.speciesMode],
  );

  const mama = tasks.filter((t) => t.owner === "mama" && t.done).length;
  const papa = tasks.filter((t) => t.owner === "papa" && t.done).length;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <p className="text-sm text-[var(--muted)]">Household</p>
        <h1 className="font-display text-3xl font-bold">Mama vs Papa</h1>
        <p className="text-sm text-[var(--muted)]">
          Daily care, tallied automatically each week.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <div className="card p-4 text-center">
          <p className="text-3xl">👩</p>
          <p className="font-display text-3xl font-bold text-[var(--gold)]">{mama}</p>
          <p className="text-sm text-[var(--muted)]">mama</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl">👨</p>
          <p className="font-display text-3xl font-bold text-[var(--gold)]">{papa}</p>
          <p className="text-sm text-[var(--muted)]">papa</p>
        </div>
      </section>

      <section className="space-y-3">
        {(["mama", "papa"] as const).map((owner) => (
          <div key={owner}>
            <h2 className="mb-2 font-display font-bold">
              {owner === "mama" ? "👩 Mama tasks" : "👨 Papa tasks"}
            </h2>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.owner === owner)
                .map((t) => (
                  <div
                    key={t.id}
                    className="card flex items-center justify-between p-3"
                  >
                    <span>
                      {t.emoji} {t.title}
                    </span>
                    {!t.done ? (
                      <button
                        type="button"
                        className="btn btn-soft !py-1.5 text-xs"
                        onClick={() => {
                          const n = completeFamilyTask(t.id);
                          setToast(`Task done · +${n} 🪙`);
                          setTimeout(() => setToast(null), 2000);
                        }}
                      >
                        Done +{REWARDS.familyTask}
                      </button>
                    ) : (
                      <span className="text-[var(--success)]">✓</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      <p className="text-center text-xs text-[var(--muted)]">
        Every completed task earns +{REWARDS.familyTask} coin · Winner crowned Mondays.
      </p>

      <CharityBanner compact />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
