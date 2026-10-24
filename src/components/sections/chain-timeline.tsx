"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { HexBadge } from "@/components/ui/hex-badge";
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

/** Vertical chain of blocks. The rail fills with the accent gradient as the list scrolls past. */
export function ChainTimeline({ items, labels }: ChainTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 65%"] });

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-line-strong" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
        className="absolute bottom-0 left-5 top-0 w-px origin-top -translate-x-1/2 bg-linear-to-b from-accent to-sky"
      />

      <ol ref={listRef} className="space-y-6">
        {items.map((item) => (
          <li key={`${item.number}-${item.org}`} className="relative pl-14">
            <HexBadge className="absolute left-0 top-1">{item.number}</HexBadge>
            <Reveal>
              <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="font-mono text-xs text-muted">{item.period}</p>
                </header>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-accent-text">
                  <span className="font-medium">{item.org}</span>
                  {item.type ? (
                    <span className="rounded-full border border-line-strong px-2 py-0.5 text-[11px] text-muted">
                      {item.type}
                    </span>
                  ) : null}
                </p>

                {item.points.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-text" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <footer className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 font-mono text-[11px] text-muted">
                  <span>
                    {labels.block} #{item.number}
                  </span>
                  <span>0x{item.hash}</span>
                  <span>
                    {labels.parent} 0x{item.parent}
                  </span>
                </footer>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
