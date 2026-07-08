"use client";

import { useSyncExternalStore } from "react";

/** No-op store: the value never changes after mount, so nothing to subscribe to. */
const subscribe = () => () => {};

/**
 * Returns the current weekday index (0 = Sunday … 6 = Saturday) on the client,
 * and `null` during SSR / the first client render.
 *
 * Why not call `new Date()` during render? Pages here are statically generated,
 * so a server-side `new Date()` freezes "today" at build time and mislabels the
 * open day for every visitor. `useSyncExternalStore` gives a distinct server
 * snapshot (`null`) and client snapshot (real day) with no hydration mismatch
 * and no set-state-in-effect.
 */
export function useTodayIndex(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getDay(),
    () => null,
  );
}

// Captured once on the client so the snapshot stays stable across renders
// (useSyncExternalStore requires a referentially-stable getSnapshot value).
let cachedNow: number | null = null;
function clientNow(): number {
  if (cachedNow === null) cachedNow = Date.now();
  return cachedNow;
}

/**
 * Current timestamp (ms) on the client, `null` during SSR / first render.
 * Stable after mount — safe for date filtering without hydration mismatch.
 */
export function useClientNow(): number | null {
  return useSyncExternalStore(subscribe, clientNow, () => null);
}
