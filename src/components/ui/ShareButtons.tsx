"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/ui/icons";
import { SITE_URL, SITE } from "@/config/site";

/** Native share + copy-link fallback. */
export function ShareButtons({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const data = {
      title: `${SITE.name} — ${SITE.tagline}`,
      text: SITE.shortDescription,
      url: SITE_URL,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    copy();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const encoded = encodeURIComponent(SITE_URL);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={share}
          className="group/btn inline-flex h-11 items-center gap-2 rounded-full border border-hairline-strong px-5 text-sm text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold-bright"
        >
          <ShareIcon className="h-4 w-4" />
          Сподели
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(SITE.shortDescription + " " + SITE_URL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-5 text-sm text-grey transition-colors hover:border-gold/40 hover:text-ink"
        >
          WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-5 text-sm text-grey transition-colors hover:border-gold/40 hover:text-ink"
        >
          Facebook
        </a>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-5 text-sm text-grey transition-colors hover:border-gold/40 hover:text-ink"
        >
          {copied ? "Копирано ✓" : "Копирай линк"}
        </button>
      </div>
    </div>
  );
}
