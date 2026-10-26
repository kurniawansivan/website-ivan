import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Backend Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const night = "#110e32";
const blue = "#1f2a8c";
const white = "#f5f6ff";
const lavender = "#b58cff";
const muted = "#bcc3ff";

/** A title screen: deep indigo sky, a blue window, white title with a purple extrusion. */
export default function OpenGraphImage() {
  const stars = [
    [90, 60],
    [260, 140],
    [980, 80],
    [1100, 210],
    [60, 520],
    [1120, 540],
    [620, 40],
    [820, 590],
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: night, color: white }}>
        {stars.map(([x, y]) => (
          <div key={`${x}-${y}`} style={{ position: "absolute", left: x, top: y, width: 6, height: 6, background: white, display: "flex" }} />
        ))}

        <div
          style={{
            position: "absolute",
            left: 56,
            top: 56,
            right: 56,
            bottom: 56,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: blue,
            border: `8px solid ${white}`,
            padding: "36px 52px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, color: muted }}>
            <div style={{ display: "flex" }}>STAGE 01/06 — OPENING</div>
            <div style={{ display: "flex", color: white }}>{site.mark}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 118, fontWeight: 700, lineHeight: 1, letterSpacing: -4, textShadow: `8px 8px 0 ${lavender}` }}>
              Ivan Kurniawan
            </div>
            <div style={{ display: "flex", fontSize: 118, fontWeight: 700, lineHeight: 1.05, letterSpacing: -4, textShadow: `8px 8px 0 ${lavender}` }}>
              Sentosa
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: muted }}>Backend Engineer · Fullstack · Data</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: muted }}>
            <div style={{ display: "flex" }}>github.com/{site.githubUser}</div>
            <div style={{ display: "flex" }}>
              {site.location.city}, {site.location.country}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
