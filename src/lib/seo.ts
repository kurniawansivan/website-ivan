import type { Metadata } from "next";
import { site } from "@/content/site";
import { localePath, locales, ogLocale, type Locale } from "./i18n";

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** hreflang map for a locale-agnostic path, including x-default. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = absoluteUrl(localePath(locale, path));
  languages["x-default"] = absoluteUrl(localePath("en", path));
  return languages;
}

interface PageMetadataInput {
  locale: Locale;
  /** Locale-agnostic path, e.g. "/" or "/work/shiftkerja". */
  path: string;
  title: string;
  description: string;
  /** Skip the "%s · Ivan Kurniawan Sentosa" template (home page). */
  absoluteTitle?: boolean;
}

export function pageMetadata({ locale, path, title, description, absoluteTitle }: PageMetadataInput): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
