"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotionSafe";
import { Container } from "@/components/ui/Container";
import { stats, type Stat } from "@/data/site";

export function Stats() {
  return (
    <section aria-label="Постижения в цифри" className="border-y border-hairline">
      <Container className="grid grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0 [&>*]:border-hairline">
        {stats.map((s) => (
          <StatCell key={s.label} stat={s} />
        ))}
      </Container>
    </section>
  );
}

function formatValue(n: number, target: number) {
  // Fractional targets (e.g. 4.9) keep one decimal; integers use thin spaces.
  if (!Number.isInteger(target)) return n.toFixed(1);
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function StatCell({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotion();
  // Always start at 0 (identical on server + first client render → no
  // hydration mismatch). When in view we animate up; reduced-motion users get
  // duration 0, i.e. the final number appears instantly with no count-up.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: reduce ? 0 : 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  return (
    <div ref={ref} className="flex flex-col gap-1 px-5 py-10 sm:px-8 sm:py-14">
      <span className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
        {stat.prefix}
        {formatValue(display, stat.value)}
        {stat.suffix ? (
          <span className="text-gold">{stat.suffix}</span>
        ) : null}
      </span>
      <span className="text-sm text-grey">{stat.label}</span>
    </div>
  );
}
