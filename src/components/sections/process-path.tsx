"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  body: string;
}

/**
 * The path a project takes. The purple rail fills and each step lights up in order as the list
 * scrolls past; with reduced motion every step is simply lit.
 */
export function ProcessPath({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const [lit, setLit] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setLit(Math.min(steps.length, Math.max(0, Math.ceil(progress * steps.length - 0.15))));
  });

  const reached = (index: number) => reduceMotion || index < lit || (index === 0 && lit === 0 && false);

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-1 border-l-4 border-dashed border-line-strong" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
        className="absolute bottom-3 left-[10px] top-3 w-[6px] origin-top bg-accent"
      />
      <ol ref={listRef} className="space-y-10">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pl-14">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 grid h-7 w-7 place-items-center text-xs font-bold shadow-[0_-3px_0_0_var(--ink),0_3px_0_0_var(--ink),-3px_0_0_0_var(--ink),3px_0_0_0_var(--ink)] transition-colors duration-200",
                reached(index) ? "bg-accent text-accent-ink" : "bg-surface text-muted",
              )}
            >
              {index + 1}
            </span>
            <div className={cn("transition-opacity duration-300", reached(index) ? "opacity-100" : "opacity-60")}>
              <h4 className="text-2xl font-bold leading-tight">{step.title}</h4>
              <p className="mt-2 max-w-[56ch] text-lg text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
