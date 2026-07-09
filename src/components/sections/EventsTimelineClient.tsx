"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { EventItem, Guest } from "@/lib/content";
import { formatEventDate, formatDateRange } from "@/lib/utils";
import { useClientNow } from "@/lib/useToday";
import { usePrefersReducedMotion } from "@/lib/useReducedMotionSafe";
import { ArrowUpRightIcon } from "@/components/ui/icons";

type Row = {
  date: string;
  end?: string;
  label: string;
  title: string;
  href?: string;
  tone: "guest" | "event";
};

function buildRows(events: EventItem[], guests: Guest[]): Row[] {
  const eventRows: Row[] = events.map((e) => ({
    date: e.date,
    label: e.label,
    title: e.title,
    href: e.href || undefined,
    tone: "event",
  }));
  const guestRows: Row[] = guests.map((g) => ({
    date: g.from,
    end: g.to,
    label: g.discipline,
    title: `${g.name} — ${g.style}`,
    href: `/gosti/${g.slug}`,
    tone: "guest",
  }));
  return [...eventRows, ...guestRows].sort((a, b) => a.date.localeCompare(b.date));
}

export function EventsTimelineClient({
  events,
  guests,
}: {
  events: EventItem[];
  guests: Guest[];
}) {
  const now = useClientNow();
  const reduce = usePrefersReducedMotion();
  const all = buildRows(events, guests);
  const rows =
    now === null
      ? all
      : all.filter((r) => new Date((r.end ?? r.date) + "T23:59:59Z").getTime() >= now);
  const list = rows.length ? rows : all;

  return (
    <ol className="relative flex flex-col">
      {/* vertical spine */}
      <span
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/50 via-hairline to-transparent sm:left-[calc(8rem+7px)]"
        aria-hidden
      />
      {list.map((r, i) => {
        const d = formatEventDate(r.date);
        const dateLabel = r.end ? formatDateRange(r.date, r.end) : `${d.day} ${d.month}`;
        const Inner = (
          <div className="flex flex-col gap-1">
            <span
              className={`text-xs uppercase tracking-[0.18em] ${
                r.tone === "guest" ? "text-gold-bright" : "text-gold"
              }`}
            >
              {r.label}
            </span>
            <span className="text-lg text-ink transition-colors group-hover/row:text-gold-bright">
              {r.title}
            </span>
          </div>
        );
        return (
          <motion.li
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            className="group/row relative flex gap-5 py-5 sm:gap-8"
          >
            <span className="hidden w-32 shrink-0 pt-0.5 text-right font-display text-sm text-gold sm:block">
              {dateLabel}
            </span>
            <span className="relative z-10 mt-1.5 grid h-4 w-4 shrink-0 place-items-center">
              <span
                className={`h-3 w-3 rounded-full ring-4 ring-base ${
                  r.tone === "guest" ? "bg-oxblood" : "bg-gold"
                }`}
              />
            </span>
            <div className="flex flex-1 items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-sm text-gold sm:hidden">{dateLabel}</span>
                {r.href ? (
                  r.href.startsWith("/") ? (
                    <Link href={r.href} className="block">
                      {Inner}
                    </Link>
                  ) : (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="block">
                      {Inner}
                    </a>
                  )
                ) : (
                  Inner
                )}
              </div>
              {r.href ? (
                <ArrowUpRightIcon className="mt-1 h-4 w-4 shrink-0 text-grey transition-colors group-hover/row:text-gold-bright" />
              ) : null}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
