"use client";

import { randomPopup } from "../lib/quotes";
import { useStore } from "../lib/store";
import { useEffect, useState } from "react";

interface Popup {
  title: string;
  body: string;
  emoji: string;
}

const BOT_NAME_DOG = "Pawlo";
const BOT_NAME_CAT = "Lady Whisk";

export function PopupBot() {
  const { state, activePet } = useStore();
  const [popup, setPopup] = useState<Popup | null>(null);
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);

  useEffect(() => {
    // Creative care bot: show a contextual popup every ~45s, or once on first load after 4s
    const show = () => {
      const key = `${state.speciesMode}-${Math.floor(Date.now() / 45000)}`;
      if (dismissedKey === key) return;
      const base = randomPopup(state.speciesMode);
      setPopup({
        ...base,
        body: base.body.replace(
          /your (pup|cat)/i,
          activePet.name,
        ),
      });
    };

    const first = window.setTimeout(show, 4000);
    const interval = window.setInterval(show, 48000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [state.speciesMode, activePet.name, dismissedKey]);

  if (!popup) return null;

  const bot = state.speciesMode === "cat" ? BOT_NAME_CAT : BOT_NAME_DOG;

  return (
    <div
      className="animate-pop fixed inset-x-0 bottom-[5.5rem] z-[70] mx-auto w-[min(92vw,400px)] px-2 md:bottom-8"
      role="dialog"
      aria-label={`${bot} tip`}
    >
      <div className="glass relative overflow-hidden rounded-3xl p-4 shadow-2xl">
        <div
          aria-hidden
          className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-50 blur-2xl"
          style={{
            background:
              state.speciesMode === "cat"
                ? "radial-gradient(circle,#9b7ed9,transparent 70%)"
                : "radial-gradient(circle,#d4a94a,transparent 70%)",
          }}
        />
        <div className="relative flex gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
            {popup.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              {bot} · Creative Care Bot
            </p>
            <h4 className="mt-0.5 font-display text-base font-bold">
              {popup.title}
            </h4>
            <p className="mt-1 text-sm leading-snug text-[var(--muted)]">
              {popup.body}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="btn btn-primary !px-3 !py-1.5 text-xs"
                onClick={() => setPopup(null)}
              >
                Got it ✨
              </button>
              <button
                type="button"
                className="btn btn-ghost !px-3 !py-1.5 text-xs"
                onClick={() => {
                  setDismissedKey(
                    `${state.speciesMode}-${Math.floor(Date.now() / 45000)}`,
                  );
                  setPopup(null);
                }}
              >
                Snooze
              </button>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm text-[var(--muted)]"
            onClick={() => setPopup(null)}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
