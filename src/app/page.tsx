import { Hero } from "@/components/sections/Hero";
import { EventsStrip } from "@/components/sections/EventsStrip";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { Stats } from "@/components/sections/Stats";
import { ShopSplit } from "@/components/sections/ShopSplit";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { GuestSpotlight } from "@/components/sections/GuestSpotlight";
import { ServicesMenu } from "@/components/sections/ServicesMenu";
import { AcademyBlock } from "@/components/sections/AcademyBlock";
import { InstagramGrid } from "@/components/sections/InstagramGrid";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventsStrip />
      <ServicesMarquee />
      <Stats />
      <ShopSplit />
      <LocationsSection />
      <TeamSection />
      <GuestSpotlight />
      <ServicesMenu />
      <AcademyBlock />
      <InstagramGrid />
      <ReviewsSection />
      <FinalCta />
    </>
  );
}
