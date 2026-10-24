export type ShowcaseStatus = "delivered" | "open";

export interface ShowcaseEntry {
  slug: string;
  /** "delivered": built for a client or employer (private). "open": public repo with CI and automated tests. */
  status: ShowcaseStatus;
  /** Two short, language-neutral proof points. */
  signals: [string, string];
}

/**
 * The hero table. Selection rule: delivered work, or a public repo with CI and tests that run against
 * real infrastructure. Prototypes, paper-trading bots, v0.x scaffolds and projects without automated
 * tests stay in the full work list, not here. Re-check this list whenever a project's status changes.
 */
export const showcase: ShowcaseEntry[] = [
  { slug: "smart-seller", status: "delivered", signals: ["Eurocis 2024", "FastAPI"] },
  { slug: "ikpiflow", status: "open", signals: ["Row-Level Security", "e2e on real Postgres"] },
  { slug: "gallery-management", status: "delivered", signals: ["PostgreSQL", "Docker"] },
  { slug: "asset-onboarding", status: "delivered", signals: ["Azure Blob", "Vusion + Korona APIs"] },
  { slug: "jb-warehouse", status: "delivered", signals: ["Flutter", "Python API"] },
];
