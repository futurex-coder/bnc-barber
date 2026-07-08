import { cn } from "@/lib/utils";

/**
 * Circular rotating text badge (SVG). Slowly spins via CSS; frozen under
 * reduced motion. A signature "fancy" flourish used on guest/residency art.
 */
export function RotatingBadge({
  text = "GUEST ARTIST · РЕЗИДЕНЦИЯ · ",
  className,
  center,
}: {
  text?: string;
  className?: string;
  center?: React.ReactNode;
}) {
  const id = "rot-" + text.replace(/[^a-z]/gi, "").slice(0, 6);
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg
        viewBox="0 0 200 200"
        className="rotating-badge h-full w-full"
        aria-hidden
      >
        <defs>
          <path
            id={id}
            d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
            fill="none"
          />
        </defs>
        <text className="fill-gold" fontSize="13" letterSpacing="3.2" fontWeight="600">
          <textPath href={`#${id}`} className="uppercase">
            {text.repeat(2)}
          </textPath>
        </text>
      </svg>
      {center ? (
        <span className="absolute inset-0 grid place-items-center">{center}</span>
      ) : null}
    </div>
  );
}
