import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

const HIGHLIGHTS = [
  { k: "Ритуал, не конвейер", v: "Време само за теб — консултация, кафе, музика." },
  { k: "Прецизност", v: "Чисти линии и преходи, премерени до милиметър." },
  { k: "Продукти", v: "Матови пасти, помади и олио за брада на място." },
];

/** "Магазинът" — the shop story, split layout. */
export function ShopSplit() {
  return (
    <Section id="magazinat" hairline>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-brand border border-hairline">
              <SmartImage alt="Интериор на Bonnie & Clyde" label="Салонът" priority={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-base/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-44 rotate-2 rounded-brand border border-hairline bg-base-elevated p-4 shadow-xl sm:block">
              <p className="font-display text-3xl text-gold-bright">B&amp;C</p>
              <p className="text-xs text-grey">Est. Русе · собствен стил</p>
            </div>
          </Reveal>

          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <Reveal>
              <Eyebrow>Магазинът</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
                Място, което усещаш <span className="accent text-gold-gradient">още на прага.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="max-w-lg text-lg leading-relaxed text-grey">
                Топла светлина, добра музика и стол, който е само твой. Bonnie &amp; Clyde
                не е поточна линия — тук подстрижката е ритуал със свое темпо.
              </p>
            </Reveal>

            <Reveal>
              <dl className="mt-2 flex flex-col divide-y divide-hairline border-y border-hairline">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.k} className="grid grid-cols-[auto_1fr] gap-4 py-4">
                    <dt className="font-display text-sm uppercase tracking-wide text-gold">
                      {h.k}
                    </dt>
                    <dd className="text-sm text-grey">{h.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <Button href="/za-nas" variant="outline" size="lg">
                Историята ни
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
