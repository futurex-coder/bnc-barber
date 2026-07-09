import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { TodayStatus } from "@/components/cards/TodayStatus";
import { MapPinIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import type { Location } from "@/lib/content";

export function LocationCard({ loc }: { loc: Location }) {
  const soon = loc.status === "coming-soon";

  return (
    <article className="card-glow group relative flex flex-col overflow-hidden rounded-brand border border-hairline bg-base-elevated transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-gold/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={loc.images[0]?.url || undefined}
          alt={loc.images[0]?.alt || `${loc.name} — интериор на салона`}
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
          variant={soon ? 2 : 1}
          label={loc.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-elevated via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          {soon ? (
            <span className="rounded-full border border-gold/40 bg-base/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold backdrop-blur">
              Очаквай скоро
            </span>
          ) : (
            <span className="rounded-full border border-hairline bg-base/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink backdrop-blur">
              Отворено
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-2xl text-ink">{loc.name}</h3>
          <p className="inline-flex items-center gap-2 text-sm text-grey">
            <MapPinIcon className="h-4 w-4 shrink-0 text-gold" />
            {soon ? "Русе · адрес скоро" : `${loc.addressLine}, ${loc.city}`}
          </p>
          {!soon ? <TodayStatus loc={loc} /> : null}
        </div>

        <p className="text-sm leading-relaxed text-grey/90">{loc.blurb}</p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {soon ? (
            <Link
              href={`/lokacii/${loc.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-bright transition-colors hover:text-gold"
            >
              Научи повече <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <FreshaButton href={loc.freshaUrl} size="md" label="Запази час" />
              <Link
                href={`/lokacii/${loc.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/80 transition-colors hover:text-gold-bright"
              >
                Детайли <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
