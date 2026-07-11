"use client";

import { CharityBanner } from "../../components/CharityBanner";
import { useStore } from "../../lib/store";
import { useMemo, useState } from "react";

export default function TimelinePage() {
  const { state, addMemory } = useStore();
  const isCat = state.speciesMode === "cat";
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);

  const memories = useMemo(
    () => state.memories.filter((m) => m.species === state.speciesMode),
    [state.memories, state.speciesMode],
  );

  const onAdd = () => {
    if (!title.trim()) return;
    addMemory(title.trim(), body.trim() || "A moment worth keeping.");
    setTitle("");
    setBody("");
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--muted)]">
            {isCat ? "The Royal Atelier" : "The Atelier"}
          </p>
          <h1 className="font-display text-3xl font-bold">Memories</h1>
          <p className="text-sm text-[var(--muted)]">
            Every cherished moment, beautifully kept.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
          Add
        </button>
      </header>

      {open && (
        <div className="card space-y-3 p-4 animate-pop">
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
            placeholder="What happened?"
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="flex gap-2">
            <button type="button" className="btn btn-primary" onClick={onAdd}>
              Save memory
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {memories.map((m) => (
          <article
            key={m.id}
            className={`card p-4 ${isCat ? "royal-sheen" : ""}`}
          >
            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="chip !py-0.5">{m.type}</span>
              <span>{m.date}</span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold">
              {m.emoji} {m.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{m.body}</p>
          </article>
        ))}
        {memories.length === 0 && (
          <p className="card p-4 text-sm text-[var(--muted)]">
            No memories yet — add your first.
          </p>
        )}
      </div>

      <CharityBanner compact />
    </div>
  );
}
