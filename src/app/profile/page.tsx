"use client";

import { CharityBanner } from "../../components/CharityBanner";
import { useStore } from "../../lib/store";
import Link from "next/link";

function ageLabel(birthday: string) {
  const b = new Date(birthday);
  const now = new Date();
  let years = now.getFullYear() - b.getFullYear();
  let months = now.getMonth() - b.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years} yr ${months} mo`;
}

export default function ProfilePage() {
  const { activePet, state } = useStore();
  const isCat = state.speciesMode === "cat";

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="text-center">
        <p className="text-6xl">{activePet.avatarEmoji}</p>
        <h1 className="mt-2 font-display text-3xl font-bold">
          {isCat && "👑 "}
          {activePet.name}
        </h1>
        <p className="text-sm text-[var(--muted)]">
          {activePet.breed} · {ageLabel(activePet.birthday)}
        </p>
      </header>

      <section className={`card p-5 ${isCat ? "royal-sheen" : ""}`}>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {activePet.bio}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {activePet.nicknames.map((n) => (
            <span key={n} className="chip">
              {n}
            </span>
          ))}
        </div>
      </section>

      <section className="card p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
          Personality
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {activePet.personality.map((p) => (
            <span key={p} className="rounded-full bg-white/5 px-3 py-1 text-sm">
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            Favorite foods
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {activePet.favoriteFoods.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            Favorite toys
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {activePet.favoriteToys.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin" className="btn btn-ghost">
          Admin dashboard
        </Link>
        <Link href="/login" className="btn btn-soft">
          Sign in
        </Link>
      </div>

      <CharityBanner compact />
    </div>
  );
}
