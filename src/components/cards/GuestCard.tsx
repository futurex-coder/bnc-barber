import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { InstagramIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { formatDateRange } from "@/lib/utils";
import type { Guest } from "@/lib/content";

export function GuestCard({ guest }: { guest: Guest }) {
  return (
    <article className="card-glow group relative flex flex-col overflow-hidden rounded-brand border border-hairline bg-base-elevated/70 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-gold/40">
      <Link
        href={`/gosti/${guest.slug}`}
        className="relative block aspect-[4/5] overflow-hidden"
        aria-label={`${guest.name} — ${guest.discipline}`}
      >
        <SmartImage
          src={guest.imageUrl || undefined}
          alt={`${guest.name} — ${guest.discipline}`}
          variant={3}
          className="absolute inset-0 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          label={guest.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-elevated via-base-elevated/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-base/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-bright backdrop-blur">
          {guest.discipline}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl text-ink">{guest.name}</h3>
          <p className="text-sm text-gold">{formatDateRange(guest.from, guest.to)}</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-grey/90">{guest.style}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <Link
            href={`/gosti/${guest.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/80 transition-colors hover:text-gold-bright"
          >
            Виж резиденцията <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          {guest.instagram ? (
            <a
              href={guest.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram на ${guest.name}`}
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
