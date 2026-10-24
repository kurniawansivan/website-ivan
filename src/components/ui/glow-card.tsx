"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Wrapper that feeds the pointer position to the `.glow-card` border light in globals.css. */
export function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  function track(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={track} className={cn("glow-card", className)}>
      {children}
    </div>
  );
}
