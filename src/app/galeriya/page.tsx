import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { galleryItems } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Галерия",
  description:
    "Работи на Bonnie & Clyde — fade-ове, бради и ежедневието в салона в Русе.",
  alternates: { canonical: "/galeriya" },
  openGraph: {
    url: "/galeriya",
    title: "Галерия · Bonnie & Clyde",
    description: "Fade-ове, бради и ежедневието в салона.",
  },
};

export default function GaleriyaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Галерия"
        title={
          <>
            Резултатите <span className="accent text-gold-gradient">говорят.</span>
          </>
        }
        lead="Селекция от работата ни. Истинските снимки идват скоро — засега усети стила."
      />

      <Section>
        <Container>
          <RevealGroup className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {galleryItems.map((g, i) => (
              <RevealItem key={g.id} className="break-inside-avoid">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-brand border border-hairline",
                    g.tall ? "aspect-[3/4]" : "aspect-square",
                  )}
                >
                  <SmartImage
                    alt={g.alt}
                    variant={((i % 3) + 1) as 1 | 2 | 3}
                    className="absolute inset-0"
                    label="B&C"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <InstagramGrid />
      <FinalCta />
    </>
  );
}
