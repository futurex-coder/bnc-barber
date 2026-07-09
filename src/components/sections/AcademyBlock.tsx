import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import { CalEmbed } from "@/components/booking/CalEmbed";
import { getAcademy } from "@/lib/content";
import { calcom } from "@/config/booking";
import { GraduationIcon, ArrowRightIcon } from "@/components/ui/icons";

/**
 * The Academy funnel — deliberately distinct from the client/Fresha world:
 * near-black, oxblood accents, its own booking system (Cal.com).
 */
export async function AcademyBlock({
  withEmbed = true,
  showModules = true,
}: {
  withEmbed?: boolean;
  /** Hide the module grid when the page already renders its own programme. */
  showModules?: boolean;
}) {
  const academy = await getAcademy();
  const ctaUrl = academy.ctaUrl || calcom.url;

  return (
    <section
      id="akademiya"
      aria-label="Академия"
      className="relative overflow-hidden border-y border-hairline bg-[#070708]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 15% 0%, rgba(124,31,43,.22), transparent 60%), radial-gradient(50% 50% at 100% 100%, rgba(201,162,39,.08), transparent 60%)",
        }}
      />
      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow>{academy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
                Стани бръснар. <span className="accent text-gold-gradient">По занаята.</span>
              </h2>
            </Reveal>
            <Reveal>
              <RichText
                html={academy.lead}
                className="max-w-lg text-lg leading-relaxed text-grey"
              />
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap gap-3">
                {academy.duration ? (
                  <span className="rounded-full border border-hairline bg-white/[0.03] px-4 py-2 text-sm text-ink/90">
                    {academy.duration}
                  </span>
                ) : null}
                {academy.priceNote ? (
                  <span className="rounded-full border border-hairline bg-white/[0.03] px-4 py-2 text-sm text-ink/90">
                    {academy.priceNote}
                  </span>
                ) : null}
              </div>
            </Reveal>

            {showModules && academy.modules.length ? (
              <RevealGroup className="mt-2 grid gap-3 sm:grid-cols-2">
                {academy.modules.map((m) => (
                  <RevealItem
                    key={m.id}
                    className="rounded-brand border border-hairline bg-white/[0.02] p-4 transition-colors hover:border-gold/30"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-gold">{m.number}</span>
                      <h3 className="font-display text-base uppercase tracking-wide text-ink">
                        {m.title}
                      </h3>
                    </div>
                    <RichText html={m.summary} className="mt-1.5 text-sm text-grey" />
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : null}

            {!withEmbed ? (
              <Reveal>
                <Button href={ctaUrl} external variant="gold" size="lg">
                  <GraduationIcon className="h-4 w-4" />
                  {academy.ctaLabel}
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Reveal>
            ) : null}
          </div>

          <Reveal className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm text-grey">
              <GraduationIcon className="h-4 w-4 text-gold" />
              Безплатна консултация — да видим дали си пасваме.
            </div>
            {withEmbed && calcom.embedEnabled ? (
              <CalEmbed />
            ) : (
              <div className="rounded-brand border border-hairline bg-white/[0.02] p-8">
                <p className="text-grey">
                  Резервирай кратък разговор през Cal.com и ще ти разкажем всичко за випуска,
                  цената и датите.
                </p>
                <div className="mt-6">
                  <Button href={ctaUrl} external variant="gold" size="lg">
                    {academy.ctaLabel}
                  </Button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
