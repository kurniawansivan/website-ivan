import Link from "next/link";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";
import { BlockMark, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/section";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

const iconLink =
  "grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent-text/60 hover:text-ink";

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className={`${containerClass} flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between`}>
        <div className="flex items-start gap-3">
          <BlockMark className="mt-0.5 h-7 w-7 text-accent-text" />
          <div>
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="text-sm text-muted">
              {dict.hero.roles[0]} · {site.location.city}, {site.location.country}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
            <LinkedinIcon className="h-[18px] w-[18px]" />
          </a>
          <a href={`mailto:${site.email}`} aria-label={dict.contact.email} className={iconLink}>
            <MailIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div
          className={`${containerClass} flex flex-col gap-2 py-5 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <p className="flex items-center gap-4">
            <span>{dict.footer.built}</span>
            <Link href={`${localePath(locale, "/")}#top`} className="text-accent-text hover:underline">
              {dict.footer.top} ↑
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
