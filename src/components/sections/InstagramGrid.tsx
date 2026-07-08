import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { instagramPosts } from "@/data/site";
import { SITE } from "@/config/site";
import { InstagramIcon } from "@/components/ui/icons";

/**
 * Instagram grid. Renders the static, on-brand fallback grid. To wire a live
 * feed, drop an embed (EmbedSocial/Elfsight) or IG API images in place of the
 * SmartImage placeholders — the layout is feed-ready.
 */
export function InstagramGrid() {
  return (
    <Section id="instagram" hairline>
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Instagram"
            title={
              <>
                Последното от <span className="accent text-gold-gradient">стола.</span>
              </>
            }
            lead="Ежедневни резултати, кадри от салона и випуските на Академията."
          />
          <Button href={SITE.instagram.shop.url} external variant="outline">
            <InstagramIcon className="h-4 w-4" />@{SITE.instagram.shop.handle}
          </Button>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {instagramPosts.map((p, i) => (
            <RevealItem key={p.id}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.alt}
                className="group relative block aspect-square overflow-hidden rounded-xl border border-hairline"
              >
                <SmartImage
                  alt={p.alt}
                  variant={i % 2 === 0 ? 1 : 2}
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  label="B&C"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-base/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <InstagramIcon className="h-6 w-6 text-gold-bright" />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
