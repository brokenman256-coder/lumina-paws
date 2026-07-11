"use client";

import { useStore } from "../../lib/store";
import Link from "next/link";

export default function CharityPage() {
  const { state } = useStore();
  const isCat = state.speciesMode === "cat";

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <p className="chip mb-2">
          {isCat ? "Velvet Rescue Fund" : "Lumina Cares"}
        </p>
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          {isCat
            ? "Charity with a crown — soft power for hard lives"
            : "Love your pet. Lift a shelter soul."}
        </h1>
        <p className="mt-2 text-[var(--muted)] leading-relaxed">
          This isn&apos;t a guilt trip — it&apos;s a movement. Every coin pack is
          designed so <strong className="text-[var(--gold)]">80–85%</strong> funds
          food, medical care, and foster beds for American shelter animals.
        </p>
      </header>

      <section className={`card grid grid-cols-3 gap-3 p-4 ${isCat ? "royal-sheen" : ""}`}>
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-[var(--gold)]">
            {state.dogsRescued}
          </p>
          <p className="text-[11px] text-[var(--muted)]">dogs aided</p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-[var(--gold)]">
            {state.catsRescued}
          </p>
          <p className="text-[11px] text-[var(--muted)]">cats aided</p>
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-bold text-[var(--gold)]">
            ${state.adminStats.charityRaisedUsd.toLocaleString()}
          </p>
          <p className="text-[11px] text-[var(--muted)]">raised</p>
        </div>
      </section>

      <section className="space-y-3">
        {[
          {
            t: "Transparent by design",
            d: "Smaller coin packs. Clear charity %. No fluff fees dressed as love.",
          },
          {
            t: isCat ? "Royal for one, rescue for many" : "Spoil one, save another",
            d: isCat
              ? "Your cat gets velvet energy. Shelter cats get real second chances."
              : "Your dog gets the good life. Shelter dogs get a path home.",
          },
          {
            t: "Built for American pet parents",
            d: "Mobile-first, feel-good, shareable — the app energy people actually open every day.",
          },
        ].map((x) => (
          <article key={x.t} className="card p-4">
            <h3 className="font-display text-lg font-bold">{x.t}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{x.d}</p>
          </article>
        ))}
      </section>

      <div className="card border border-[var(--gold)]/30 bg-[var(--gold-soft)] p-5 text-center">
        <p className="font-display text-xl font-bold">
          {isCat
            ? "“A kingdom is only as kind as its people.”"
            : "“Good dogs deserve good humans — twice over.”"}
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Join the Lumina Cares pledge. Buy less fluff. Fund more futures.
        </p>
        <Link href="/coins" className="btn btn-primary mt-4">
          Support with a coin pack
        </Link>
      </div>
    </div>
  );
}
