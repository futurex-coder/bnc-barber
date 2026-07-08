import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { BreadcrumbJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { InstagramIcon, ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { SITE, SITE_URL } from "@/config/site";
import { guests, getGuest, getLocation } from "@/data/site";
import { formatDateRange } from "@/lib/utils";

export function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuest(slug);
  if (!g) return {};
  const dates = formatDateRange(g.from, g.to);
  const title = `${g.name} — ${g.discipline}`;
  const description = `${g.name} гостува в Bonnie & Clyde, Русе (${dates}). ${g.style}`;
  return {
    title,
    description,
    alternates: { canonical: `/gosti/${g.slug}` },
    openGraph: {
      url: `/gosti/${g.slug}`,
      title: `${g.name} · Гост в Bonnie & Clyde`,
      description,
    },
  };
}

export default async function GuestDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = getGuest(slug);
  if (!guest) notFound();
  const loc = getLocation(guest.locationSlug);
  const dates = formatDateRange(guest.from, guest.to);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${guest.name} — резиденция в ${SITE.name}`,
    startDate: guest.from,
    endDate: guest.to,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: `${SITE.name} — ${loc?.name ?? "Русе"}`,
      address: { "@type": "PostalAddress", addressLocality: "Русе", addressCountry: "BG" },
    },
    performer: { "@type": "Person", name: guest.name },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    url: `${SITE_URL}/gosti/${guest.slug}`,
  };

  return (
    <>
      <JsonLdScript data={schema} />
      <BreadcrumbJsonLd
        items={[
          { name: "Начало", url: "/" },
          { name: "Събития & гости", url: "/sabitiya" },
          { name: guest.name, url: `/gosti/${guest.slug}` },
        ]}
      />

      <Section className="pt-36 sm:pt-44">
        <Container>
          <Reveal>
            <Link
              href="/sabitiya"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-grey transition-colors hover:text-gold-bright"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" /> Всички гости &amp; събития
            </Link>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative">
              <div className="glow-border relative aspect-[4/5] overflow-hidden rounded-brand">
                <SmartImage
                  alt={`${guest.name} — ${guest.discipline}`}
                  variant={3}
                  className="absolute inset-0 grayscale transition-all duration-700 hover:grayscale-0"
                  label={guest.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/70 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-gold/40 bg-base/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-bright backdrop-blur">
                  {guest.discipline}
                </span>
              </div>
              <RotatingBadge
                className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-base/80 backdrop-blur sm:h-32 sm:w-32"
                text="GUEST · РЕЗИДЕНЦИЯ · "
                center={<span className="font-display text-2xl text-gold-bright">B&amp;C</span>}
              />
            </Reveal>

            <Reveal className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-sm uppercase tracking-[0.2em] text-gold">
                  {guest.discipline}
                </span>
                <h1 className="font-display text-5xl text-ink sm:text-6xl">{guest.name}</h1>
              </div>
              <p className="text-lg text-gold-bright">{guest.style}</p>
              <p className="max-w-md leading-relaxed text-grey">{guest.bio}</p>

              <div className="flex flex-wrap gap-2">
                {guest.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-hairline px-3 py-1 text-xs text-grey"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <dl className="flex flex-wrap gap-8 border-y border-hairline py-4">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-grey">Дати</dt>
                  <dd className="font-display text-2xl text-ink">{dates}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-grey">Място</dt>
                  <dd className="inline-flex items-center gap-1.5 font-display text-2xl text-ink">
                    <MapPinIcon className="h-4 w-4 text-gold" />
                    {loc?.name}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-3">
                <Button href={SITE.instagram.shop.url} external variant="gold" size="lg">
                  <InstagramIcon className="h-4 w-4" />
                  Запитай за час
                </Button>
                {guest.instagram ? (
                  <a
                    href={guest.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center gap-2 rounded-full border border-hairline px-5 text-sm text-grey transition-colors hover:border-gold hover:text-gold-bright"
                  >
                    <InstagramIcon className="h-4 w-4" />@{guest.instagram.handle}
                  </a>
                ) : null}
              </div>
              <p className="text-sm text-grey">
                Часовете при гости са ограничени и се пълнят бързо — пиши ни рано.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
