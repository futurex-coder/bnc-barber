import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { GraduationIcon } from "@/components/ui/icons";

export function FinalCta() {
  return (
    <section
      aria-label="Запази час или влез в Академията"
      className="relative overflow-hidden"
    >
      <div className="img-fallback absolute inset-0 -z-10" />
      <div className="grain absolute inset-0 -z-10" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base via-transparent to-base" />

      <Container className="py-24 sm:py-32">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-grey backdrop-blur">
            Готов ли си?
          </span>
          <h2 className="font-display text-5xl text-ink sm:text-6xl md:text-7xl">
            Седни на <span className="accent text-gold-gradient">стола.</span>
          </h2>
          <p className="max-w-lg text-lg text-grey">
            Запази час за подстрижка или влез в Академията и стани бръснар.
            Изборът е твой.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <FreshaButton size="lg" label="Запази час" />
            <Button href="/akademiya" variant="outline" size="lg">
              <GraduationIcon className="h-4 w-4" />
              Влез в Академията
            </Button>
          </div>

          <div className="mt-4 flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-grey">
              Разкажи на приятел
            </span>
            <ShareButtons />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
