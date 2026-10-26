import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { getGithub } from "@/lib/github";
import { isLocale } from "@/lib/i18n";
import { personSchema, websiteSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Work } from "@/components/sections/work";

type Props = { params: Promise<{ locale: string }> };

/** Re-render hourly so the GitHub-derived stats stay fresh without a redeploy. */
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/",
    title: dict.meta.title,
    description: dict.meta.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const github = await getGithub();

  return (
    <PageShell locale={locale} path="/" isHome>
      <JsonLd graph={[personSchema(locale), websiteSchema(locale)]} />
      <Hero locale={locale} dict={dict.hero} opening={dict.nav.opening} />
      <Stats
        locale={locale}
        dict={dict.proof}
        repos={github.publicRepos}
        languages={github.languages}
        cases={projects.length}
      />
      <Work locale={locale} dict={dict.work} />
      <Services dict={dict.services} />
      <About dict={dict.about} />
      <Experience dict={dict.experience} />
      <Contact dict={dict.contact} />
    </PageShell>
  );
}
