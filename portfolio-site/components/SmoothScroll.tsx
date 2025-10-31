"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Use native scrolling on non-touch (mouse/trackpad) devices for zero input latency
    const isTouchPrimary = window.matchMedia("(pointer: coarse)").matches;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (prefersReducedMotion || !isTouchPrimary) return;

    const lenis = new Lenis({
      // Keep minimal smoothing on touch devices only
      duration: 0.2,
      lerp: 0.25,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
