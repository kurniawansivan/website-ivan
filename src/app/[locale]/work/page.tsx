import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { isLocale, localePath } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/ui/section";
import { toProjectView } from "@/components/work/view";
import { WorkLedger } from "@/components/work/work-ledger";

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
      <Section
        id="work"
        stage={2}
        as="h1"
        eyebrow={dict.work.index.eyebrow}
        title={dict.work.index.title}
        intro={dict.work.index.intro}
        className="pb-section pt-page"
      >
        <WorkLedger projects={views} filters={dict.work.filters} filterLabel={dict.work.filterLabel} />
      </Section>
    </PageShell>
  );
}
