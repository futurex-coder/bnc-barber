"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia
    ? window.matchMedia(QUERY).matches
    : false;
}

/**
 * Hydration-safe replacement for framer-motion's `useReducedMotion`.
 *
 * Framer's hook reads the media query eagerly on the client's first render,
 * so it returns `true` while the server rendered `false` — any component that
 * branches its output on it then throws a hydration mismatch (React #418).
 *
 * `useSyncExternalStore` returns the *server* snapshot (`false`) during
 * hydration, matching SSR, then re-renders with the real value. So the first
 * client render always agrees with the server, and reduced-motion behaviour
 * kicks in immediately after — no mismatch, no flash of motion.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
