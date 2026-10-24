import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { Activity } from "@/lib/github";
import { intlLocale, type Locale } from "@/lib/i18n";

interface HeroLedgerProps {
  locale: Locale;
  dict: Dictionary["hero"];
  activity: Activity[];
  blockHeight: number;
}

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

/** An explorer-style feed of the latest GitHub pushes. Hashes are real SHA-256 prefixes of repo + push time. */
export function HeroLedger({ locale, dict, activity, blockHeight }: HeroLedgerProps) {
  const date = new Intl.DateTimeFormat(intlLocale[locale], {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <aside
      aria-label={dict.ledgerTitle}
      style={rise(5)}
      className="rise relative overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-2xl shadow-black/10 backdrop-blur-md"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-linear-to-b from-transparent via-accent/10 to-transparent motion-reduce:hidden"
      />

      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-xs">
        <span className="flex items-center gap-2 text-muted">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent motion-reduce:hidden" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          {dict.ledgerTitle}
        </span>
        <span className="text-muted">{dict.ledgerSource}</span>
      </header>

      <ol className="divide-y divide-line">
        {activity.map((item) => (
          <li key={item.name}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-accent/5"
            >
              <span className="font-mono text-xs text-accent-text">0x{item.hash}</span>
              <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
              {item.language ? (
                <span className="hidden rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted sm:inline">
                  {item.language}
                </span>
              ) : null}
              <time dateTime={item.pushedAt} className="font-mono text-xs tabular-nums text-muted">
                {date.format(new Date(item.pushedAt))}
              </time>
            </a>
          </li>
        ))}
      </ol>

      <footer className="flex items-center justify-between gap-3 border-t border-line bg-raised/60 px-4 py-3 font-mono text-xs">
        <span className="text-muted">
          {dict.blockHeight} <span className="hidden sm:inline">· {dict.blockHeightNote}</span>
        </span>
        <span className="font-medium tabular-nums text-ink">
          #{new Intl.NumberFormat(intlLocale[locale]).format(blockHeight)}
        </span>
      </footer>
    </aside>
  );
}
