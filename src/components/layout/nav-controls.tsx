"use client";

import Link from "next/link";
import { locales, localePath, type Locale } from "@/lib/i18n";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

const controlBox =
  "grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent-text/60 hover:text-ink md:h-10 md:w-10";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  }

  return (
    <button type="button" onClick={toggle} aria-label={label} className={controlBox}>
      <SunIcon className="h-[18px] w-[18px] light:hidden" />
      <MoonIcon className="hidden h-[18px] w-[18px] light:block" />
    </button>
  );
}

interface LangSwitchProps {
  locale: Locale;
  /** Locale-agnostic path of the current page. */
  path: string;
  label: string;
}

export function LangSwitch({ locale, path, label }: LangSwitchProps) {
  const item = "grid h-full min-w-9 place-items-center rounded-full px-2.5";
  return (
    <div
      role="group"
      aria-label={label}
      className="flex h-11 items-center rounded-full border border-line-strong p-1 font-mono text-xs md:h-10"
    >
      {locales.map((code) =>
        code === locale ? (
          <span key={code} aria-current="true" className={`${item} bg-accent/15 font-medium text-accent-text`}>
            {code.toUpperCase()}
          </span>
        ) : (
          <Link
            key={code}
            href={localePath(code, path)}
            hrefLang={code}
            lang={code}
            className={`${item} text-muted transition-colors hover:text-ink`}
          >
            {code.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}
