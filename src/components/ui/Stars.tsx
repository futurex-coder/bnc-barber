import { cn } from "@/lib/utils";

/** Row of star glyphs. `value` may be fractional (e.g. 4.9). */
export function Stars({
  value = 5,
  className,
  size = "sm",
}: {
  value?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const full = Math.round(value);
  return (
    <span
      className={cn("inline-flex", className)}
      role="img"
      aria-label={`${value} от 5 звезди`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            size === "sm" ? "text-sm" : "text-base",
            i < full ? "text-gold-bright" : "text-grey/30",
          )}
        >
          ★
        </span>
      ))}
    </span>
  );
}
