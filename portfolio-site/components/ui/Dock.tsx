"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type DockItem = {
  id: string; // section id without '#'
  label: string;
};

type DockProps = {
  items: DockItem[];
  className?: string;
};

export default function Dock({ items, className }: DockProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const tickingRef = useRef(false);
  const containerRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const sectionIds = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        tickingRef.current = false;
        let bestId = activeId;
        let bestScore = -Infinity;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // Score: prioritize the section whose center is closest to viewport center
          const viewportCenter = window.innerHeight / 2;
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          const inView = rect.bottom > 0 && rect.top < window.innerHeight;
          const score = (inView ? 1 : 0) * (10000 - distance);
          if (score > bestScore) {
            bestScore = score;
            bestId = id;
          }
        }
        if (bestId && bestId !== activeId) setActiveId(bestId);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeId, sectionIds]);

  // Update animated indicator position
  useEffect(() => {
    const listEl = containerRef.current;
    const activeEl = itemRefs.current[activeId];
    if (listEl && activeEl) {
      const listRect = listEl.getBoundingClientRect();
      const rect = activeEl.getBoundingClientRect();
      setIndicator({ left: rect.left - listRect.left, width: rect.width });
    }
  }, [activeId, items]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const num = Number(e.key);
      if (!Number.isInteger(num)) return;
      const index = num - 1;
      if (index < 0 || index >= items.length) return;
      const target = items[index];
      const el = document.getElementById(target.id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [items]);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed z-40 left-1/2 -translate-x-1/2 bottom-4 md:top-4 md:bottom-auto",
        "glass glass-border rounded-2xl px-2 py-1 shadow-lg max-w-[95vw]",
        className
      )}
    >
      <ul
        ref={containerRef}
        className="relative flex items-center gap-1 text-sm text-white/80 overflow-x-auto"
        onMouseLeave={() => setMouseX(null)}
        onMouseMove={(e) => setMouseX(e.clientX)}
      >
        {/* Active pill indicator */}
        {indicator ? (
          <div
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 h-[32px] rounded-xl bg-white/15 transition-[left,width] duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
        ) : null}
        {items.map((item) => {
          const isActive = item.id === activeId;
          const anchorRef = (el: HTMLAnchorElement | null) => {
            itemRefs.current[item.id] = el;
          };
          // Magnetic hover scaling
          let scale = 1;
          if (mouseX != null && itemRefs.current[item.id]) {
            const rect = itemRefs.current[item.id]!.getBoundingClientRect();
            const distance = Math.abs(mouseX - (rect.left + rect.width / 2));
            const influence = Math.max(0, 1 - distance / 120); // 0..1
            scale = 1 + influence * 0.18; // up to ~1.18x
          }
          return (
            <li key={item.id}>
              <a
                ref={anchorRef}
                href={`#${item.id}`}
                className={cn(
                  "relative block px-3 py-2 rounded-xl whitespace-nowrap will-change-transform",
                  isActive ? "text-white" : "hover:bg-white/10"
                )}
                aria-current={isActive ? "page" : undefined}
                style={{ transform: `scale(${scale})` }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
