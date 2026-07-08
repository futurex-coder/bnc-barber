import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LocationCard } from "@/components/cards/LocationCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { locations } from "@/data/site";

export const metadata: Metadata = {
  title: "Локации",
  description:
    "Салоните на Bonnie & Clyde в Русе — флагманът в Здравец Изток (отворен) и вторият адрес в Център (очаквай скоро).",
  alternates: { canonical: "/lokacii" },
  openGraph: {
    title: "Локации · Bonnie & Clyde",
    description: "Два адреса в Русе — Здравец Изток и Център.",
  },
};

export default function LokaciiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Локации"
        title={
          <>
            Намери ни в <span className="accent text-gold-gradient">Русе.</span>
          </>
        }
        lead="Флагманът в Здравец Изток е отворен всеки ден. Вторият салон в центъра идва скоро."
      />
      <Section>
        <Container>
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {locations.map((loc) => (
              <RevealItem key={loc.slug}>
                <LocationCard loc={loc} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
