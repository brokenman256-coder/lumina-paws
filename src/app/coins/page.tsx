"use client";

import { CharityBanner } from "../../components/CharityBanner";
import { COIN_PACKS, REWARDS } from "../../lib/rewards";
import { useStore } from "../../lib/store";
import { useState } from "react";

export default function CoinsPage() {
  const { state, buyPack, sharePhoto } = useStore();
  const isCat = state.speciesMode === "cat";
  const [tab, setTab] = useState<"wallet" | "shop" | "earn">("wallet");
  const [toast, setToast] = useState<string | null>(null);

  const onBuy = (pack: (typeof COIN_PACKS)[number]) => {
    const charityUsd = Math.round(pack.priceUsd * (pack.charityPct / 100) * 100) / 100;
    buyPack(pack.coins, charityUsd);
    setToast(
      `+${pack.coins} 🪙 · $${charityUsd.toFixed(2)} to ${isCat ? "cat" : "dog"} rescues`,
    );
    setTimeout(() => setToast(null), 3000);
  };

  const onShare = () => {
    const n = sharePhoto();
    setToast(`Photo shared · +${n} 🪙`);
    setTimeout(() => setToast(null), 2200);
  };

  const earnings = state.earnings.filter(
    (e) => e.species === state.speciesMode || e.label.includes("purchase"),
  );

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <p className="text-sm text-[var(--muted)]">
          {isCat ? "The Treasury" : "The Vault"}
        </p>
        <h1 className="font-display text-3xl font-bold">Coins</h1>
        <p className="text-sm text-[var(--muted)]">
          Earn less, mean more — smaller rewards, bigger impact.
        </p>
      </header>

      <section className={`card p-5 text-center ${isCat ? "royal-sheen" : ""}`}>
        <p className="text-sm text-[var(--muted)]">Balance</p>
        <p className="font-display text-5xl font-bold text-[var(--gold)]">
          🪙 {state.coins}
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">Lumina Coins</p>
      </section>

      <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
        {(
          [
            ["wallet", "👛 Wallet"],
            ["shop", "🛍️ Shop"],
            ["earn", "✨ Earn"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
              tab === id
                ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black"
                : "text-[var(--muted)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "wallet" && (
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold">Recent activity</h2>
          {earnings.length === 0 ? (
            <p className="card p-4 text-sm text-[var(--muted)]">No activity yet.</p>
          ) : (
            earnings.slice(0, 12).map((e) => (
              <div
                key={e.id}
                className="card flex items-center justify-between p-3"
              >
                <div>
                  <p className="font-medium">{e.label}</p>
                  <p className="text-xs text-[var(--muted)]">{e.at}</p>
                </div>
                <span
                  className={`font-bold ${e.amount >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}
                >
                  {e.amount >= 0 ? "+" : ""}
                  {e.amount}
                </span>
              </div>
            ))
          )}
        </section>
      )}

      {tab === "shop" && (
        <section className="space-y-3">
          <p className="text-sm text-[var(--muted)]">
            Packs are smaller by design. Up to <strong className="text-[var(--gold)]">85%</strong> goes straight to U.S. shelter rescues.
          </p>
          {COIN_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`card flex flex-wrap items-center justify-between gap-3 p-4 ${isCat ? "royal-sheen" : ""}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-lg font-bold">{pack.name}</p>
                  <span className="chip">{pack.badge}</span>
                </div>
                <p className="text-sm text-[var(--muted)]">
                  {pack.coins} coins · {pack.charityPct}% charity
                </p>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onBuy(pack)}
              >
                ${pack.priceUsd.toFixed(2)}
              </button>
            </div>
          ))}
        </section>
      )}

      {tab === "earn" && (
        <section className="space-y-3">
          <div className="card space-y-3 p-4">
            <h3 className="font-display font-bold">Everyday earns (reduced)</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>🍖 Feed / cuddle / groom / play — +{REWARDS.feed} each</li>
              <li>🦴 Walk / stroll — +{REWARDS.walk}</li>
              <li>📸 Share a cute photo — +{REWARDS.sharePhoto} (was 10)</li>
              <li>🌅 Daily check-in — +{REWARDS.dailyCheckIn} (was 5)</li>
              <li>👨‍👩‍👧 Family tasks — +{REWARDS.familyTask} (was 2)</li>
            </ul>
            <button type="button" className="btn btn-soft w-full" onClick={onShare}>
              Share a cute photo · +{REWARDS.sharePhoto} 🪙
            </button>
          </div>
        </section>
      )}

      <CharityBanner compact />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
