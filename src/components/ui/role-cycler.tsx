"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "01<>/\\{}[]#$%&*+=";
const FRAMES = 18;

/**
 * Cycles through role titles with a short "decrypt" scramble. The real list is always
 * in the DOM for screen readers and crawlers; the animated text is decorative.
 */
export function RoleCycler({ roles }: { roles: string[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const firstRun = useRef(true);

  useEffect(() => {
    if (reduceMotion || roles.length < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % roles.length), 3200);
    return () => clearInterval(timer);
  }, [reduceMotion, roles.length]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const target = roles[index];
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / FRAMES) * target.length);
      setText(
        target
          .split("")
          .map((char, i) =>
            char === " " || i < revealed ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (frame >= FRAMES) {
        clearInterval(timer);
        setText(target);
      }
    }, 35);
    return () => clearInterval(timer);
  }, [index, roles]);

  return (
    <p className="flex min-h-9 items-center font-mono text-lg text-accent-text sm:text-2xl">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-[0.5ch] animate-blink bg-accent" />
    </p>
  );
}
