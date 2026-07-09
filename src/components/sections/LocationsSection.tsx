import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LocationCard } from "@/components/cards/LocationCard";
import { getLocations } from "@/lib/content";

export async function LocationsSection() {
  const locations = await getLocations();
  if (!locations.length) return null;

  return (
    <Section id="lokacii" hairline>
      <Container className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Локации"
          title={
            <>
              Два адреса в <span className="accent text-gold-gradient">Русе.</span>
            </>
          }
          lead="Флагманът в Здравец Изток е отворен. Вторият салон в центъра идва скоро."
        />
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {locations.map((loc) => (
            <RevealItem key={loc.slug}>
              <LocationCard loc={loc} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
