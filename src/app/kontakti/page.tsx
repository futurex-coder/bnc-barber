import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { Button } from "@/components/ui/Button";
import { LocationHours } from "@/components/sections/LocationHours";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PhoneIcon, InstagramIcon, MapPinIcon, GraduationIcon } from "@/components/ui/icons";
import { getSiteSettings, getLocations } from "@/lib/content";
import { telHref } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Свържи се с Bonnie & Clyde в Русе — телефон 0882 031 790, Instagram, адрес и онлайн резервация.",
  alternates: { canonical: "/kontakti" },
  openGraph: {
    url: "/kontakti",
    title: "Контакти · Bonnie & Clyde",
    description: "Телефон, Instagram, адрес и онлайн резервация.",
  },
};

export default async function KontaktiPage() {
  const [settings, locations] = await Promise.all([getSiteSettings(), getLocations()]);
  // Prefer the first open location as the primary contact point.
  const flagship = locations.find((l) => l.status === "open") ?? locations[0];

  return (
    <>
      <PageHeader
        eyebrow="Контакти"
        title={
          <>
            Обади се, <span className="accent text-gold-gradient">намери ни.</span>
          </>
        }
        lead={
          settings.contactsIntro ||
          "Най-бързо е онлайн през Fresha. За всичко друго — обади се или пиши в Instagram."
        }
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-brand border border-hairline bg-base-elevated p-7">
              <h2 className="font-display text-xl uppercase tracking-wide text-ink">
                Директен контакт
              </h2>
              {settings.phone ? (
                <a
                  href={telHref(settings.phone)}
                  className="flex items-center gap-3 text-lg text-ink transition-colors hover:text-gold-bright"
                >
                  <PhoneIcon className="h-5 w-5 text-gold" /> {settings.phone}
                </a>
              ) : null}
              {settings.instagramShop.url ? (
                <a
                  href={settings.instagramShop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg text-ink transition-colors hover:text-gold-bright"
                >
                  <InstagramIcon className="h-5 w-5 text-gold" /> @{settings.instagramShop.handle}
                </a>
              ) : null}
              {flagship ? (
                <span className="flex items-start gap-3 text-lg text-ink">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  {flagship.addressLine}, {flagship.district}, {flagship.city}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 rounded-brand border border-hairline bg-base-elevated p-7">
              <h2 className="font-display text-xl uppercase tracking-wide text-ink">
                Какво ти трябва?
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 rounded-xl border border-hairline p-4">
                  <p className="text-sm text-grey">Идваш за подстрижка или брада?</p>
                  <FreshaButton
                    href={flagship?.freshaUrl || settings.defaultFreshaUrl}
                    size="md"
                    label="Запази час (Fresha)"
                  />
                </div>
                {settings.calcomUrl ? (
                  <div className="flex flex-col gap-2 rounded-xl border border-hairline p-4">
                    <p className="text-sm text-grey">Интересуваш се от Академията?</p>
                    <Button href={settings.calcomUrl} external variant="outline" size="md">
                      <GraduationIcon className="h-4 w-4" />
                      Запиши консултация (Cal.com)
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>

          {flagship ? (
            <Reveal className="flex flex-col gap-6">
              <MapEmbed
                query={flagship.mapEmbedQuery}
                lat={flagship.geo?.lat}
                lng={flagship.geo?.lng}
              />
              <div className="rounded-brand border border-hairline bg-base-elevated p-7">
                <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-ink">
                  Работно време · {flagship.name}
                </h2>
                <LocationHours loc={flagship} />
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
