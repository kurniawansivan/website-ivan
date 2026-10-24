"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  locale: string;
  suffix?: string;
}

/** Renders the final value on the server (good for SEO and no-JS), then counts up when scrolled into view. */
export function CountUp({ value, locale, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {new Intl.NumberFormat(locale).format(shown)}
      {suffix}
    </span>
  );
}
