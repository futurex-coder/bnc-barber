import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { SmartImage } from "@/components/ui/SmartImage";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { formatDateRange } from "@/lib/utils";
import { featuredGuest, getSiteSettings } from "@/lib/content";

/** The "fancy part": a spotlight on the featured guest (tattoo artist). */
export async function GuestSpotlight() {
  const [guest, settings] = await Promise.all([featuredGuest(), getSiteSettings()]);
  if (!guest) return null;

  return (
    <section
      id="gosti"
      aria-label="Гост артисти"
      className="relative overflow-hidden border-y border-hairline"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(60% 80% at 12% 20%, rgba(124,31,43,.2), transparent 60%), radial-gradient(50% 60% at 100% 100%, rgba(201,162,39,.1), transparent 60%)",
        }}
      />
      <Container className="relative py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Portrait with glow border + rotating badge */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="glow-border relative aspect-[4/5] overflow-hidden rounded-brand">
              <SmartImage
                src={guest.imageUrl || undefined}
                alt={`${guest.name} — ${guest.discipline}`}
                variant={3}
                className="absolute inset-0 grayscale transition-all duration-700 hover:grayscale-0"
                label={guest.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-gold/40 bg-base/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-bright backdrop-blur">
                {guest.discipline}
              </span>
            </div>
            <RotatingBadge
              className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-base/80 backdrop-blur sm:-right-8 sm:h-32 sm:w-32"
              text="GUEST · РЕЗИДЕНЦИЯ · "
              center={
                <span className="font-display text-2xl text-gold-bright">B&amp;C</span>
              }
            />
          </Reveal>

          {/* Copy */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <Reveal>
              <Eyebrow>Гост артисти · резиденция</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
                Тату гости на <span className="accent text-gold-gradient">стола.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="max-w-lg text-lg leading-relaxed text-grey">
                Каним гостуващи тату артисти и барбери за ограничени резиденции. Ново мастило,
                нови ръце, същото място. Следващият гост:
              </p>
            </Reveal>

            <Reveal className="flex flex-wrap items-center gap-4 rounded-brand border border-hairline bg-base-elevated/60 p-5 backdrop-blur-sm">
              <div className="flex flex-col">
                <span className="font-display text-2xl text-ink">{guest.name}</span>
                <span className="text-sm text-gold">{guest.style}</span>
              </div>
              <span className="ml-auto rounded-full border border-gold/30 px-4 py-2 text-sm font-medium text-gold-bright">
                {formatDateRange(guest.from, guest.to)}
              </span>
            </Reveal>

            <Reveal className="flex flex-wrap items-center gap-3">
              <Button href={`/gosti/${guest.slug}`} variant="gold" size="lg">
                Виж резиденцията
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button href="/sabitiya" variant="outline" size="lg">
                Всички гости &amp; събития
                <ArrowUpRightIcon className="h-4 w-4" />
              </Button>
              {settings.instagramShop.url ? (
                <a
                  href={settings.instagramShop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-14 w-14 place-items-center rounded-full border border-hairline text-grey transition-colors hover:border-gold hover:text-gold-bright"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              ) : null}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
