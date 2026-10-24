import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { isLocale, localePath } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { containerClass } from "@/components/ui/section";
import { toProjectView } from "@/components/work/view";
import { WorkGrid } from "@/components/work/work-grid";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/work",
    title: dict.meta.workTitle,
    description: dict.meta.workDescription,
  });
}

export default async function WorkIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const views = projects.map((project) => toProjectView(project, locale, dict.work.kind));

  return (
    <PageShell locale={locale} path="/work">
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: dict.nav.home, path: localePath(locale, "/") },
            { name: dict.nav.work, path: localePath(locale, "/work") },
          ]),
        ]}
      />
      <section aria-labelledby="work-title" className="pb-24 pt-28 sm:pt-36">
        <div className={containerClass}>
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden="true">{"// "}</span>
              {dict.work.index.eyebrow}
            </p>
            <h1 id="work-title" className="mt-3 text-4xl font-bold sm:text-6xl">
              {dict.work.index.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{dict.work.index.intro}</p>
          </Reveal>
          <div className="mt-12">
            <WorkGrid projects={views} filters={dict.work.filters} filterLabel={dict.work.filterLabel} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
