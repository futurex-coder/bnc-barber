"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Scroll-triggered reveal. Wraps children in a motion element that animates
 * from `fadeUp` when it enters the viewport. Respects reduced-motion.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
  amount = 0.3,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "span" | "section" | "article";
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger group: reveals children in sequence. Pair with <RevealItem/>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  as = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "section";
  id?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
