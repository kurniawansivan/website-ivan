"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Deterministic generator so the sky is identical on the server and the client. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Each layer is 220vh tall and slides up as the page scrolls, at its own speed. */
const LAYER_VH = 220;
const rand = lcg(11);
const stars = (count: number) =>
  Array.from({ length: count }, () => `${Math.floor(rand() * 100)}vw ${Math.floor(rand() * LAYER_VH)}vh 0 0 var(--star)`).join(",");

const FAR = stars(70);
const NEAR = stars(26);

/** The star field behind the page. Two layers drift at different speeds for depth. Decorative only. */
export function Backdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const far = useTransform(scrollYProgress, [0, 1], ["0vh", "-55vh"]);
  const near = useTransform(scrollYProgress, [0, 1], ["0vh", "-110vh"]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y: reduceMotion ? 0 : far }} className="absolute inset-x-0 top-0 h-[220vh]">
        <div className="absolute left-0 top-0 h-[2px] w-[2px]" style={{ boxShadow: FAR }} />
      </motion.div>
      <motion.div style={{ y: reduceMotion ? 0 : near }} className="absolute inset-x-0 top-0 h-[220vh]">
        <div
          className="absolute left-0 top-0 h-[3px] w-[3px] animate-[twinkle_2.4s_steps(2)_infinite]"
          style={{ boxShadow: NEAR }}
        />
      </motion.div>
    </div>
  );
}
