"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const IDS = ["top", "work", "services", "about", "experience", "contact"] as const;
type StageId = (typeof IDS)[number];

/** A tiny pixel explorer, drawn on a 12 x 14 grid. The two frames swap the legs to look like walking. */
function Sprite({ frame }: { frame: number }) {
  return (
    <svg
      viewBox="0 0 12 14"
      width={36}
      height={42}
      shapeRendering="crispEdges"
      className="[filter:drop-shadow(2px_0_0_var(--ink))_drop-shadow(-2px_0_0_var(--ink))_drop-shadow(0_2px_0_var(--ink))_drop-shadow(0_-2px_0_var(--ink))]"
    >
      <rect x="3" y="0" width="6" height="2" fill="var(--accent)" />
      <rect x="2" y="2" width="8" height="1" fill="var(--accent)" />
      <rect x="3" y="3" width="6" height="4" fill="var(--surface)" />
      <rect x="4" y="4" width="1" height="1" fill="var(--ink)" />
      <rect x="7" y="4" width="1" height="1" fill="var(--ink)" />
      <rect x="2" y="7" width="8" height="4" fill="var(--sky)" />
      <rect x="1" y="7" width="1" height="3" fill="var(--surface)" />
      <rect x="10" y="7" width="1" height="3" fill="var(--surface)" />
      <rect x="3" y="11" width="2" height={frame === 0 ? 3 : 2} fill="var(--ink)" />
      <rect x="7" y="11" width="2" height={frame === 0 ? 2 : 3} fill="var(--ink)" />
    </svg>
  );
}

/**
 * A pixel explorer pinned to the left edge on wide screens. It walks down a path as you scroll,
 * from one stage marker to the next. Decorative, so hidden from assistive tech.
 */
export function StageRail() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [active, setActive] = useState(0);
  const [frame, setFrame] = useState(0);
  const [track, setTrack] = useState(0);
  const tops = useRef<number[]>([]);

  const position = useMotionValue(0);
  const smooth = useSpring(position, { stiffness: 140, damping: 26, mass: 0.5 });
  const y = useTransform(reduceMotion ? position : smooth, [0, 1], [0, track]);

  const measure = useCallback(() => {
    tops.current = IDS.map((id) => {
      const element = document.getElementById(id);
      return element ? element.getBoundingClientRect().top + window.scrollY : 0;
    });
    setTrack(Math.max(180, Math.round(window.innerHeight * 0.62)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    // Fonts and images change section heights after load, so measure again whenever the page resizes.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [measure]);

  useMotionValueEvent(scrollY, "change", (value) => {
    const stops = tops.current;
    if (stops.length === 0) return;
    const probe = value + window.innerHeight * 0.45;
    let index = 0;
    while (index < stops.length - 1 && probe >= stops[index + 1]) index += 1;
    const span = (stops[index + 1] ?? stops[index] + 1) - stops[index];
    const fraction = index < stops.length - 1 ? Math.min(1, Math.max(0, (probe - stops[index]) / span)) : 1;
    position.set((index + fraction) / (stops.length - 1));
    setActive(index);
    setFrame(Math.floor(value / 48) % 2);
  });

  if (track === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-3 z-30 hidden w-12 xl:block"
      style={{ top: `calc(50vh - ${track / 2}px)`, height: track }}
    >
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 border-l-4 border-dashed border-line-strong" />
      {IDS.map((id: StageId, index) => (
        <span
          key={id}
          className={cn(
            "absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_3px_var(--ink)] transition-colors duration-200",
            index <= active ? "bg-accent" : "bg-surface",
          )}
          style={{ top: `${(index / (IDS.length - 1)) * 100}%` }}
        />
      ))}
      <motion.div className="absolute left-1/2 top-0 -ml-[18px] -mt-[42px]" style={{ y }}>
        <Sprite frame={frame} />
      </motion.div>
    </div>
  );
}
