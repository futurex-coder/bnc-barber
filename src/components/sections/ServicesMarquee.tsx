const WORDS = [
  "Skin fade",
  "Класически бръснач",
  "Оформяне на брада",
  "Кралско бръснене",
  "Баща + син",
  "Hot towel",
  "Line-up",
  "Детска подстрижка",
  "Академия",
];

/** Infinite, seamless services marquee. Pure CSS animation. */
export function ServicesMarquee() {
  return (
    <div
      className="group relative flex overflow-hidden border-y border-hairline bg-base py-6"
      aria-hidden
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />

      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
        {[...WORDS, ...WORDS].map((w, i) => (
          <MarqueeItem key={`a-${i}`} label={w} />
        ))}
      </div>
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
        {[...WORDS, ...WORDS].map((w, i) => (
          <MarqueeItem key={`b-${i}`} label={w} />
        ))}
      </div>
    </div>
  );
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-8">
      <span className="font-display text-2xl uppercase tracking-wide text-ink/85 sm:text-3xl">
        {label}
      </span>
      <span className="text-gold" aria-hidden>
        ✦
      </span>
    </span>
  );
}
