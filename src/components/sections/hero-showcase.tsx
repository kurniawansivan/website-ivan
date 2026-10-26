import Link from "next/link";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/dictionary";
import { getProject } from "@/content/projects";
import { showcase, type ShowcaseStatus } from "@/content/showcase";
import { localePath, type Locale } from "@/lib/i18n";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { PixelArrow } from "@/components/ui/icons";

interface HeroShowcaseProps {
  locale: Locale;
  dict: Dictionary["hero"]["showcase"];
}

const step = (i: number) => ({ "--i": i }) as CSSProperties;

const statusTone: Record<ShowcaseStatus, BadgeTone> = { delivered: "purple", open: "blue" };

/** The quest board: production builds, each tagged with its status. Rows link to their case study. */
export function HeroShowcase({ locale, dict }: HeroShowcaseProps) {
  const rows = showcase.flatMap((entry) => {
    const project = getProject(entry.slug);
    return project ? [{ entry, title: project.copy[locale].title }] : [];
  });

  return (
    <aside aria-label={dict.title} style={step(7)} className="rise pixel pixel-lift relative">
      <header className="flex items-center justify-between gap-3 border-b-4 border-dashed border-line px-5 py-3">
        <span className="hud text-ink">{dict.title}</span>
        <span className="hud hidden sm:block">{dict.note}</span>
      </header>

      <ol>
        {rows.map(({ entry, title }, index) => (
          <li key={entry.slug} className="border-b-2 border-dashed border-line">
            <Link
              href={localePath(locale, `/work/${entry.slug}`)}
              className="group relative grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-x-3 px-5 py-4 transition-colors hover:bg-raised"
            >
              <span className="hud pt-1 text-ink group-hover:opacity-0">{String(index + 1).padStart(2, "0")}</span>
              <PixelArrow className="absolute left-5 top-[1.35rem] hidden h-3 w-3 animate-nudge text-accent-text group-hover:block" />
              <span className="min-w-0">
                <span className="block font-heading text-xl font-bold leading-tight">{title}</span>
                <span className="mt-1.5 block font-mono text-xs leading-snug text-muted">
                  {entry.signals.join(" · ")}
                </span>
              </span>
              <Badge tone={statusTone[entry.status]} delay={0.7 + index * 0.16} className="mt-0.5">
                {dict[entry.status]}
              </Badge>
            </Link>
          </li>
        ))}
      </ol>

      <footer className="flex flex-col gap-1 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <span className="text-muted">{dict.footer}</span>
        <Link
          href={localePath(locale, "/work")}
          className="hud inline-flex min-h-11 shrink-0 items-center gap-2 text-ink hover:text-accent-text"
        >
          <PixelArrow className="h-3 w-3" />
          {dict.viewAll}
        </Link>
      </footer>
    </aside>
  );
}
