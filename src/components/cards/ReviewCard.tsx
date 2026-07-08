import { Stars } from "@/components/ui/Stars";
import type { Review } from "@/data/site";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-brand border border-hairline bg-base-elevated p-6 transition-colors duration-500 hover:border-gold/30">
      <div className="flex items-center justify-between">
        <Stars value={review.rating} />
        <span className="text-[11px] uppercase tracking-wider text-grey/70">
          {review.source}
        </span>
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/90">
        „{review.text}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-hairline pt-4">
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold/30 to-oxblood/30 font-display text-sm text-ink"
        >
          {review.author.charAt(0)}
        </span>
        <span className="text-sm font-medium text-ink">{review.author}</span>
      </figcaption>
    </figure>
  );
}
