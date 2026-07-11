"use client";

import { useStore } from "../lib/store";

export function SpeciesToggle({ compact = false }: { compact?: boolean }) {
  const { state, setSpeciesMode } = useStore();
  const mode = state.speciesMode;

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 ${
        compact ? "text-xs" : "text-sm"
      }`}
      role="tablist"
      aria-label="Pet type"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "dog"}
        onClick={() => setSpeciesMode("dog")}
        className={`rounded-full px-3 py-1.5 font-semibold transition ${
          mode === "dog"
            ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black shadow"
            : "text-[var(--muted)] hover:text-white"
        }`}
      >
        🐶 Dogs
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "cat"}
        onClick={() => setSpeciesMode("cat")}
        className={`rounded-full px-3 py-1.5 font-semibold transition ${
          mode === "cat"
            ? "bg-gradient-to-r from-[#9b7ed9] to-[#e2c07a] text-black shadow"
            : "text-[var(--muted)] hover:text-white"
        }`}
      >
        🐱 Cats
      </button>
    </div>
  );
}
