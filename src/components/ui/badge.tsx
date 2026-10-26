"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "purple" | "blue" | "pink" | "white";

const tones: Record<BadgeTone, string> = {
  purple: "text-accent-text [--bc:var(--accent-text)]",
  blue: "text-sky [--bc:var(--sky)]",
  pink: "text-amber [--bc:var(--amber)]",
  white: "text-ink [--bc:var(--ink)]",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  /** Seconds before the badge pops in once it scrolls into view. */
  delay?: number;
  className?: string;
}

/** A pixel tag that pops in when it scrolls into view. The status is always in the text, never colour alone. */
export function Badge({ children, tone = "purple", delay = 0, className }: BadgeProps) {
  return (
    <motion.span
      className={cn(
        "reveal inline-block select-none bg-surface px-2 py-1 font-heading text-xs font-bold uppercase leading-none tracking-wide whitespace-nowrap shadow-[0_-2px_0_0_var(--bc),0_2px_0_0_var(--bc),-2px_0_0_0_var(--bc),2px_0_0_0_var(--bc)]",
        tones[tone],
        className,
      )}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: [0, 1.25, 1], opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.32, times: [0, 0.7, 1], ease: "linear", delay }}
    >
      {children}
    </motion.span>
  );
}
