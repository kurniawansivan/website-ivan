"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  className?: string;
}

/**
 * Types the text in like a dialogue box once it scrolls into view. One transparent copy of the full
 * text stays in the DOM for screen readers and crawlers and reserves the final height, so nothing
 * jumps; the typed copy on top is hidden from assistive tech.
 */
export function Typewriter({ text, speed = 18, className }: TypewriterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setInterval(() => {
      setCount((current) => {
        if (current >= text.length) {
          clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [inView, reduceMotion, speed, text.length]);

  const typed = reduceMotion ? text : text.slice(0, count);

  return (
    <p ref={ref} className={`grid ${className ?? ""}`}>
      <span className="pointer-events-none col-start-1 row-start-1 select-none opacity-0">{text}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {typed}
      </span>
    </p>
  );
}
