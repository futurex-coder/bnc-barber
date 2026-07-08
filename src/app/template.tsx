"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotionSafe";

// Module-scoped so it survives client-side navigations but resets on a full
// page load. The very first paint renders with no enter animation (so it never
// gates LCP); subsequent route changes get a soft fade-up.
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const animate = !firstLoad && !reduce;

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
