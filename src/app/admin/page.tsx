"use client";

import { useStore } from "../../lib/store";
import Link from "next/link";
import { useState } from "react";

export default function AdminPage() {
  const {
    state,
    adminAdjustCoins,
    adminBoostCharity,
    resetDemo,
  } = useStore();
  const [msg, setMsg] = useState<string | null>(null);

  const flash = (t: string) => {
    setMsg(t);
    setTimeout(() => setMsg(null), 2000);
  };

  return (
    <div className="min-h-dvh bg-[#0a0c0b] text-[var(--text)]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--gold)]">
              Ops · Premium control
            </p>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-[var(--muted)]">
              Separate from the consumer app shell — clean, powerful, not the public face.
            </p>
          </div>
          <Link href="/" className="btn btn-ghost">
            ← Back to app
          </Link>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="card p-4">
            <p className="text-xs text-[var(--muted)]">Total users</p>
            <p className="font-display text-3xl font-bold">
              {state.adminStats.totalUsers.toLocaleString()}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[var(--muted)]">Daily active</p>
            <p className="font-display text-3xl font-bold">
              {state.adminStats.dailyActive.toLocaleString()}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-[var(--muted)]">Charity raised</p>
            <p className="font-display text-3xl font-bold text-[var(--gold)]">
              ${state.adminStats.charityRaisedUsd.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="card space-y-3 p-5">
            <h2 className="font-display text-xl font-bold">Economy</h2>
            <p className="text-sm text-[var(--muted)]">
              Live wallet: <strong className="text-[var(--gold)]">🪙 {state.coins}</strong>
            </p>
            <p className="text-xs text-[var(--muted)]">
              Rewards are intentionally reduced (walk +2, photo +4, check-in +2).
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-soft"
                onClick={() => {
                  adminAdjustCoins(5);
                  flash("+5 coins");
                }}
              >
                +5 coins
              </button>
              <button
                type="button"
                className="btn btn-soft"
                onClick={() => {
                  adminAdjustCoins(-5);
                  flash("−5 coins");
                }}
              >
                −5 coins
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  adminAdjustCoins(-state.coins);
                  flash("Wallet cleared");
                }}
              >
                Zero wallet
              </button>
            </div>
          </section>

          <section className="card space-y-3 p-5">
            <h2 className="font-display text-xl font-bold">Charity propaganda</h2>
            <p className="text-sm text-[var(--muted)]">
              Dogs aided {state.dogsRescued} · Cats aided {state.catsRescued}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  adminBoostCharity(25);
                  flash("+$25 charity impact");
                }}
              >
                +$25 raised
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  adminBoostCharity(100);
                  flash("+$100 charity impact");
                }}
              >
                +$100 raised
              </button>
            </div>
          </section>

          <section className="card space-y-3 p-5 md:col-span-2">
            <h2 className="font-display text-xl font-bold">System</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-3 text-sm">
                <p className="text-[var(--muted)]">Species mode</p>
                <p className="font-semibold capitalize">{state.speciesMode}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3 text-sm">
                <p className="text-[var(--muted)]">Walk streak</p>
                <p className="font-semibold">{state.walkStreak}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3 text-sm">
                <p className="text-[var(--muted)]">Memories</p>
                <p className="font-semibold">{state.memories.length}</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                resetDemo();
                flash("Demo reset");
              }}
            >
              Reset demo data
            </button>
          </section>
        </div>

        {msg && <div className="toast">{msg}</div>}
      </div>
    </div>
  );
}
