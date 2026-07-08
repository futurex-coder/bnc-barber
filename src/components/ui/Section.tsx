import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

/** Small eyebrow label above a section title. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-gold">
      <span className="h-px w-6 bg-gold/60" aria-hidden />
      {children}
    </span>
  );
}

/** Section wrapper with consistent vertical rhythm. */
export function Section({
  children,
  className,
  id,
  hairline = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Draw a leading hairline divider at the top. */
  hairline?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-28",
        hairline && "border-t border-hairline",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Standard section header: eyebrow + title + optional lead. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink max-w-3xl text-balance">
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-xl text-base sm:text-lg text-grey leading-relaxed",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

export { Container };
