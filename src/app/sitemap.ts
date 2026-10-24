import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", ...projects.map((project) => `/work/${project.slug}`)];
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/work" ? 0.8 : 0.6,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
