import { site } from "@/content/site";
import { blockHash } from "./hash";

export interface Activity {
  name: string;
  language: string | null;
  pushedAt: string;
  hash: string;
  url: string;
}

export interface GithubSnapshot {
  publicRepos: number;
  languages: number;
  activity: Activity[];
}

interface Repo {
  name: string;
  language: string | null;
  fork: boolean;
  pushed_at: string;
  html_url: string;
}

/** Repos that should never appear in the public feed: employer work, the profile repo and scratch space. */
const HIDDEN = [
  /^praijing/i,
  /^vusion/i,
  /^zoho/i,
  /^kec/i,
  new RegExp(`^${site.githubUser}$`, "i"),
  /^(testing|belajar|action|githubaction|pytest_sample|final_relief|mobile-prog)$/i,
];

function toActivity(name: string, language: string | null, pushedAt: string, url: string): Activity {
  return { name, language, pushedAt, url, hash: blockHash(`${name}@${pushedAt}`, 8) };
}

/** Used when the GitHub API is unreachable or rate limited, so the build and the page never fail. */
const FALLBACK: GithubSnapshot = {
  publicRepos: 52,
  languages: 12,
  activity: [
    toActivity("Rumah3d", "TypeScript", "2026-10-08T00:00:00Z", `${site.github}/Rumah3d`),
    toActivity("DigitalContentCreator", "TypeScript", "2026-08-08T00:00:00Z", `${site.github}/DigitalContentCreator`),
    toActivity("IkpiSystem", "TypeScript", "2026-07-30T00:00:00Z", `${site.github}/IkpiSystem`),
    toActivity("script-to-video", "JavaScript", "2026-07-09T00:00:00Z", `${site.github}/script-to-video`),
    toActivity("RoboTrade", "Python", "2026-06-20T00:00:00Z", `${site.github}/RoboTrade`),
  ],
};

async function github<T>(path: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "ivan-portfolio",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`GitHub API responded ${response.status} for ${path}`);
  return response.json() as Promise<T>;
}

export async function getGithub(): Promise<GithubSnapshot> {
  try {
    const [user, repos] = await Promise.all([
      github<{ public_repos: number }>(`/users/${site.githubUser}`),
      github<Repo[]>(`/users/${site.githubUser}/repos?per_page=100&sort=pushed`),
    ]);

    const owned = repos.filter((repo) => !repo.fork);
    const languages = new Set(owned.map((repo) => repo.language).filter(Boolean));
    const activity = owned
      .filter((repo) => !HIDDEN.some((pattern) => pattern.test(repo.name)))
      .slice(0, 5)
      .map((repo) => toActivity(repo.name, repo.language, repo.pushed_at, repo.html_url));

    if (activity.length === 0) return FALLBACK;
    return { publicRepos: user.public_repos, languages: languages.size, activity };
  } catch {
    return FALLBACK;
  }
}

export function daysSince(isoDate: string, now = new Date()): number {
  const ms = now.getTime() - new Date(isoDate).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}
