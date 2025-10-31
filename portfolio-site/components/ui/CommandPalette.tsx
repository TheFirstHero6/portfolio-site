"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type CommandItem = {
  id: string; // anchor id without '#'
  label: string;
  group?: string; // e.g., Section or Project
  href?: string; // if provided, use href; else build from id
};

type CommandPaletteProps = {
  items: CommandItem[];
};

export default function CommandPalette({ items }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      
      // Guard against undefined key
      if (!e.key) return;
      
      if (e.key === "/" && !mod && !open) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key.toLowerCase() === "k" && mod) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const normalized = useMemo(() => query.trim().toLowerCase(), [query]);
  const results = useMemo(() => {
    if (!normalized) return items;
    return items.filter((it) =>
      (it.label + " " + (it.group ?? "") + " " + it.id)
        .toLowerCase()
        .includes(normalized)
    );
  }, [items, normalized]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = results[activeIndex];
        if (target) trigger(target);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex]);

  function trigger(item: CommandItem) {
    setOpen(false);
    if (item.href) {
      window.location.href = item.href;
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-start justify-center p-4 md:p-8"
      aria-modal
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-xl glass glass-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-3 border-b border-white/10">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to section or project…"
            className="w-full bg-transparent outline-none text-white placeholder-white/50"
            aria-label="Search sections and projects"
          />
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-auto">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-white/70">No results</div>
          ) : (
            <ul className="py-2">
              {results.map((item, i) => (
                <li key={`${item.id}|${item.href ?? ""}|${item.label}`}>
                  <button
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => trigger(item)}
                    className={cn(
                      "w-full text-left px-3 py-2 flex items-center justify-between",
                      i === activeIndex
                        ? "bg-white/10 text-white"
                        : "hover:bg-white/5"
                    )}
                  >
                    <span className="text-white/90">{item.label}</span>
                    {item.group ? (
                      <span className="text-xs text-white/60">
                        {item.group}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-3 py-2 border-t border-white/10 text-white/60 text-xs flex items-center justify-between">
          <span>Use / or Ctrl+K • Enter to jump</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
