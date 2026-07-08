"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { calcom } from "@/config/booking";
import { Button } from "@/components/ui/Button";

/**
 * The academy funnel → Cal.com. Renders the real inline embed once the Cal
 * API is ready; always shows a plain link fallback so the CTA works even if
 * the embed fails to load or JS is disabled.
 */
export function CalEmbed() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const api = await getCalApi();
        api("ui", {
          theme: "dark",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            dark: { "cal-brand": "#c9a227" },
            light: { "cal-brand": "#c9a227" },
          },
        });
        if (active) setReady(true);
      } catch {
        if (active) setFailed(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full">
      <noscript>
        <a
          href={calcom.url}
          className="text-gold-bright underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Запази консултация през Cal.com
        </a>
      </noscript>

      {!failed ? (
        <div
          className="overflow-hidden rounded-brand border border-hairline bg-base-elevated"
          style={{ minHeight: 560 }}
        >
          <Cal
            calLink={calcom.link}
            style={{ width: "100%", height: "100%", minHeight: 560, overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
          {!ready ? (
            <p className="p-4 text-center text-sm text-grey">Зареждане на календара…</p>
          ) : null}
        </div>
      ) : (
        <div className="rounded-brand border border-hairline bg-base-elevated p-8 text-center">
          <p className="mb-4 text-grey">
            Календарът не се зареди. Използвай директния линк:
          </p>
          <Button href={calcom.url} external variant="gold" size="lg">
            Запази консултация
          </Button>
        </div>
      )}
    </div>
  );
}
