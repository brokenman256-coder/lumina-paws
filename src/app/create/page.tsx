"use client";

import { STUDIO_COST } from "../../lib/rewards";
import { useStore } from "../../lib/store";
import { useState } from "react";

const STYLES = [
  "🌿 Ghibli Style",
  "🎬 Pixar Style",
  "✏️ Cartoon",
  "🎨 Watercolor",
  "🐉 Fantasy",
  "👑 Royal Portrait",
  "🦸 Superhero",
  "🎂 Birthday Poster",
  "🎄 Christmas",
  "🎃 Halloween",
  "🖼️ Cute Wallpaper",
  "💎 Velvet Court",
];

export default function CreatePage() {
  const { activePet, spendCoins, state } = useStore();
  const isCat = state.speciesMode === "cat";
  const [style, setStyle] = useState(STYLES[isCat ? 5 : 0]);
  const [result, setResult] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const generate = () => {
    const ok = spendCoins(STUDIO_COST, `AI art · ${style}`);
    if (!ok) {
      setToast(`Need ${STUDIO_COST} coins — earn more or top up`);
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setResult(
      `${activePet.avatarEmoji} ✨ ${activePet.name} in ${style.replace(/^[^\s]+\s/, "")} — a gallery-ready portrait for modern pet parents.`,
    );
    setToast(`Artwork created · −${STUDIO_COST} 🪙`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <p className="text-sm text-[var(--muted)]">Studio</p>
        <h1 className="font-display text-3xl font-bold">Create</h1>
        <p className="text-sm text-[var(--muted)]">
          Portraiture, posts & magical art for {activePet.name}.
        </p>
      </header>

      <section className={`card space-y-4 p-5 ${isCat ? "royal-sheen" : ""}`}>
        <div>
          <p className="text-sm font-semibold">1. Choose a photo</p>
          <div className="mt-2 flex h-28 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 text-sm text-[var(--muted)]">
            Upload 2–10 photos of your {isCat ? "cat" : "dog"} 📷
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">2. Choose a style</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  style === s
                    ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-black"
                    : "bg-white/5 text-[var(--muted)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">3. Create the magic</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <div className="flex h-36 items-center justify-center rounded-2xl bg-white/5 text-5xl">
              {activePet.avatarEmoji}
            </div>
            <div className="flex h-36 items-center justify-center rounded-2xl bg-white/5 p-3 text-center text-sm text-[var(--muted)]">
              {result ?? "Styled result appears here"}
            </div>
          </div>
          <button type="button" className="btn btn-primary mt-4 w-full" onClick={generate}>
            Generate artwork · {STUDIO_COST} 🪙
          </button>
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
