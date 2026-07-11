"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import { PopupBot } from "./PopupBot";
import { SpeciesToggle } from "./SpeciesToggle";

const NAV = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/pet", label: "My Pet", emoji: "🐾" },
  { href: "/coins", label: "Coins", emoji: "🪙" },
  { href: "/timeline", label: "Memories", emoji: "✨" },
  { href: "/more", label: "More", emoji: "···" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { state, ready } = useStore();
  const isAdmin = pathname.startsWith("/admin");
  const isCat = state.speciesMode === "cat";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col md:max-w-6xl md:flex-row">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="animate-float-y absolute -left-20 top-10 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{
            background: isCat
              ? "radial-gradient(circle,#9b7ed9,transparent 70%)"
              : "radial-gradient(circle,#e8a0a8,transparent 70%)",
          }}
        />
        <div
          className="animate-float-drift absolute -right-16 top-1/3 h-80 w-80 rounded-full opacity-35 blur-3xl"
          style={{
            background: isCat
              ? "radial-gradient(circle,#e2c07a,transparent 70%)"
              : "radial-gradient(circle,#b8a9e8,transparent 70%)",
          }}
        />
        <div
          className="animate-float-y absolute bottom-0 left-1/4 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{
            background: isCat
              ? "radial-gradient(circle,#6d28d9,transparent 70%)"
              : "radial-gradient(circle,#7dcea0,transparent 70%)",
          }}
        />
      </div>

      {/* Desktop sidebar */}
      <aside className="glass sticky top-0 z-20 hidden h-screen w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-white/5 px-4 py-6 md:flex">
        <div>
          <Link href="/" className="mb-6 flex items-center gap-2 px-2">
            <span className="text-2xl">{isCat ? "👑" : "🐾"}</span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-wide text-[var(--gold)]">
                Lumina Paws
              </span>
              <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {isCat ? "Royal Court" : "Elite Companionship"}
              </span>
            </span>
          </Link>
          <div className="mb-5 px-1">
            <SpeciesToggle compact />
          </div>
          <nav className="space-y-1">
            {[
              ...NAV.slice(0, 4),
              { href: "/reminders", label: "Reminders", emoji: "⏰" },
              { href: "/family", label: "Family", emoji: "👨‍👩‍👧" },
              { href: "/achievements", label: "Badges", emoji: "🏅" },
              { href: "/create", label: "Create", emoji: "🎨" },
              { href: "/charity", label: "Charity", emoji: "💛" },
              { href: "/profile", label: "Profile", emoji: "👤" },
              { href: "/admin", label: "Admin", emoji: "⚙️" },
            ].map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--accent-soft)] text-[var(--gold)]"
                      : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="card mx-1 mt-4 p-3 text-center">
          <p className="text-xs text-[var(--muted)]">Wallet</p>
          <p className="font-display text-2xl font-bold text-[var(--gold)]">
            🪙 {ready ? state.coins : "—"}
          </p>
        </div>
      </aside>

      {/* Main column */}
      <div className="relative z-10 flex min-h-dvh flex-1 flex-col pb-24 md:pb-6">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-white/5 bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] px-4 py-3 backdrop-blur-xl md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">{isCat ? "👑" : "🐾"}</span>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold text-[var(--gold)]">
                Lumina Paws
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {isCat ? "Royal Court" : "For modern pet parents"}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <SpeciesToggle compact />
            <Link href="/coins" className="chip !py-1.5">
              🪙 {ready ? state.coins : "—"}
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 md:px-8 md:py-6">{children}</main>

        {/* Mobile bottom nav — app-like */}
        <nav className="bottom-nav glass fixed inset-x-0 bottom-0 z-40 border-t border-white/10 md:hidden">
          <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 pt-1">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/more"
                    ? ["/reminders", "/family", "/achievements", "/profile", "/create", "/charity", "/more"].some(
                        (p) => pathname.startsWith(p),
                      )
                    : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="flex-1">
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-semibold ${
                      active ? "text-[var(--gold)]" : "text-[var(--muted)]"
                    }`}
                  >
                    <span className="text-lg leading-none">{item.emoji}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <PopupBot />
    </div>
  );
}
