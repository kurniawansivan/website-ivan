import { site } from "@/content/site";

export interface GithubSnapshot {
  publicRepos: number;
  languages: number;
}

interface Repo {
  language: string | null;
  fork: boolean;
}

/** Used when the GitHub API is unreachable or rate limited, so the build and the page never fail. */
const FALLBACK: GithubSnapshot = { publicRepos: 52, languages: 12 };

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

/** Public-profile numbers for the stats strip. */
export async function getGithub(): Promise<GithubSnapshot> {
  try {
    const [user, repos] = await Promise.all([
      github<{ public_repos: number }>(`/users/${site.githubUser}`),
      github<Repo[]>(`/users/${site.githubUser}/repos?per_page=100&sort=pushed`),
    ]);
    const languages = new Set(repos.filter((repo) => !repo.fork).map((repo) => repo.language).filter(Boolean));
    return { publicRepos: user.public_repos, languages: languages.size };
  } catch {
    return FALLBACK;
  }
}
