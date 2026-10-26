import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";
import { Backdrop } from "@/components/layout/backdrop";
import { Providers } from "@/components/providers";
import "../globals.css";

const display = Rubik({ subsets: ["latin"], variable: "--font-rubik", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

/** Runs before first paint so the theme never flashes: saved choice first, then the OS preference. */
const themeInit = `try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

/** Keeps scroll-reveal content visible when JavaScript is disabled. */
const noScriptCss = `.reveal{opacity:1!important;transform:none!important}`;

type LayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e4e8ff" },
    { media: "(prefers-color-scheme: dark)", color: "#110e32" },
  ],
  colorScheme: "dark light",
};

export async function generateMetadata({ params }: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s · ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: [
      site.name,
      "backend engineer",
      "fullstack developer",
      "FastAPI",
      "Go",
      "NestJS",
      "Flutter",
      "recommendation systems",
      "Bali",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptCss }} />
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:uppercase focus:text-accent-ink"
        >
          {dict.nav.skip}
        </a>
        <Backdrop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
