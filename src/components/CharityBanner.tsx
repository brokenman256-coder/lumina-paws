"use client";

import Link from "next/link";
import { useStore } from "../lib/store";

export function CharityBanner({ compact = false }: { compact?: boolean }) {
  const { state } = useStore();
  const isCat = state.speciesMode === "cat";

  if (compact) {
    return (
      <Link
        href="/charity"
        className={`card royal-sheen flex items-center gap-3 px-4 py-3 transition hover:opacity-95 ${
          isCat ? "royal-sheen" : ""
        }`}
      >
        <span className="text-2xl">{isCat ? "👑" : "💛"}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            {isCat ? "Velvet Rescue Fund" : "Lumina Cares"}
          </p>
          <p className="truncate text-xs text-[var(--muted)]">
            Up to 85% of every coin pack funds shelter {isCat ? "cats" : "dogs"}
          </p>
        </div>
        <span className="chip shrink-0">Give →</span>
      </Link>
    );
  }

  return (
    <section
      className={`card relative overflow-hidden p-5 ${isCat ? "royal-sheen" : ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{
          background: isCat
            ? "radial-gradient(circle, #9b7ed9, transparent 70%)"
            : "radial-gradient(circle, #d4a94a, transparent 70%)",
        }}
      />
      <div className="relative">
        <p className="chip mb-3">
          {isCat ? "👑 Royal Charity" : "💛 Impact"} · 80–85% to rescues
        </p>
        <h3 className="font-display text-xl font-bold tracking-tight">
          {isCat
            ? "Every purchase crowns a second chance"
            : "Buy coins. Spoil your pup. Rescue a life."}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {isCat
            ? "The Velvet Rescue Fund turns your atelier packs into food, medical care, and soft beds for shelter cats across America."
            : "Lumina Cares routes the majority of every purchase to verified U.S. shelters — real dogs, real homes, real love."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="chip">
            🐕 {state.dogsRescued} dog lives aided
          </div>
          <div className="chip">
            🐈 {state.catsRescued} cat lives aided
          </div>
          <div className="chip">
            ${state.adminStats.charityRaisedUsd.toLocaleString()} raised
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/charity" className="btn btn-primary">
            See the mission
          </Link>
          <Link href="/coins" className="btn btn-ghost">
            Support with coins
          </Link>
        </div>
      </div>
    </section>
  );
}
