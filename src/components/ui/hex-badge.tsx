import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hexagonal number badge. The fill is opaque so rails and lines pass cleanly behind it. */
export function HexBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center bg-[color-mix(in_oklab,var(--accent)_22%,var(--canvas))] font-mono text-[11px] font-medium text-accent-text [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
