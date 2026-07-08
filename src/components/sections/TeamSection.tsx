import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BarberCard } from "@/components/cards/BarberCard";
import { barbers } from "@/data/site";
import { ArrowRightIcon } from "@/components/ui/icons";

export function TeamSection() {
  return (
    <Section id="ekip" hairline>
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Екипът"
            title={
              <>
                Ръцете зад <span className="accent text-gold-gradient">стола.</span>
              </>
            }
            lead="Малък екип с голямо внимание към детайла. Избери своя бръснар."
          />
          <Button href="/ekip" variant="ghost" className="hidden sm:inline-flex">
            Целият екип
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </div>

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((b) => (
            <RevealItem key={b.slug}>
              <BarberCard barber={b} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
