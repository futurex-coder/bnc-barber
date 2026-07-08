import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { MapPinIcon, ArrowUpRightIcon, ClockIcon } from "@/components/ui/icons";
import type { Location } from "@/data/site";

/** Is the location open right now (Europe/Sofia)? Best-effort, display-only. */
function todayHours(loc: Location) {
  const names = ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"];
  const now = new Date();
  const dayName = names[now.getUTCDay()];
  return loc.hours.find((h) => h.day === dayName);
}

export function LocationCard({ loc }: { loc: Location }) {
  const soon = loc.status === "coming-soon";
  const today = todayHours(loc);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-brand border border-hairline bg-base-elevated transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-gold/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          alt={`${loc.name} — интериор на салона`}
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
          {!soon && today ? (
            <p className="inline-flex items-center gap-2 text-sm text-grey">
              <ClockIcon className="h-4 w-4 shrink-0 text-gold" />
              {today.open ? `Днес ${today.open}–${today.close}` : "Днес почивен ден"}
            </p>
          ) : null}
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
              <FreshaButton locationSlug={loc.slug} size="md" label="Запази час" />
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
