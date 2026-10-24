function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Ivan Kurniawan Sentosa",
  shortName: "Ivan Kurniawan",
  mark: "IKS",
  url: resolveSiteUrl(),
  email: "kurniawansivan@gmail.com",
  github: "https://github.com/kurniawansivan",
  githubUser: "kurniawansivan",
  linkedin: "https://www.linkedin.com/in/ivankurniawansentosa/",
  location: { city: "Bali", country: "Indonesia", countryCode: "ID" },
  /** GitHub account creation date: the "genesis block" of the block-height counter. */
  genesis: "2020-06-04",
  /** First full-time engineering role, used for the years-of-experience counter. */
  careerStartYear: 2021,
  availableForWork: true,
} as const;

export type SiteConfig = typeof site;
