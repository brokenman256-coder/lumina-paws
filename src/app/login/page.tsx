"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"create" | "login">("create");
  const [done, setDone] = useState(false);

  return (
    <div className="mx-auto max-w-md space-y-5 py-4">
      <header className="text-center">
        <p className="text-4xl">🐾</p>
        <h1 className="mt-2 font-display text-2xl font-bold">Lumina Paws</h1>
        <p className="text-sm text-[var(--muted)]">
          Elite companionship for modern pet parents.
        </p>
      </header>

      <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          className={`flex-1 rounded-full py-2 text-sm font-semibold ${
            mode === "create"
              ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black"
              : "text-[var(--muted)]"
          }`}
          onClick={() => setMode("create")}
        >
          Create account
        </button>
        <button
          type="button"
          className={`flex-1 rounded-full py-2 text-sm font-semibold ${
            mode === "login"
              ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black"
              : "text-[var(--muted)]"
          }`}
          onClick={() => setMode("login")}
        >
          Log in
        </button>
      </div>

      <form
        className="card space-y-3 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        {mode === "create" && (
          <label className="block text-sm">
            Country
            <select className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
              <option>Other</option>
            </select>
          </label>
        )}
        <label className="block text-sm">
          Email
          <input
            required
            type="email"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            placeholder="you@email.com"
          />
        </label>
        <button type="submit" className="btn btn-primary w-full">
          {mode === "create" ? "Create my account 🐾" : "Email magic link"}
        </button>
        {done && (
          <p className="text-center text-sm text-[var(--success)]">
            Demo mode — you&apos;re in. Explore the app!
          </p>
        )}
      </form>

      <p className="text-center text-sm text-[var(--muted)]">
        Just exploring?{" "}
        <Link href="/" className="font-semibold text-[var(--gold)]">
          Continue without account →
        </Link>
      </p>
    </div>
  );
}
