import { formatDuration, formatPrice } from "@/lib/utils";
import type { Service } from "@/data/site";

export function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="group flex items-baseline gap-4 py-5">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl uppercase tracking-wide text-ink transition-colors group-hover:text-gold-bright">
            {service.name}
          </h3>
          {service.popular ? (
            <span className="rounded-full border border-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
              Топ
            </span>
          ) : null}
        </div>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-grey">
          {service.description}
        </p>
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
    </div>
  );
}
