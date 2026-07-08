import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { primaryNav } from "@/config/nav";
import { SITE } from "@/config/site";
import { locations } from "@/data/site";
import { InstagramIcon, PhoneIcon, MapPinIcon } from "@/components/ui/icons";
import { FreshaButton } from "@/components/booking/FreshaButton";

export function Footer() {
  // Server component → evaluated at build; refreshes on each deploy.
  const year = new Date().getFullYear();
  const flagship = locations[0];

  return (
    <footer className="relative border-t border-hairline bg-base">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-grey">
              Барбершоп и академия в Русе. Прецизни подстрижки, оформяне на брада
              и обучение по занаята.
            </p>
            <FreshaButton size="md" variant="outline" label="Запази час" />
          </div>

          <nav aria-label="Навигация във футъра" className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-grey">Сайт</p>
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink/80 transition-colors hover:text-gold-bright"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-grey">Контакт</p>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-gold-bright"
            >
              <PhoneIcon className="h-4 w-4 text-gold" /> {SITE.phone}
            </a>
            <span className="inline-flex items-start gap-2 text-sm text-ink/80">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {flagship.addressLine}, {flagship.district}, {flagship.city}
              </span>
            </span>
            <a
              href={SITE.instagram.shop.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-gold-bright"
            >
              <InstagramIcon className="h-4 w-4 text-gold" /> @{SITE.instagram.shop.handle}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-grey">Локации</p>
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/lokacii/${loc.slug}`}
                className="text-sm text-ink/80 transition-colors hover:text-gold-bright"
              >
                {loc.name}
                {loc.status === "coming-soon" ? (
                  <span className="ml-2 text-xs text-gold">скоро</span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 text-xs text-grey sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. Всички права запазени.
          </p>
          <p className="text-grey">
            Изработка с грижа в Русе · Дизайн &amp; код на място
          </p>
        </div>
      </Container>
    </footer>
  );
}
