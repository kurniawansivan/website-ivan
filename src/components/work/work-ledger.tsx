"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useMemo, useState, type PointerEvent } from "react";
import type { Category, Kind } from "@/content/projects";
import { cn } from "@/lib/utils";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { ArrowUpRight, PixelArrow } from "@/components/ui/icons";
import type { ProjectView } from "./view";

type Filter = Category | "all";

interface WorkLedgerProps {
  projects: ProjectView[];
  filters: Record<Filter, string>;
  filterLabel: string;
  showFilters?: boolean;
}

const kindTone: Record<Kind, BadgeTone> = { work: "pink", personal: "purple", research: "blue" };
const FILTER_ORDER: Filter[] = ["all", "backend", "mobile", "data", "crypto", "ai"];

const PREVIEW = { width: 360, height: 250 };

/**
 * The quest log. Layout follows the width of the list itself (container queries), not the screen,
 * so it reads well next to the pinned section title. On a mouse device the stack line and a preview
 * plate appear on hover; on touch the illustration and stack are always visible.
 */
export function WorkLedger({ projects, filters, filterLabel, showFilters = true }: WorkLedgerProps) {
  const [active, setActive] = useState<Filter>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  // The preview plate follows the pointer through springs, outside React state, so moving never re-renders.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const plateX = useSpring(pointerX, { stiffness: 380, damping: 38, mass: 0.6 });
  const plateY = useSpring(pointerY, { stiffness: 380, damping: 38, mass: 0.6 });

  /** Moves the plate target to the pointer. With `snap`, the plate appears there instead of flying in from the corner. */
  function place(event: PointerEvent<HTMLElement>, snap = false) {
    const targetX = Math.min(event.clientX + 32, window.innerWidth - PREVIEW.width - 24);
    const targetY = Math.min(Math.max(event.clientY - PREVIEW.height / 2, 80), window.innerHeight - PREVIEW.height - 24);
    pointerX.set(targetX);
    pointerY.set(targetY);
    if (snap) {
      plateX.jump(targetX);
      plateY.jump(targetY);
    }
  }

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
  const current = visible.find((project) => project.slug === hovered);

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label={filterLabel}
          className="-mx-5 mb-10 flex gap-4 overflow-x-auto px-6 pb-3 pt-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-1"
        >
          {available.map(({ filter, count }) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
              className={cn(
                "pixel inline-flex h-11 shrink-0 items-center gap-2 px-4 text-sm font-bold uppercase tracking-wide transition-colors",
                active === filter
                  ? "bg-accent text-accent-ink [background-image:none]"
                  : "text-ink hover:bg-raised hover:[background-image:none]",
              )}
            >
              {filters[filter]}
              <span className="opacity-70">{count}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div onPointerMove={(event) => place(event)} onPointerLeave={() => setHovered(null)}>
        <div className="pixel pixel-lift @container">
          <motion.ul layout>
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((project, index) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b-2 border-line last:border-b-0"
                >
                  <motion.div
                    className="reveal"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <Link
                      href={project.href}
                      onPointerEnter={(event) => {
                        place(event, hovered === null);
                        setHovered(project.slug);
                      }}
                      className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-4 px-6 py-7 transition-colors hover:bg-raised focus-visible:bg-raised @md:grid-cols-[3.25rem_minmax(0,1fr)_auto_1.5rem]"
                    >
                      <span className="hud pt-2 text-ink pointer-fine:group-hover:opacity-0">{project.number}</span>
                      <PixelArrow className="absolute left-6 top-[2.2rem] hidden h-3.5 w-3.5 animate-nudge text-accent-text pointer-fine:group-hover:block" />

                      <span className="min-w-0">
                        <span className="block font-heading text-[clamp(1.55rem,2.5vw,2.1rem)] font-bold leading-tight group-hover:text-accent-text">
                          {project.title}
                        </span>
                        <span className="mt-2 block max-w-[52ch] text-lg text-muted">{project.tagline}</span>
                        <span className="mt-3 block font-mono text-sm leading-snug text-muted transition-opacity duration-150 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100">
                          {project.stack.slice(0, 4).join(" · ")}
                        </span>
                        <span className="mt-4 flex items-center gap-5 @md:hidden">
                          <Badge tone={kindTone[project.kind]}>{project.kindLabel}</Badge>
                          <span className="hud">{project.year ?? ""}</span>
                        </span>
                      </span>

                      <span className="hidden flex-col items-end gap-3 pt-1 @md:flex">
                        <Badge tone={kindTone[project.kind]}>{project.kindLabel}</Badge>
                        <span className="hud text-ink">{project.year ?? "—"}</span>
                      </span>
                      <ArrowUpRight className="hidden h-5 w-5 justify-self-end pt-0.5 @md:block" />

                      <span aria-hidden="true" className="pixel col-span-full mx-1 mt-5 block p-1 md:pointer-fine:hidden">
                        {project.thumb}
                      </span>
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            key={current.slug}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[360px] md:pointer-fine:block"
            style={{ x: plateX, y: plateY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div className="pixel pixel-lift -rotate-2 p-1.5">{current.thumb}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
