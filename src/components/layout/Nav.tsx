"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { primaryNav } from "@/config/nav";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { FreshaButton } from "@/components/booking/FreshaButton";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change + lock scroll while the drawer is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        scrolled
          ? "border-b border-hairline bg-base/80 py-2 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent py-4",
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Основна навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "text-ink"
                      : "text-grey hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <FreshaButton size="md" label="Запази час" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Затвори менюто" : "Отвори менюто"}
          className="grid h-11 w-11 place-items-center rounded-full border border-hairline-strong text-ink lg:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden"
          >
            <div className="mx-4 mt-2 overflow-hidden rounded-brand border border-hairline bg-base-elevated/95 backdrop-blur-xl">
              <nav aria-label="Мобилна навигация" className="flex flex-col p-2">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3.5 text-lg font-display uppercase tracking-wide transition-colors",
                      isActive(item.href)
                        ? "bg-white/5 text-gold-bright"
                        : "text-ink hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="p-2 pt-3">
                  <FreshaButton size="lg" className="w-full" label="Запази час" />
                </div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
