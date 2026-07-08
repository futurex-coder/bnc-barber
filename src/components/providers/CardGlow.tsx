"use client";

import { useEffect } from "react";

/**
 * Single delegated pointer listener that drives a cursor-following highlight on
 * any element with the `.card-glow` class (see globals.css). One listener for
 * the whole page — no per-card React state. Skipped for touch/coarse pointers.
 */
export function CardGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>(".card-glow");
      if (!el) return;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
