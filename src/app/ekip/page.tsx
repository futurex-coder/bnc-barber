import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { FinalCta } from "@/components/sections/FinalCta";
import { InstagramIcon, ArrowRightIcon } from "@/components/ui/icons";
import { barbers, getLocation } from "@/data/site";

export const metadata: Metadata = {
  title: "Екип",
  description:
    "Запознай се с бръснарите на Bonnie & Clyde в Русе. Избери своя майстор и запази час директно с него.",
  alternates: { canonical: "/ekip" },
  openGraph: {
    url: "/ekip",
    title: "Екипът · Bonnie & Clyde",
    description: "Ръцете зад стола — избери своя бръснар и запази час.",
  },
};

export default function EkipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Екипът"
        title={
          <>
            Ръцете зад <span className="accent text-gold-gradient">стола.</span>
          </>
        }
        lead="Малък екип с голямо внимание към детайла. Всеки със свой почерк — избери този, който е за теб."
      />

      <Section>
        <Container className="flex flex-col gap-16 sm:gap-24">
          {barbers.map((b, i) => {
            const loc = getLocation(b.locationSlug);
            return (
              <RevealGroup
                key={b.slug}
                as="section"
                id={b.slug}
                className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <RevealItem
                  className={i % 2 === 1 ? "lg:order-2" : ""}
                >
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-brand border border-hairline">
                    <SmartImage
                      alt={`${b.name} — ${b.role}`}
                      variant={i % 2 === 0 ? 1 : 2}
                      className="absolute inset-0 grayscale transition-all duration-700 group-hover:grayscale-0"
                      label={b.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
                  </div>
                </RevealItem>

                <RevealItem className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm uppercase tracking-[0.2em] text-gold">
                      {b.role}
                    </span>
                    <h2 className="font-display text-4xl text-ink sm:text-5xl">
                      <Link
                        href={`/ekip/${b.slug}`}
                        className="transition-colors hover:text-gold-bright"
                      >
                        {b.name}
                      </Link>
                    </h2>
                  </div>
                  <p className="max-w-md text-lg leading-relaxed text-grey">{b.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {b.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-hairline px-3 py-1 text-xs text-grey"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <dl className="flex gap-8 border-y border-hairline py-4">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-grey">Опит</dt>
                      <dd className="font-display text-2xl text-ink">
                        {b.yearsExperience}+ г.
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-grey">Локация</dt>
                      <dd className="font-display text-2xl text-ink">{loc?.name}</dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center gap-3">
                    <FreshaButton
                      barberSlug={b.slug}
                      locationSlug={b.locationSlug}
                      size="lg"
                      label={`Запази с ${b.name}`}
                    />
                    {b.instagram ? (
                      <a
                        href={b.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-14 items-center gap-2 rounded-full border border-hairline px-5 text-sm text-grey transition-colors hover:border-gold hover:text-gold-bright"
                      >
                        <InstagramIcon className="h-4 w-4" />@{b.instagram.handle}
                      </a>
                    ) : null}
                  </div>
                  <Link
                    href={`/ekip/${b.slug}`}
                    className="inline-flex w-fit items-center gap-1.5 text-sm text-grey transition-colors hover:text-gold-bright"
                  >
                    Отвори профила на {b.name}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </RevealItem>
              </RevealGroup>
            );
          })}
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
