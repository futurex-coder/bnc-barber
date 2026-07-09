import { formatDuration, formatPrice } from "@/lib/utils";
import { DEFAULT_FRESHA } from "@/config/booking";
import { RichText } from "@/components/ui/RichText";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Service } from "@/lib/content";

/** A single service row. The whole row links to the service's booking URL
 *  (falls back to the flagship Fresha) — click the name or the box to book. */
export function ServiceRow({ service }: { service: Service }) {
  const href = service.bookingUrl || DEFAULT_FRESHA;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline gap-4 py-5"
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-display text-xl uppercase tracking-wide text-ink transition-colors group-hover:text-gold-bright">
            {service.name}
          </h4>
          {service.popular ? (
            <span className="rounded-full border border-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
              Топ
            </span>
          ) : null}
          {service.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-hairline px-2 py-0.5 text-[10px] uppercase tracking-wider text-grey"
            >
              {t}
            </span>
          ))}
          <ArrowUpRightIcon className="h-3.5 w-3.5 text-grey/0 transition-colors group-hover:text-gold-bright" />
        </div>
        <RichText
          html={service.description}
          className="mt-1 max-w-md text-sm leading-relaxed text-grey"
        />
      </div>

      {/* dotted leader */}
      <div
        className="mx-1 hidden flex-1 translate-y-[-4px] border-b border-dashed border-hairline sm:block"
        aria-hidden
      />

      <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
        <span className="font-display text-xl text-ink">{formatPrice(service.price)}</span>
        <span className="text-xs text-grey">{formatDuration(service.durationMin)}</span>
      </div>
    </a>
  );
}
