"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide motion configuration. `reducedMotion="user"` tells framer-motion to
 * automatically drop transform/layout animations for visitors who ask for
 * reduced motion — evaluated at animation time on the client, so it adds no
 * hydration risk. Paired with the hydration-safe `usePrefersReducedMotion`
 * hook and the CSS `prefers-reduced-motion` rules, motion is respected end to
 * end.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
