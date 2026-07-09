import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesMenu } from "@/components/sections/ServicesMenu";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { FreshaButton } from "@/components/booking/FreshaButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Услуги & цени",
  description:
    "Пълно меню на Bonnie & Clyde в Русе — подстрижки, fade, оформяне на брада, кралско бръснене и комбо пакети с продължителност и цена.",
  alternates: { canonical: "/uslugi" },
  openGraph: {
    url: "/uslugi",
    title: "Услуги & цени · Bonnie & Clyde",
    description:
      "Подстрижки, fade, брада и комбо пакети — ясно меню с продължителност и цена.",
  },
};

export default function UslugiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Услуги & цени"
        title={
          <>
            Всичко зад <span className="accent text-gold-gradient">стола.</span>
          </>
        }
        lead="Ясно меню с продължителност и цена. Избери услуга и запази удобен час онлайн."
      >
        <FreshaButton size="lg" label="Запази час" />
      </PageHeader>
      <ServicesMenu />
      <FaqSection />
      <FinalCta />
    </>
  );
}
