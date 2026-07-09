import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AcademyBlock } from "@/components/sections/AcademyBlock";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { RichText } from "@/components/ui/RichText";
import { getAcademy } from "@/lib/content";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { Button } from "@/components/ui/Button";
import { formatEventDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Академия",
  description:
    "Академия Bonnie & Clyde в Русе — практическо обучение за бръснари върху реални клиенти, под око на ментор. Запиши безплатна консултация.",
  alternates: { canonical: "/akademiya" },
  openGraph: {
    url: "/akademiya",
    title: "Академия · Bonnie & Clyde",
    description: "Стани бръснар по занаята. Практика върху реални клиенти, малки групи.",
  },
};

const REASONS = [
  { t: "Реален стол", d: "Работиш върху истински клиенти от първите седмици, не върху манекен." },
  { t: "Ментор до теб", d: "Активни бръснари те гледат в ръцете и коригират в движение." },
  { t: "Малки групи", d: "Внимание за всеки. Тръгваш, когато линията ти спре да трепери." },
  { t: "След дипломата", d: "Помагаме с портфолио, Fresha и първите ти редовни клиенти." },
];

export default async function AkademiyaPage() {
  const academy = await getAcademy();

  return (
    <>
      <PageHeader
        eyebrow={academy.eyebrow || "Академия Bonnie & Clyde"}
        title={
          <>
            Стани бръснар. <span className="accent text-gold-gradient">По занаята.</span>
          </>
        }
        lead="Практическо обучение от активни бръснари. Реален стол, реална обратна връзка, реални резултати."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={academy.ctaUrl || "#"} external variant="gold" size="lg">
            {academy.ctaLabel}
          </Button>
          <Button href="#programa" variant="outline" size="lg">
            Виж програмата
          </Button>
        </div>
        {academy.startDates.length || academy.duration ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {academy.duration ? (
              <span className="rounded-full border border-hairline bg-base-elevated px-4 py-2 text-sm text-ink/90">
                {academy.duration}
              </span>
            ) : null}
            {academy.startDates.map((d, i) => {
              const f = d.date ? formatEventDate(d.date) : null;
              return (
                <span
                  key={i}
                  className="rounded-full border border-gold/30 px-4 py-2 text-sm text-gold-bright"
                >
                  {d.label}
                  {f ? ` · ${f.day} ${f.month}` : ""}
                </span>
              );
            })}
          </div>
        ) : null}
      </PageHeader>

      <Section>
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <RevealGroup className="contents">
            {REASONS.map((r) => (
              <RevealItem
                key={r.t}
                className="flex flex-col gap-2 rounded-brand border border-hairline bg-base-elevated p-6 transition-colors hover:border-gold/30"
              >
                <h3 className="font-display text-lg uppercase tracking-wide text-ink">{r.t}</h3>
                <p className="text-sm leading-relaxed text-grey">{r.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {academy.description ? (
        <Section hairline>
          <Container>
            <Reveal>
              <RichText
                html={academy.description}
                className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-grey"
              />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      <Section id="programa" hairline>
        <Container className="flex flex-col gap-12">
          <SectionHeader
            eyebrow="Програма"
            title={
              <>
                {academy.modules.length || 6} модула,{" "}
                <span className="accent text-gold-gradient">един занаят.</span>
              </>
            }
            lead="От хигиена и стойка до бизнеса зад стола. Всеки модул е практика, не лекция."
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {academy.modules.map((m) => (
              <RevealItem
                key={m.id}
                className="flex flex-col gap-3 rounded-brand border border-hairline bg-base-elevated p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30"
              >
                <span className="font-display text-3xl text-gold-gradient">{m.number}</span>
                <h3 className="font-display text-xl uppercase tracking-wide text-ink">
                  {m.title}
                </h3>
                <RichText html={m.summary} className="text-sm text-grey" />
                {m.points.length ? (
                  <ul className="mt-1 flex flex-col gap-1.5">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-ink/80">
                        <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {academy.images.length ? (
        <Section hairline>
          <Container className="flex flex-col gap-10">
            <SectionHeader
              eyebrow="Галерия"
              title={
                <>
                  От <span className="accent text-gold-gradient">залата.</span>
                </>
              }
            />
            <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {academy.images.map((img, i) => (
                <RevealItem key={i}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-brand border border-hairline">
                    <SmartImage
                      src={img.url}
                      alt={img.alt || "Академия Bonnie & Clyde"}
                      variant={((i % 3) + 1) as 1 | 2 | 3}
                      className="absolute inset-0"
                      label="Академия"
                    />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <AcademyBlock withEmbed showModules={false} />

      <Section>
        <Container className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl text-lg text-grey">
            Не си сигурен дали Академията е за теб? Запази безплатен разговор — ще ти
            разкажем всичко честно.
          </p>
          <FreshaButton size="lg" label="Или запази час като клиент" variant="outline" />
        </Container>
      </Section>
    </>
  );
}
