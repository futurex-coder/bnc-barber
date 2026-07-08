"use client";

import { type Location } from "@/data/site";
import { useTodayIndex } from "@/lib/useToday";
import { ClockIcon } from "@/components/ui/icons";

const NAMES = [
  "Неделя",
  "Понеделник",
  "Вторник",
  "Сряда",
  "Четвъртък",
  "Петък",
  "Събота",
];

/** "Днес 10:00–20:00" / "Днес почивен ден" — computed client-side so it is
 *  always correct on statically-generated pages. Renders nothing until mount. */
export function TodayStatus({ loc }: { loc: Location }) {
  const idx = useTodayIndex();
  if (idx === null) return null;

  const today = loc.hours.find((h) => h.day === NAMES[idx]);
  if (!today) return null;

  return (
    <p className="inline-flex items-center gap-2 text-sm text-grey">
      <ClockIcon className="h-4 w-4 shrink-0 text-gold" />
      {today.open ? `Днес ${today.open}–${today.close}` : "Днес почивен ден"}
    </p>
  );
}
