"use client";

import Link from "next/link";
import { locales, localePath, type Locale } from "@/lib/i18n";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="pixel grid h-11 w-11 place-items-center text-ink transition-colors hover:bg-accent hover:text-accent-ink hover:[background-image:none] md:h-10 md:w-10"
    >
      <MoonIcon className="h-[18px] w-[18px] dark:hidden" />
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
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
  const cell = "grid min-w-10 place-items-center px-2.5 text-xs font-bold";
  return (
    <div role="group" aria-label={label} className="pixel flex h-11 items-stretch overflow-hidden md:h-10">
      {locales.map((code) =>
        code === locale ? (
          <span key={code} aria-current="true" className={`${cell} bg-accent text-accent-ink`}>
            {code.toUpperCase()}
          </span>
        ) : (
          <Link
            key={code}
            href={localePath(code, path)}
            hrefLang={code}
            lang={code}
            className={`${cell} text-ink transition-colors hover:bg-raised`}
          >
            {code.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}
