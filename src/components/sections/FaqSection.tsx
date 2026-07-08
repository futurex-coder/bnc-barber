"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotionSafe";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { faqs } from "@/data/site";
import { ChevronDownIcon } from "@/components/ui/icons";
import { JsonLdScript } from "@/components/seo/JsonLd";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = usePrefersReducedMotion();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq" hairline>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="Въпроси"
          title={
            <>
              Често <span className="accent text-gold-gradient">питано.</span>
            </>
          }
          lead="Не намираш отговор? Пиши ни или се обади — с удоволствие ще помогнем."
        />

        <div className="flex flex-col divide-y divide-hairline border-y border-hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-lg uppercase tracking-wide text-ink">
                      {f.q}
                    </span>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-[15px] leading-relaxed text-grey">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
      <JsonLdScript data={faqSchema} />
    </Section>
  );
}
