import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GuestCard } from "@/components/cards/GuestCard";
import { EventsTimeline } from "@/components/sections/EventsTimeline";
import { FinalCta } from "@/components/sections/FinalCta";
import { Button } from "@/components/ui/Button";
import { guests } from "@/data/site";
import { SITE } from "@/config/site";
import { InstagramIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Събития & гости",
  description:
    "Гостуващи тату артисти и барбери, отворени дни и събития в Bonnie & Clyde, Русе. Резиденции с ограничени места — запиши се навреме.",
  alternates: { canonical: "/sabitiya" },
  openGraph: {
    url: "/sabitiya",
    title: "Събития & гости · Bonnie & Clyde",
    description: "Тату резиденции, гост-барбери и събития в Русе.",
  },
};

export default function SabitiyaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Събития & гости"
        title={
          <>
            Ново мастило, <span className="accent text-gold-gradient">нови ръце.</span>
          </>
        }
        lead="Каним гостуващи тату артисти и барбери за ограничени резиденции, правим отворени дни и събития. Местата се пълнят бързо — следи датите."
      >
        <Button href={SITE.instagram.shop.url} external variant="outline" size="lg">
          <InstagramIcon className="h-4 w-4" />
          Следи в Instagram
        </Button>
      </PageHeader>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeader
            eyebrow="Резиденции"
            title={
              <>
                Гост <span className="accent text-gold-gradient">артисти.</span>
              </>
            }
            lead="Всеки гост е с обявени дати и ограничени часове. Запитай през Instagram или на място."
          />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guests.map((g) => (
              <RevealItem key={g.slug}>
                <GuestCard guest={g} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section hairline>
        <Container className="flex flex-col gap-12">
          <SectionHeader
            eyebrow="Календар"
            title={
              <>
                Какво <span className="accent text-gold-gradient">предстои.</span>
              </>
            }
          />
          <Reveal>
            <EventsTimeline />
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
