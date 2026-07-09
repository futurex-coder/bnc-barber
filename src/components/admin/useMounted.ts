"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, true after hydration —
 * without an effect (lint-clean). Used to defer client-only widgets (dnd-kit)
 * whose generated ids would otherwise cause hydration mismatches.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
