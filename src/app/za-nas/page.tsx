import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { RichText } from "@/components/ui/RichText";
import { Stats } from "@/components/sections/Stats";
import { FinalCta } from "@/components/sections/FinalCta";
import { getAbout } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "За нас",
  description:
    "Историята на Bonnie & Clyde — барбершоп и академия в Русе. Занаят, отношение и стол, който е само твой.",
  alternates: { canonical: "/za-nas" },
  openGraph: {
    url: "/za-nas",
    title: "За нас · Bonnie & Clyde",
    description: "Занаят, отношение и стол, който е само твой.",
  },
};

export default async function ZaNasPage() {
  const about = await getAbout();

  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow || "За нас"}
        title={
          <>
            Не салон. <span className="accent text-gold-gradient">Ритуал.</span>
          </>
        }
        lead={
          about.lead ||
          "Bonnie & Clyde започна с проста идея — че мъжът заслужава място, което е само негово за половин час."
        }
      />

      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-brand border border-hairline">
              <SmartImage
                src={about.imageUrl || undefined}
                alt="Основаването на Bonnie & Clyde"
                className="absolute inset-0"
                label="Историята"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/50 to-transparent" />
            </div>
          </Reveal>
          <Reveal>
            <RichText
              html={about.body}
              className="text-lg leading-relaxed text-grey"
            />
          </Reveal>
        </Container>
      </Section>

      <Stats />

      {about.values.length ? (
        <Section hairline>
          <Container className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="Ценности"
              title={
                <>
                  В какво <span className="accent text-gold-gradient">вярваме.</span>
                </>
              }
            />
            <RevealGroup className="grid gap-6 md:grid-cols-3">
              {about.values.map((v) => (
                <RevealItem
                  key={v.title}
                  className="flex flex-col gap-3 rounded-brand border border-hairline bg-base-elevated p-7 transition-colors hover:border-gold/30"
                >
                  <h3 className="font-display text-xl uppercase tracking-wide text-ink">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-grey">{v.text}</p>
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
