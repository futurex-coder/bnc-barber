import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { BarberCard } from "@/components/cards/BarberCard";
import { LocationHours } from "@/components/sections/LocationHours";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { FinalCta } from "@/components/sections/FinalCta";
import { LocationJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PhoneIcon, MapPinIcon } from "@/components/ui/icons";
import { SITE } from "@/config/site";
import { locations, getLocation, barbersForLocation } from "@/data/site";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  const title = `${loc.name} — ${loc.city}`;
  const description =
    loc.status === "open"
      ? `Bonnie & Clyde ${loc.name}: ${loc.addressLine}, ${loc.city}. Работно време, услуги и онлайн резервация.`
      : `Bonnie & Clyde ${loc.name} — очаквай скоро в Русе. Следи за откриването.`;
  return {
    title,
    description,
    alternates: { canonical: `/lokacii/${loc.slug}` },
    openGraph: { title: `${loc.name} · Bonnie & Clyde`, description },
  };
}

export default async function LocationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const soon = loc.status === "coming-soon";
  const team = barbersForLocation(loc.slug);

  return (
    <>
      <LocationJsonLd loc={loc} />
      <BreadcrumbJsonLd
        items={[
          { name: "Начало", url: "/" },
          { name: "Локации", url: "/lokacii" },
          { name: loc.name, url: `/lokacii/${loc.slug}` },
        ]}
      />

      <PageHeader
        eyebrow={soon ? "Очаквай скоро" : "Локация"}
        title={
          <>
            {loc.name}
          </>
        }
        lead={loc.description}
      >
        <div className="flex flex-wrap items-center gap-4">
          {!soon ? (
            <FreshaButton locationSlug={loc.slug} size="lg" label="Запази час тук" />
          ) : (
            <span className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold">
              Отваряме скоро
            </span>
          )}
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-gold-bright"
          >
            <PhoneIcon className="h-4 w-4 text-gold" /> {loc.phone}
          </a>
        </div>
      </PageHeader>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="flex flex-col gap-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-brand border border-hairline">
              <SmartImage alt={`${loc.name} — салон`} variant={soon ? 2 : 1} label={loc.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-base/50 to-transparent" />
            </div>
            <MapEmbed
              query={loc.mapEmbedQuery}
              lat={loc.geo?.lat}
              lng={loc.geo?.lng}
              comingSoon={soon}
            />
          </Reveal>

          <Reveal className="flex flex-col gap-8">
            <div className="rounded-brand border border-hairline bg-base-elevated p-6">
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-ink">
                Работно време
              </h2>
              {soon ? (
                <p className="text-sm leading-relaxed text-grey">
                  Работното време ще обявим при откриването. Флагманът в Здравец
                  Изток работи всеки ден — до тогава заповядай там.
                </p>
              ) : (
                <LocationHours loc={loc} />
              )}
            </div>

            <div className="rounded-brand border border-hairline bg-base-elevated p-6">
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-ink">
                Адрес & контакт
              </h2>
              <ul className="flex flex-col gap-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-ink/90">
                    {soon ? "Русе · адрес скоро" : `${loc.addressLine}, ${loc.district}, ${loc.city}`}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <a href={SITE.phoneHref} className="text-ink/90 hover:text-gold-bright">
                    {loc.phone}
                  </a>
                </li>
              </ul>
              <p className="mt-4 border-t border-hairline pt-4 text-sm text-grey">
                Ценови диапазон: <span className="text-ink">{loc.priceRange}</span>
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {!soon && team.length ? (
        <Section hairline>
          <Container className="flex flex-col gap-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Екип на {loc.name}
              </h2>
              <Link
                href="/ekip"
                className="text-sm text-ink/80 transition-colors hover:text-gold-bright"
              >
                Целият екип →
              </Link>
            </div>
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((b) => (
                <RevealItem key={b.slug}>
                  <BarberCard barber={b} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <FinalCta />
    </>
  );
}
