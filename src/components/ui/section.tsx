import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export const containerClass = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Stages on the home page: opening, work, services, about, experience, contact. */
export const STAGE_TOTAL = 6;

interface SectionProps {
  id: string;
  stage: number;
  eyebrow: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}

/**
 * Reading layout: on wide screens the title stays pinned in the left column while the content
 * scrolls past on the right. On narrow screens it is a normal stacked header.
 */
export function Section({ id, stage, eyebrow, title, intro, as: Heading = "h2", className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative py-section", className)}>
      <div className={containerClass}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <header className="border-b-4 border-dashed border-line-strong pb-8 lg:border-b-0 lg:pb-0">
              <p className="hud flex flex-wrap items-center gap-3">
                <span className="bg-accent px-2.5 py-1 text-accent-ink">
                  Stage {String(stage).padStart(2, "0")}/{String(STAGE_TOTAL).padStart(2, "0")}
                </span>
                <span className="text-ink">{eyebrow}</span>
              </p>
              <Heading
                id={`${id}-title`}
                className="title-shadow-sm mt-6 font-display text-[clamp(2.5rem,5.4vw,4rem)] font-bold leading-[1.05] tracking-[-0.01em] lg:text-[clamp(2.5rem,3.4vw,3.25rem)]"
              >
                {title}
              </Heading>
              {intro ? <p className="mt-6 max-w-[34ch] text-lg text-muted lg:max-w-none">{intro}</p> : null}
            </header>
          </Reveal>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
