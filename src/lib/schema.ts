import { getDictionary } from "@/content/dictionary";
import type { Project } from "@/content/projects";
import { repoUrl } from "@/content/projects";
import { site } from "@/content/site";
import { localePath, type Locale } from "./i18n";
import { absoluteUrl } from "./seo";

const personId = () => absoluteUrl("/#person");

export function personSchema(locale: Locale) {
  return {
    "@type": "Person",
    "@id": personId(),
    name: site.name,
    url: absoluteUrl(localePath(locale, "/")),
    jobTitle: "Backend Engineer",
    description: getDictionary(locale).meta.description,
    sameAs: [site.github, site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    worksFor: { "@type": "Organization", name: "Wolkk" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Primakara" },
    knowsLanguage: ["en", "id"],
    knowsAbout: [
      "Backend engineering",
      "API design",
      "Python",
      "FastAPI",
      "Go",
      "NestJS",
      "PostgreSQL",
      "Flutter",
      "Recommendation systems",
      "Data mining",
    ],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl(localePath(locale, "/")),
    name: site.name,
    inLanguage: locale,
    publisher: { "@id": personId() },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectSchema(locale: Locale, project: Project) {
  const copy = project.copy[locale];
  return {
    "@type": project.repo ? ["CreativeWork", "SoftwareSourceCode"] : "CreativeWork",
    name: copy.title,
    headline: copy.tagline,
    description: copy.summary,
    url: absoluteUrl(localePath(locale, `/work/${project.slug}`)),
    inLanguage: locale,
    author: { "@id": personId() },
    keywords: project.stack.join(", "),
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    ...(project.repo ? { codeRepository: repoUrl(project.repo) } : {}),
  };
}
