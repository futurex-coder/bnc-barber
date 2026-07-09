"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotionSafe";
import { Container } from "@/components/ui/Container";
import type { EventItem } from "@/lib/content";
import { formatEventDate } from "@/lib/utils";
import { useClientNow } from "@/lib/useToday";

/** Rotating strip of upcoming events / announcements. */
export function EventsStripClient({ events }: { events: EventItem[] }) {
  const [i, setI] = useState(0);
  // `null` on server / first render → show all (deterministic SSR). After
  // mount we drop past events so "Предстои" (upcoming) stays truthful.
  const now = useClientNow();
  const reduce = usePrefersReducedMotion();

  const list = useMemo(() => {
    if (now === null) return events;
    const upcoming = events.filter(
      (e) => new Date(e.date + "T23:59:59Z").getTime() >= now,
    );
    return upcoming.length ? upcoming : events;
  }, [now, events]);

  useEffect(() => {
    if (list.length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % list.length), 4200);
    return () => clearInterval(id);
  }, [list.length]);

  if (!list.length) return null;

  // Derive a safe index in case the list shrank after client-side filtering.
  const active = list.length ? i % list.length : 0;
  const ev = list[active];
  const { day, month } = formatEventDate(ev.date);

  return (
    <div className="border-y border-hairline bg-base-elevated/50">
      <Container className="flex items-center gap-4 py-3.5">
        <span className="flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
          <span className="relative flex h-2 w-2">
            {!reduce ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            ) : null}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          Предстои
        </span>

        <div className="relative h-6 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center gap-3 text-sm"
            >
              <span className="shrink-0 font-display text-gold-bright">
                {day} {month}
              </span>
              <span className="hidden shrink-0 text-grey/40 sm:inline">·</span>
              <span className="hidden shrink-0 text-xs uppercase tracking-wide text-grey sm:inline">
                {ev.label}
              </span>
              <span className="truncate text-ink/90">{ev.title}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden shrink-0 sm:flex">
          {list.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Покажи събитие ${idx + 1}`}
              aria-current={idx === active ? "true" : undefined}
              className="grid h-6 w-6 place-items-center"
            >
              <span
                className={`h-1.5 rounded-full transition-all ${
                  idx === active ? "w-5 bg-gold" : "w-1.5 bg-grey/30"
                }`}
              />
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}
