"use client";

import { useEffect, useRef, useState } from "react";
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
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the drawer is open. (The drawer closes itself when a
  // link is tapped — see the mobile nav below — so no route-change effect.)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Drawer keyboard behaviour: Escape closes (and restores focus to the
  // toggle), Tab is trapped within the open drawer so focus can't slip behind
  // it into the scroll-locked page.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>('a[href], button');
    first?.focus();
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
          ref={toggleRef}
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
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
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
                    onClick={() => setOpen(false)}
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
