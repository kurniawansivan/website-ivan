import Link from "next/link";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/dictionary";
import { getProject } from "@/content/projects";
import { showcase, type ShowcaseStatus } from "@/content/showcase";
import { blockHash } from "@/lib/hash";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/icons";

interface HeroShowcaseProps {
  locale: Locale;
  dict: Dictionary["hero"]["showcase"];
}

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

const statusStyle: Record<ShowcaseStatus, string> = {
  delivered: "border-amber/30 bg-amber/10 text-amber",
  open: "border-accent-text/30 bg-accent/10 text-accent-text",
};

/** Curated table of production-grade builds. Each row links to its case study. */
export function HeroShowcase({ locale, dict }: HeroShowcaseProps) {
  const rows = showcase.flatMap((entry) => {
    const project = getProject(entry.slug);
    return project ? [{ entry, title: project.copy[locale].title }] : [];
  });

  return (
    <aside
      aria-label={dict.title}
      style={rise(5)}
      className="rise relative overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-2xl shadow-black/10 backdrop-blur-md"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-linear-to-b from-transparent via-accent/10 to-transparent motion-reduce:hidden"
      />

      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-xs">
        <span className="flex items-center gap-2 text-muted">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent motion-reduce:hidden" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          {dict.title}
        </span>
        <span className="text-muted">{dict.note}</span>
      </header>

      <ol className="divide-y divide-line">
        {rows.map(({ entry, title }) => (
          <li key={entry.slug}>
            <Link
              href={localePath(locale, `/work/${entry.slug}`)}
              className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-accent/5"
            >
              <span className="hidden font-mono text-xs text-accent-text sm:inline">0x{blockHash(entry.slug, 6)}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug">{title}</span>
                <span className="mt-1 block font-mono text-[11px] leading-snug text-muted">
                  {entry.signals.join(" · ")}
                </span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                  statusStyle[entry.status],
                )}
              >
                {dict[entry.status]}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <footer className="flex flex-col gap-1 border-t border-line bg-raised/60 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <span className="text-muted">{dict.footer}</span>
        <Link
          href={localePath(locale, "/work")}
          className="inline-flex shrink-0 items-center gap-1.5 font-medium text-accent-text hover:underline"
        >
          {dict.viewAll}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </footer>
    </aside>
  );
}
