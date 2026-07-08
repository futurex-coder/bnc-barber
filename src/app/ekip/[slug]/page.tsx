import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { FinalCta } from "@/components/sections/FinalCta";
import { BreadcrumbJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { InstagramIcon, ArrowRightIcon } from "@/components/ui/icons";
import { SITE, SITE_URL } from "@/config/site";
import { barbers, getBarber, getLocation } from "@/data/site";

export function generateStaticParams() {
  return barbers.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBarber(slug);
  if (!b) return {};
  const title = `${b.name} — ${b.role}`;
  const description = `${b.name}: ${b.tagline} Запази час в Bonnie & Clyde, Русе.`;
  return {
    title,
    description,
    alternates: { canonical: `/ekip/${b.slug}` },
    openGraph: {
      url: `/ekip/${b.slug}`,
      title: `${b.name} · Bonnie & Clyde`,
      description,
    },
  };
}

export default async function BarberDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const barber = getBarber(slug);
  if (!barber) notFound();
  const loc = getLocation(barber.locationSlug);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: barber.name,
    jobTitle: barber.role,
    worksFor: { "@type": "HairSalon", name: SITE.name },
    ...(barber.instagram ? { sameAs: [barber.instagram.url] } : {}),
    url: `${SITE_URL}/ekip/${barber.slug}`,
  };

  return (
    <>
      <JsonLdScript data={personSchema} />
      <BreadcrumbJsonLd
        items={[
          { name: "Начало", url: "/" },
          { name: "Екип", url: "/ekip" },
          { name: barber.name, url: `/ekip/${barber.slug}` },
        ]}
      />

      <Section className="pt-36 sm:pt-44">
        <Container>
          <Reveal>
            <Link
              href="/ekip"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-grey transition-colors hover:text-gold-bright"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" /> Целият екип
            </Link>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-brand border border-hairline">
                <SmartImage
                  alt={`${barber.name} — ${barber.role}`}
                  className="absolute inset-0 grayscale transition-all duration-700 group-hover:grayscale-0"
                  label={barber.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
              </div>
            </Reveal>

            <Reveal className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-sm uppercase tracking-[0.2em] text-gold">
                  {barber.role}
                </span>
                <h1 className="font-display text-5xl text-ink sm:text-6xl">{barber.name}</h1>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-grey">{barber.bio}</p>

              <div className="flex flex-wrap gap-2">
                {barber.specialties.map((s) => (
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
                  <dd className="font-display text-2xl text-ink">{barber.yearsExperience}+ г.</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-grey">Локация</dt>
                  <dd className="font-display text-2xl text-ink">{loc?.name}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-3">
                <FreshaButton
                  barberSlug={barber.slug}
                  locationSlug={barber.locationSlug}
                  size="lg"
                  label={`Запази с ${barber.name}`}
                />
                {barber.instagram ? (
                  <a
                    href={barber.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center gap-2 rounded-full border border-hairline px-5 text-sm text-grey transition-colors hover:border-gold hover:text-gold-bright"
                  >
                    <InstagramIcon className="h-4 w-4" />@{barber.instagram.handle}
                  </a>
                ) : null}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
