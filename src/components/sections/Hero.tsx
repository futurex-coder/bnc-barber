"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotionSafe";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { Stars } from "@/components/ui/Stars";
import { ArrowRightIcon, GraduationIcon, ChevronDownIcon } from "@/components/ui/icons";
import { aggregateRating } from "@/data/site";

/** Headline built from lines that mask-reveal upward on load. */
const LINES: { text: string; accent?: string }[] = [
  { text: "Твоят стол." },
  { text: "Твоят ", accent: "ритуал." },
  { text: "Твоят занаят." },
];

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
      aria-label="Начало"
    >
      {/* Cinematic backdrop (gradient fallback in place of hero video) */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="img-fallback absolute inset-0" />
        <div className="grain absolute inset-0" aria-hidden />
        <div className="animate-drift absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,.12),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent" />
      </motion.div>

      <Container className="relative">
        <motion.div style={{ opacity }} className="max-w-4xl">
          <p
            className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-grey backdrop-blur"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Барбершоп &amp; Академия · Русе
          </p>

          <h1 className="font-display text-[15vw] leading-[0.92] text-ink sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            {LINES.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                {/* CSS-driven mask reveal: visible in SSR, animates on first
                    paint so it never gates LCP behind hydration. */}
                <span
                  className="hero-line"
                  style={{ animationDelay: `${0.15 + i * 0.12}s` }}
                >
                  {l.text}
                  {l.accent ? (
                    <span className="accent text-gold-gradient">{l.accent}</span>
                  ) : null}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-fade mt-7 max-w-xl text-lg leading-relaxed text-grey"
            style={{ animationDelay: "0.4s" }}
          >
            Прецизни подстрижки и оформяне на брада — и школа, която прави бръснари.
            Избери за какво идваш.
          </p>

          <div
            className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.52s" }}
          >
            <FreshaButton size="lg" label="Запази час" />
            <Button href="/akademiya" variant="outline" size="lg">
              <GraduationIcon className="h-4 w-4" />
              Влез в Академията
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </div>

          <div
            className="hero-fade mt-10 flex items-center gap-3 text-sm text-grey"
            style={{ animationDelay: "0.64s" }}
          >
            <Stars value={aggregateRating.value} size="md" />
            <span className="font-medium text-ink">{aggregateRating.value}</span>
            <span aria-hidden className="text-grey/40">·</span>
            <span>{aggregateRating.count}+ отзива в Google &amp; Fresha</span>
          </div>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      >
        <span className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-grey">
          Надолу
          <motion.span
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
