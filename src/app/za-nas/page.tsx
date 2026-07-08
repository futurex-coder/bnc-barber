import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Stats } from "@/components/sections/Stats";
import { FinalCta } from "@/components/sections/FinalCta";

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

const VALUES = [
  {
    t: "Занаят преди всичко",
    d: "Всяка линия има причина. Учим се постоянно и не спираме до „става“.",
  },
  {
    t: "Отношение",
    d: "Слушаме преди да хванем машинката. Ти и това, което искаш — на първо място.",
  },
  {
    t: "Общност",
    d: "Академията ражда следващото поколение бръснари в Русе. Даваме назад.",
  },
];

export default function ZaNasPage() {
  return (
    <>
      <PageHeader
        eyebrow="За нас"
        title={
          <>
            Не салон. <span className="accent text-gold-gradient">Ритуал.</span>
          </>
        }
        lead="Bonnie & Clyde започна с проста идея — че мъжът заслужава място, което е само негово за половин час."
      />

      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-brand border border-hairline">
              <SmartImage
                alt="Основаването на Bonnie & Clyde"
                className="absolute inset-0"
                label="Историята"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/50 to-transparent" />
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-5 text-lg leading-relaxed text-grey">
            <p>
              Всичко тръгна в Здравец Изток — един стол, една машинка и убеждението, че
              подстрижката не е услуга на конвейер, а ритуал. Алекс отвори вратите с идеята
              да прави място, в което се влиза за коса, а се излиза със самочувствие.
            </p>
            <p>
              Днес Bonnie &amp; Clyde е екип, който държи на детайла, и{" "}
              <span className="text-ink">академия</span>, която прави нови бръснари по
              занаята — върху реални клиенти, не по видеа.
            </p>
            <p>
              Разрастваме се, но принципът остава същият: топла светлина, добра музика и
              стол, който е само твой.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Stats />

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
            {VALUES.map((v) => (
              <RevealItem
                key={v.t}
                className="flex flex-col gap-3 rounded-brand border border-hairline bg-base-elevated p-7 transition-colors hover:border-gold/30"
              >
                <h3 className="font-display text-xl uppercase tracking-wide text-ink">
                  {v.t}
                </h3>
                <p className="text-sm leading-relaxed text-grey">{v.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
