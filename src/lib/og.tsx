import { ImageResponse } from "next/og";
import { OG } from "@/config/site";

export const OG_SIZE = { width: OG.width, height: OG.height };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared brand OG image. Dark cinematic card with gold accents.
 * Uses system fonts (no network fetch) so it never fails to render.
 */
export function renderOg({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 120% at 15% 0%, rgba(201,162,39,0.18) 0%, transparent 45%), radial-gradient(100% 100% at 100% 100%, rgba(124,31,43,0.28) 0%, transparent 55%), linear-gradient(160deg, #141417 0%, #0a0a0b 100%)",
          padding: "64px 72px",
          color: "#f4f1ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: "1px solid rgba(244,241,234,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e7c65a",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            B&C
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 1 }}>
              Bonnie &amp; Clyde
            </span>
            <span style={{ fontSize: 14, color: "#9a958c", letterSpacing: 4 }}>
              БАРБЕРШОП · АКАДЕМИЯ
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              fontSize: 22,
              textTransform: "uppercase",
              letterSpacing: 6,
              color: "#c9a227",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: title.length > 26 ? 76 : 104,
              fontWeight: 700,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span style={{ fontSize: 30, color: "#9a958c", marginTop: 8 }}>{subtitle}</span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#9a958c",
          }}
        >
          <span>Русе, България</span>
          <span style={{ color: "#e7c65a" }}>4.9 / 5.0 · Google &amp; Fresha</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
