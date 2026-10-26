import Link from "next/link";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";
import { ArrowUpRight, PixelArrow } from "@/components/ui/icons";
import { Monogram } from "@/components/ui/monogram";
import { containerClass } from "@/components/ui/section";
import { Clouds } from "./clouds";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

const link =
  "group inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink hover:text-accent-text";

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div aria-hidden="true" className="relative isolate h-24">
        <Clouds variant="footer" className="inset-y-0" />
      </div>
      <div aria-hidden="true" className="ground" />
      <div className="bg-canvas">
        <div className={`${containerClass} grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end`}>
          <div className="flex items-start gap-5">
            <Monogram className="h-12 w-12 text-2xl" />
            <div>
              <p className="font-heading text-3xl font-bold leading-none">{site.name}</p>
              <p className="mt-3 text-muted">
                {dict.hero.roles[0]} · {site.location.city}, {site.location.country}
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-8">
            {[
              { href: site.github, label: "GitHub", external: true },
              { href: site.linkedin, label: "LinkedIn", external: true },
              { href: `mailto:${site.email}`, label: dict.contact.email, external: false },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={link}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <PixelArrow className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t-4 border-dashed border-line">
          <div className={`${containerClass} flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between`}>
            <p className="hud">
              © {year} {site.name}. {dict.footer.rights}
            </p>
            <p className="hud flex flex-wrap items-center gap-x-5">
              <span>{dict.footer.built}</span>
              <Link
                href={`${localePath(locale, "/")}#top`}
                className="inline-flex min-h-11 items-center text-ink hover:text-accent-text"
              >
                {dict.footer.top} ↑
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
