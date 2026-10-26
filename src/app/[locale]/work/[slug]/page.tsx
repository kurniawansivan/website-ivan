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
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRight, GithubIcon, PixelArrow } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { containerClass } from "@/components/ui/section";
import { getVisualMeta, ProjectVisual } from "@/components/work/visuals";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

const kindTone: Record<Kind, BadgeTone> = { work: "pink", personal: "purple", research: "blue" };

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

      <article className="pb-section pt-page">
        <div className={containerClass}>
          <Link
            href={localePath(locale, "/work")}
            className="hud inline-flex min-h-11 items-center gap-3 text-ink hover:text-accent-text"
          >
            <PixelArrow className="h-3 w-3 rotate-180" />
            {dict.project.back}
          </Link>

          <header className="mt-6 border-b-4 border-dashed border-line-strong pb-10">
            <p className="hud flex flex-wrap items-center gap-x-5 gap-y-3">
              <Badge tone={kindTone[project.kind]}>{dict.work.kind[project.kind]}</Badge>
              <span>No. {String(index + 1).padStart(3, "0")}</span>
              <span>Ref 0x{blockHash(project.slug, 8)}</span>
              {project.year ? <span>{project.year}</span> : null}
            </p>
            <h1 className="title-shadow mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.01em]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted">{copy.tagline}</p>
          </header>

          {visual ? (
            <Reveal className="mt-stack">
              <figure>
                <div className="pixel pixel-lift p-2">
                  <ProjectVisual slug={project.slug} label={visual.alt} />
                </div>
                <figcaption className="hud mt-7 max-w-3xl">
                  <span className="text-ink">Exhibit A</span> — {dict.project.figure[visual.figure]}
                </figcaption>
              </figure>
            </Reveal>
          ) : null}

          <div className="mt-stack grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
            <div className="space-y-stack">
              <Reveal>
                <h2 className="hud text-ink">{dict.project.overview}</h2>
                <p className="mt-4 max-w-[62ch] text-[1.3rem] leading-[1.6]">{copy.summary}</p>
              </Reveal>

              <Reveal>
                <h2 className="hud text-ink">{dict.project.built}</h2>
                <ol className="mt-4">
                  {copy.highlights.map((highlight, i) => (
                    <li key={highlight} className="flex gap-4 border-b-2 border-dashed border-line py-5">
                      <span className="hud grid h-8 w-8 shrink-0 place-items-center bg-accent text-accent-ink">{i + 1}</span>
                      <p className="pt-1 text-lg">{highlight}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <aside className="pixel pixel-lift p-5 sm:p-6 lg:sticky lg:top-24">
                <dl className="text-sm">
                  {copy.role ? (
                    <div className="border-b-2 border-dashed border-line pb-4">
                      <dt className="hud">{dict.project.role}</dt>
                      <dd className="mt-2 text-base font-semibold">{copy.role}</dd>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-2 gap-4 border-b-2 border-dashed border-line py-4">
                    <div>
                      <dt className="hud">{dict.project.kind}</dt>
                      <dd className="mt-2 text-base font-semibold">{dict.work.kind[project.kind]}</dd>
                    </div>
                    {project.year ? (
                      <div>
                        <dt className="hud">{dict.project.year}</dt>
                        <dd className="mt-2 text-base font-semibold tabular-nums">{project.year}</dd>
                      </div>
                    ) : null}
                  </div>
                  <div className="border-b-2 border-dashed border-line py-4">
                    <dt className="hud">{dict.project.hash}</dt>
                    <dd className="mt-2 break-all font-mono text-xs leading-relaxed">0x{blockHash(project.slug, 64)}</dd>
                  </div>
                  <div className="border-b-2 border-dashed border-line py-4">
                    <dt className="hud">{dict.project.stack}</dt>
                    <dd className="mt-2 font-mono text-sm leading-relaxed">{project.stack.join(" · ")}</dd>
                  </div>
                  <div className="pt-4">
                    <dt className="hud">{dict.project.links}</dt>
                    <dd className="mt-4 flex flex-col gap-5">
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
                      {!project.repo && !project.live ? <p className="text-muted">{dict.project.privateRepo}</p> : null}
                    </dd>
                  </div>
                </dl>
              </aside>
            </Reveal>
          </div>

          <nav aria-label="Project navigation" className="mt-stack grid gap-8 sm:grid-cols-2">
            {[
              { target: previous, label: dict.project.prev, side: "prev" },
              { target: next, label: dict.project.next, side: "next" },
            ].map(({ target, label, side }) => (
              <Link
                key={side}
                href={localePath(locale, `/work/${target.slug}`)}
                className={cn(
                  "pixel group flex flex-col gap-3 p-5 transition-colors hover:bg-raised hover:[background-image:none] sm:p-6",
                  side === "next" && "sm:items-end sm:text-right",
                )}
              >
                <span className="hud flex items-center gap-3">
                  {side === "prev" ? <PixelArrow className="h-3 w-3 rotate-180" /> : null}
                  {label}
                  {side === "next" ? <PixelArrow className="h-3 w-3" /> : null}
                </span>
                <span className="font-heading text-2xl font-bold leading-tight group-hover:text-accent-text">
                  {target.copy[locale].title}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-stack flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="font-heading text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight">
              {dict.project.discuss}
            </p>
            <ButtonLink href={`${localePath(locale, "/")}#contact`}>
              <PixelArrow className="h-3 w-3" />
              {dict.project.discussCta}
            </ButtonLink>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
