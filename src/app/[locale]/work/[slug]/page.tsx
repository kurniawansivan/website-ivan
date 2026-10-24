import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { getProject, projects, repoUrl, type Kind } from "@/content/projects";
import { blockHash } from "@/lib/hash";
import { isLocale, localePath, locales } from "@/lib/i18n";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubIcon } from "@/components/ui/icons";
import { HexBadge } from "@/components/ui/hex-badge";
import { Reveal } from "@/components/ui/reveal";
import { containerClass } from "@/components/ui/section";
import { getVisualMeta, ProjectVisual } from "@/components/work/visuals";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

const kindStyles: Record<Kind, string> = {
  work: "border-amber/30 bg-amber/10 text-amber",
  personal: "border-accent-text/30 bg-accent/10 text-accent-text",
  research: "border-sky/30 bg-sky/10 text-sky",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const copy = project.copy[locale];
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: copy.title,
    description: `${copy.tagline} ${copy.summary}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();

  const dict = getDictionary(locale);
  const copy = project.copy[locale];
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const path = `/work/${slug}`;
  const visual = getVisualMeta(slug, locale);

  return (
    <PageShell locale={locale} path={path}>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: dict.nav.home, path: localePath(locale, "/") },
            { name: dict.nav.work, path: localePath(locale, "/work") },
            { name: copy.title, path: localePath(locale, path) },
          ]),
          projectSchema(locale, project),
        ]}
      />

      <article className="pb-20 pt-28 sm:pt-36">
        <div className={containerClass}>
          <Link
            href={localePath(locale, "/work")}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.project.back}
          </Link>

          <header className="mt-6 max-w-3xl">
            <p className="flex flex-wrap items-center gap-3 text-xs">
              <span className={cn("rounded-full border px-2.5 py-0.5 font-medium", kindStyles[project.kind])}>
                {dict.work.kind[project.kind]}
              </span>
              <span className="font-mono text-muted">0x{blockHash(project.slug, 8)}</span>
            </p>
            <h1 className="mt-5 text-4xl font-bold sm:text-6xl">{copy.title}</h1>
            <p className="mt-4 text-xl text-muted">{copy.tagline}</p>
          </header>

          {visual ? (
            <Reveal className="mt-10">
              <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
                <ProjectVisual slug={project.slug} label={visual.alt} />
                <figcaption className="border-t border-line px-4 py-3 text-xs text-muted sm:px-5">
                  {dict.project.figure[visual.figure]}
                </figcaption>
              </figure>
            </Reveal>
          ) : null}

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div className="space-y-12">
              <Reveal>
                <h2 className="eyebrow">{dict.project.overview}</h2>
                <p className="mt-4 text-lg text-ink/85">{copy.summary}</p>
              </Reveal>

              <Reveal>
                <h2 className="eyebrow">{dict.project.built}</h2>
                <ol className="mt-5 space-y-5">
                  {copy.highlights.map((highlight, i) => (
                    <li key={highlight} className="flex gap-4">
                      <HexBadge>{String(i + 1).padStart(2, "0")}</HexBadge>
                      <p className="pt-1.5 text-ink/85">{highlight}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <aside className="space-y-6 rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  {copy.role ? (
                    <div className="col-span-2">
                      <dt className="text-muted">{dict.project.role}</dt>
                      <dd className="mt-0.5 font-medium">{copy.role}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="text-muted">{dict.project.kind}</dt>
                    <dd className="mt-0.5 font-medium">{dict.work.kind[project.kind]}</dd>
                  </div>
                  {project.year ? (
                    <div>
                      <dt className="text-muted">{dict.project.year}</dt>
                      <dd className="mt-0.5 font-medium tabular-nums">{project.year}</dd>
                    </div>
                  ) : null}
                  <div className="col-span-2">
                    <dt className="text-muted">{dict.project.hash}</dt>
                    <dd className="mt-0.5 break-all font-mono text-[11px] leading-relaxed text-accent-text">
                      0x{blockHash(project.slug, 64)}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-line pt-6">
                  <h2 className="text-sm text-muted">{dict.project.stack}</h2>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-raised/60 px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-6">
                  <h2 className="text-sm text-muted">{dict.project.links}</h2>
                  <div className="mt-3 flex flex-col gap-2">
                    {project.repo ? (
                      <ButtonLink href={repoUrl(project.repo)} external variant="ghost">
                        <GithubIcon className="h-4 w-4" />
                        {dict.project.source}
                      </ButtonLink>
                    ) : null}
                    {project.live ? (
                      <ButtonLink href={project.live} external variant="ghost">
                        {dict.project.live}
                        <ArrowUpRight className="h-4 w-4" />
                      </ButtonLink>
                    ) : null}
                    {!project.repo && !project.live ? (
                      <p className="text-sm text-muted">{dict.project.privateRepo}</p>
                    ) : null}
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>

          <nav aria-label="Project navigation" className="mt-20 grid gap-4 sm:grid-cols-2">
            {[
              { project: previous, label: dict.project.prev, icon: <ArrowLeft className="h-4 w-4" />, align: "" },
              { project: next, label: dict.project.next, icon: <ArrowRight className="h-4 w-4" />, align: "sm:text-right sm:items-end" },
            ].map(({ project: target, label, icon, align }) => (
              <Link
                key={label}
                href={localePath(locale, `/work/${target.slug}`)}
                className={cn(
                  "group flex flex-col gap-1 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent-text/50",
                  align,
                )}
              >
                <span className="flex items-center gap-2 font-mono text-xs text-muted group-hover:text-accent-text">
                  {label === dict.project.prev ? icon : null}
                  {label}
                  {label === dict.project.next ? icon : null}
                </span>
                <span className="font-display text-lg font-semibold">{target.copy[locale].title}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <p className="font-display text-2xl font-semibold">{dict.project.discuss}</p>
            <ButtonLink href={`${localePath(locale, "/")}#contact`}>
              {dict.project.discussCta}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
