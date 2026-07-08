import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { reviews, aggregateRating } from "@/data/site";

export function ReviewsSection() {
  return (
    <Section id="otzivi" hairline>
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Отзиви"
            title={
              <>
                Думите на <span className="accent text-gold-gradient">клиентите.</span>
              </>
            }
          />
          <div className="flex items-center gap-4 rounded-brand border border-hairline bg-base-elevated px-5 py-4">
            <span className="font-display text-4xl text-ink">{aggregateRating.value}</span>
            <div className="flex flex-col gap-1">
              <Stars value={aggregateRating.value} />
              <span className="text-xs text-grey">{aggregateRating.count}+ отзива</span>
            </div>
          </div>
        </div>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <RevealItem key={i} className="h-full">
              <ReviewCard review={r} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
