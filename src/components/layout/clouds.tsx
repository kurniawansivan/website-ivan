import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** A pixel cloud on a 24 x 12 grid. */
const SHAPE = [
  [6, 0, 8, 2],
  [4, 2, 14, 2],
  [2, 4, 20, 2],
  [0, 6, 24, 4],
  [2, 10, 20, 2],
] as const;

const SETS = {
  hero: [
    { top: "6%", scale: 7, duration: 150, delay: -40 },
    { top: "34%", scale: 5, duration: 190, delay: -120 },
  ],
  footer: [
    { top: "18%", scale: 6, duration: 170, delay: -70 },
    { top: "40%", scale: 4, duration: 210, delay: -150 },
  ],
} as const;

/**
 * Slow clouds for the empty areas only: the hero and the sky above the footer. They sit behind the
 * content and never cross the reading columns of the middle sections.
 */
export function Clouds({ variant, className }: { variant: keyof typeof SETS; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 -z-10 overflow-hidden", className)}>
      {SETS[variant].map((cloud) => (
        <svg
          key={cloud.top}
          viewBox="0 0 24 12"
          shapeRendering="crispEdges"
          className="cloud absolute left-0"
          style={
            {
              top: cloud.top,
              width: cloud.scale * 24,
              height: cloud.scale * 12,
              "--d": `${cloud.duration}s`,
              "--delay": `${cloud.delay}s`,
            } as CSSProperties
          }
        >
          {SHAPE.map(([x, y, w, h]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill="var(--cloud)" />
          ))}
        </svg>
      ))}
    </div>
  );
}
