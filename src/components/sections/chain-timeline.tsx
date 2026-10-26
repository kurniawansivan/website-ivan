"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";

export interface ChainItem {
  number: string;
  role: string;
  org: string;
  period: string;
  type: string;
  points: string[];
  hash: string;
  parent: string;
}

interface ChainTimelineProps {
  items: ChainItem[];
  labels: { block: string; parent: string };
}

/** Save points along a path. The purple bar fills as you scroll, and each entry cites its parent hash. */
export function ChainTimeline({ items, labels }: ChainTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 65%"] });

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[5px] top-0 w-1 border-l-4 border-dashed border-line-strong md:left-[calc(8.5rem+1rem-2px)]"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
        className="absolute bottom-0 left-[4px] top-0 w-[6px] origin-top bg-accent md:left-[calc(8.5rem+1rem-3px)]"
      />

      <ol ref={listRef}>
        {items.map((item) => (
          <li
            key={`${item.number}-${item.org}`}
            className="relative grid gap-y-3 pb-14 pl-9 last:pb-0 md:grid-cols-[8.5rem_2rem_minmax(0,1fr)] md:gap-y-0 md:pl-0"
          >
            <div className="md:pr-4 md:text-right">
              <p className="hud text-ink">{item.period}</p>
              {item.type ? <p className="hud mt-1">{item.type}</p> : null}
            </div>
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 h-[14px] w-[14px] rotate-45 bg-accent shadow-[0_0_0_3px_var(--ink)] md:static md:mt-1.5 md:justify-self-center"
            />
            <Reveal>
              <h3 className="text-[clamp(1.5rem,2.4vw,1.9rem)] font-bold leading-tight">{item.role}</h3>
              <p className="mt-1 text-lg font-semibold text-accent-text">{item.org}</p>
              {item.points.length > 0 ? (
                <ul className="mt-4 max-w-[58ch] space-y-2.5 text-lg text-muted">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7rem] h-2 w-2 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="hud mt-5 flex flex-wrap gap-x-5 gap-y-1 normal-case tracking-normal">
                <span>
                  {labels.block} #{item.number}
                </span>
                <span className="font-mono font-normal">0x{item.hash}</span>
                <span>
                  {labels.parent} <span className="font-mono font-normal">0x{item.parent}</span>
                </span>
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
