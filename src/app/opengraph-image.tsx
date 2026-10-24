import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Backend Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const muted = "#94a1ba";
const accent = "#46f0b8";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#06080d",
          color: "#e8edf6",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -180,
            width: 780,
            height: 780,
            borderRadius: 780,
            display: "flex",
            background: "radial-gradient(closest-side, rgba(70,240,184,0.30), rgba(70,240,184,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            left: -140,
            width: 720,
            height: 720,
            borderRadius: 720,
            display: "flex",
            background: "radial-gradient(closest-side, rgba(90,180,255,0.16), rgba(90,180,255,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.6" strokeLinejoin="round">
            <path d="M12 2.5 20.5 7.5v9L12 21.5 3.5 16.5v-9L12 2.5Z" />
            <circle cx="12" cy="12" r="2" fill={accent} stroke="none" />
          </svg>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: muted }}>{site.mark}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 116, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
            Ivan Kurniawan
          </div>
          <div
            style={{ display: "flex", fontSize: 116, fontWeight: 700, lineHeight: 1.08, letterSpacing: -4, color: accent }}
          >
            Sentosa
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 36, color: muted }}>
            Backend Engineer · Fullstack · Data
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
          <div style={{ display: "flex" }}>github.com/{site.githubUser}</div>
          <div style={{ display: "flex" }}>
            {site.location.city}, {site.location.country}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
