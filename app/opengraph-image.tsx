import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = profile.seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph card. Uses ImageResponse with the default font stack so it works
 * without shipping a font file — swap in a local TTF if you want the condensed
 * display face here too.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F1E7",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#3B3BDB" }} />
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#6F675F" }}>
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 800, lineHeight: 1, color: "#141110", letterSpacing: -3 }}>
            ARSAL WASEEM
          </div>
          <div style={{ fontSize: 46, lineHeight: 1.1, color: "#3B3BDB", marginTop: 18 }}>
            Semantic SEO Executive — Lahore, PK
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#6F675F" }}>Topical maps · Semantic briefs · Marketplace ops</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#D9F26B",
              color: "#141110",
              borderRadius: 999,
              padding: "14px 30px",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            Portfolio 2026
          </div>
        </div>
      </div>
    ),
    size,
  );
}
