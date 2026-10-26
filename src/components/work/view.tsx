import type { ReactNode } from "react";
import { projects, type Category, type Kind, type Project } from "@/content/projects";
import { blockHash } from "@/lib/hash";
import { localePath, type Locale } from "@/lib/i18n";
import { ProjectVisual } from "./visuals";

/** Everything a project card needs, resolved for one locale on the server. */
export interface ProjectView {
  slug: string;
  /** Position in the full ledger, zero-padded. Stays fixed while filtering. */
  number: string;
  href: string;
  title: string;
  tagline: string;
  categories: Category[];
  kind: Kind;
  kindLabel: string;
  year?: number;
  stack: string[];
  hash: string;
  /** Decorative illustration for the card, rendered on the server. */
  thumb: ReactNode;
}

export function toProjectView(project: Project, locale: Locale, kindLabels: Record<Kind, string>): ProjectView {
  const copy = project.copy[locale];
  return {
    slug: project.slug,
    number: String(projects.indexOf(project) + 1).padStart(3, "0"),
    href: localePath(locale, `/work/${project.slug}`),
    title: copy.title,
    tagline: copy.tagline,
    categories: project.categories,
    kind: project.kind,
    kindLabel: kindLabels[project.kind],
    year: project.year,
    stack: project.stack,
    hash: blockHash(project.slug, 8),
    thumb: <ProjectVisual slug={project.slug} compact />,
  };
}
