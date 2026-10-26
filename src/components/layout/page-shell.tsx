import type { ReactNode } from "react";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { Footer } from "./footer";
import { StageRail } from "./stage-rail";
import { Nav } from "./nav";

interface PageShellProps {
  locale: Locale;
  /** Locale-agnostic path of the page being rendered. */
  path: string;
  isHome?: boolean;
  children: ReactNode;
}

export function PageShell({ locale, path, isHome = false, children }: PageShellProps) {
  const dict = getDictionary(locale);
  return (
    <>
      <Nav locale={locale} path={path} isHome={isHome} dict={dict.nav} />
      {isHome ? <StageRail /> : null}
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
