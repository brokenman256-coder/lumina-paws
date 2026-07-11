"use client";

import { useStore } from "../../lib/store";
import Link from "next/link";

const LINKS = [
  { href: "/reminders", emoji: "⏰", title: "Reminders", sub: "Wellness schedule" },
  { href: "/family", emoji: "👨‍👩‍👧", title: "Family", sub: "Mama vs Papa" },
  { href: "/achievements", emoji: "🏅", title: "Badges", sub: "Streaks & awards" },
  { href: "/create", emoji: "🎨", title: "Create", sub: "AI studio" },
  { href: "/charity", emoji: "💛", title: "Charity", sub: "Lumina Cares mission" },
  { href: "/cats", emoji: "👑", title: "Royal Cats", sub: "Cat owner experience" },
  { href: "/profile", emoji: "👤", title: "Profile", sub: "Pet identity" },
  { href: "/admin", emoji: "⚙️", title: "Admin", sub: "Ops dashboard" },
  { href: "/login", emoji: "🔐", title: "Sign in", sub: "Magic link" },
];

export default function MorePage() {
  const { state } = useStore();
  const isCat = state.speciesMode === "cat";

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <h1 className="font-display text-3xl font-bold">More</h1>
        <p className="text-sm text-[var(--muted)]">
          Everything else for the {isCat ? "royal court" : "pack"}.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`card flex items-center gap-3 p-4 transition hover:bg-white/5 ${
              l.href === "/cats" ? "royal-sheen" : ""
            }`}
          >
            <span className="text-2xl">{l.emoji}</span>
            <div>
              <p className="font-semibold">{l.title}</p>
              <p className="text-xs text-[var(--muted)]">{l.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
