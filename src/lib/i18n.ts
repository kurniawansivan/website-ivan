export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Localized<T> = Record<Locale, T>;

export const ogLocale: Record<Locale, string> = { en: "en_US", id: "id_ID" };
export const intlLocale: Record<Locale, string> = { en: "en-US", id: "id-ID" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** English is served from the root, every other locale under its own prefix. */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "id" : "en";
}
