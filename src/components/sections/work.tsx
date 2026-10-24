import type { Dictionary } from "@/content/dictionary";
import { featuredProjects } from "@/content/projects";
import { localePath, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { toProjectView } from "@/components/work/view";
import { WorkGrid } from "@/components/work/work-grid";

export function Work({ locale, dict }: { locale: Locale; dict: Dictionary["work"] }) {
  const projects = featuredProjects.map((project) => toProjectView(project, locale, dict.kind));
  return (
    <Section id="work" eyebrow={dict.eyebrow} title={dict.title} intro={dict.intro}>
      <WorkGrid projects={projects} filters={dict.filters} filterLabel={dict.filterLabel} showFilters={false} />
      <div className="mt-10 flex justify-center">
        <ButtonLink href={localePath(locale, "/work")} variant="ghost">
          {dict.viewAll}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}
