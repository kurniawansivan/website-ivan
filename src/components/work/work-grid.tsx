"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Category, Kind } from "@/content/projects";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/ui/glow-card";
import { ArrowUpRight } from "@/components/ui/icons";
import type { ProjectView } from "./view";

type Filter = Category | "all";

interface WorkGridProps {
  projects: ProjectView[];
  filters: Record<Filter, string>;
  filterLabel: string;
  showFilters?: boolean;
}

const kindStyles: Record<Kind, string> = {
  work: "border-amber/30 bg-amber/10 text-amber",
  personal: "border-accent-text/30 bg-accent/10 text-accent-text",
  research: "border-sky/30 bg-sky/10 text-sky",
};

const FILTER_ORDER: Filter[] = ["all", "backend", "mobile", "data", "crypto", "ai"];

export function WorkGrid({ projects, filters, filterLabel, showFilters = true }: WorkGridProps) {
  const [active, setActive] = useState<Filter>("all");

  const available = useMemo(
    () =>
      FILTER_ORDER.filter((filter) => filter === "all" || projects.some((p) => p.categories.includes(filter))).map(
        (filter) => ({
          filter,
          count: filter === "all" ? projects.length : projects.filter((p) => p.categories.includes(filter)).length,
        }),
      ),
    [projects],
  );

  const visible = active === "all" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label={filterLabel}
          className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {available.map(({ filter, count }) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                active === filter
                  ? "border-accent bg-accent font-medium text-accent-ink"
                  : "border-line-strong text-muted hover:border-accent-text/60 hover:text-ink",
              )}
            >
              {filters[filter]}
              <span className="font-mono text-xs opacity-70">{count}</span>
            </button>
          ))}
        </div>
      ) : null}

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <GlowCard className="h-full rounded-2xl">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong">
                  <div aria-hidden="true" className="overflow-hidden border-b border-line bg-raised/40">
                    <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">{project.thumb}</div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-muted">0x{project.hash}</span>
                    <span className={cn("rounded-full border px-2.5 py-0.5 font-medium", kindStyles[project.kind])}>
                      {project.kindLabel}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold leading-snug">
                    <Link href={project.href} className="after:absolute after:inset-0 after:rounded-2xl">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted">{project.tagline}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-raised/60 px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                    {project.stack.length > 4 ? (
                      <li className="px-1 py-1 font-mono text-[11px] text-muted">+{project.stack.length - 4}</li>
                    ) : null}
                  </ul>

                  <div className="mt-auto flex items-center justify-between pt-6 text-xs text-muted">
                    <span className="font-mono">{project.year ?? ""}</span>
                    <ArrowUpRight className="h-5 w-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" />
                  </div>
                  </div>
                </article>
              </GlowCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
