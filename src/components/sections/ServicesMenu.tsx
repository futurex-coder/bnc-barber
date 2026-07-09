import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceRow } from "@/components/cards/ServiceRow";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { getServices } from "@/lib/content";

export async function ServicesMenu() {
  const services = await getServices();

  // Group by category, preserving the admin-defined order (first appearance).
  const cats: string[] = [];
  for (const s of services) {
    const c = s.category || "Услуги";
    if (!cats.includes(c)) cats.push(c);
  }
  const grouped = cats
    .map((cat) => ({
      cat,
      items: services.filter((s) => (s.category || "Услуги") === cat),
    }))
    .filter((g) => g.items.length);

  return (
    <Section id="uslugi" hairline>
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Услуги & цени"
            title={
              <>
                Ясно меню. <span className="accent text-gold-gradient">Без изненади.</span>
              </>
            }
            lead="Цените са ориентировъчни — финалната зависи от дължина и стил. Плащане на място."
          />
          <FreshaButton size="lg" label="Запази час" className="hidden sm:inline-flex" />
        </div>

        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-2">
          {grouped.map((g) => (
            <Reveal key={g.cat} className="flex flex-col">
              <h3 className="mb-1 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
                {g.cat}
                <span className="h-px flex-1 bg-hairline" aria-hidden />
              </h3>
              <div className="flex flex-col divide-y divide-hairline">
                {g.items.map((s) => (
                  <ServiceRow key={s.id} service={s} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <FreshaButton size="lg" label="Запази час" className="w-full sm:hidden" />
      </Container>
    </Section>
  );
}
