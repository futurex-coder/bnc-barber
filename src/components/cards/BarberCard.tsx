import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { InstagramIcon } from "@/components/ui/icons";
import type { Barber } from "@/data/site";

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-brand border border-hairline bg-base-elevated transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-gold/40">
      <Link
        href={`/ekip/${barber.slug}`}
        className="relative block aspect-[4/5] overflow-hidden"
        aria-label={`${barber.name} — ${barber.role}`}
      >
        {/* grayscale → colour on hover */}
        <SmartImage
          alt={`${barber.name} — ${barber.role}`}
          className="absolute inset-0 grayscale transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:grayscale-0"
          label={barber.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-elevated via-base-elevated/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl text-ink">{barber.name}</h3>
          <p className="text-sm text-gold">{barber.role}</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-grey/90">{barber.tagline}</p>

        <ul className="flex flex-wrap gap-1.5">
          {barber.specialties.map((s) => (
            <li
              key={s}
              className="rounded-full border border-hairline px-2.5 py-1 text-xs text-grey"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <FreshaButton
            barberSlug={barber.slug}
            locationSlug={barber.locationSlug}
            size="md"
            variant="outline"
            label={`Запази с ${barber.name}`}
            withIcon={false}
          />
          {barber.instagram ? (
            <a
              href={barber.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram на ${barber.name}`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline text-grey transition-colors hover:border-gold hover:text-gold-bright"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
