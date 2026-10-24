import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export const containerClass = "mx-auto w-full max-w-6xl px-5 sm:px-8";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative py-section", className)}>
      <div className={containerClass}>
        <Reveal>
          <p className="eyebrow">
            <span aria-hidden="true">{"// "}</span>
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl font-bold sm:text-5xl">
            {title}
          </h2>
          {intro ? <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p> : null}
        </Reveal>
        <div className="mt-stack">{children}</div>
      </div>
    </section>
  );
}
