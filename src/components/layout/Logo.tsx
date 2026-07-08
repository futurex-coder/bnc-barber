import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark lockup. Compact monogram + full name. */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      // When the wordmark text is visible, it IS the accessible name (WCAG
      // 2.5.3 label-in-name). Only supply an aria-label in compact mode where
      // just the monogram shows.
      aria-label={compact ? "Bonnie & Clyde — начало" : undefined}
      className={cn(
        "group inline-flex items-center gap-2.5 text-ink transition-colors",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-full border border-hairline-strong font-display text-sm leading-none text-gold transition-colors group-hover:border-gold"
      >
        B&C
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-wide">Bonnie &amp; Clyde</span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-grey">
            Барбершоп · Академия
          </span>
        </span>
      ) : null}
    </Link>
  );
}
