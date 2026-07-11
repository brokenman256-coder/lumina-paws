"use client";

import { useStore } from "../../lib/store";
import Link from "next/link";
import { useEffect } from "react";

export default function CatsPage() {
  const { setSpeciesMode, activePet, state } = useStore();

  useEffect(() => {
    setSpeciesMode("cat");
  }, [setSpeciesMode]);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="card royal-sheen relative overflow-hidden p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full opacity-50 blur-3xl"
          style={{
            background: "radial-gradient(circle,#9b7ed9,transparent 70%)",
          }}
        />
        <p className="chip">🐱 Royal Cat Court</p>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          For cat owners who dress in gold and speak in soft commands
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          A completely different palette — amethyst, indigo, champagne gold.
          Same love. More throne energy. Charity propaganda included, velvet-wrapped.
        </p>
      </header>

      <section className="card royal-sheen flex items-center gap-4 p-5">
        <span className="text-6xl">{activePet.species === "cat" ? activePet.avatarEmoji : "🐱"}</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            Reigning companion
          </p>
          <h2 className="font-display text-2xl font-bold">
            👑 {state.pets.find((p) => p.species === "cat")?.name ?? "Regina"}
          </h2>
          <p className="text-sm text-[var(--muted)]">
            {state.pets.find((p) => p.species === "cat")?.breed}
          </p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {[
          { t: "Royal palette", d: "Deep court purples + champagne gold — not dog-warm beige." },
          { t: "Velvet Rescue Fund", d: "Coin packs advertise shelter cat aid with pride, not guilt." },
          { t: "Lady Whisk bot", d: "Creative popups with royal etiquette & sunbeam decrees." },
          { t: "Quieter coins", d: "Same reduced economy — prestige over spam rewards." },
        ].map((x) => (
          <article key={x.t} className="card royal-sheen p-4">
            <h3 className="font-display font-bold">{x.t}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{x.d}</p>
          </article>
        ))}
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href="/pet" className="btn btn-primary">
          Enter the court
        </Link>
        <Link href="/charity" className="btn btn-ghost">
          Velvet charity
        </Link>
        <button
          type="button"
          className="btn btn-soft"
          onClick={() => setSpeciesMode("dog")}
        >
          Switch to dogs
        </button>
      </div>
    </div>
  );
}
