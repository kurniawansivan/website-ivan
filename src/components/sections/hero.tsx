import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { NetworkBackground } from "@/components/background/network-background";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight, MapPinIcon } from "@/components/ui/icons";
import { RoleCycler } from "@/components/ui/role-cycler";
import { containerClass } from "@/components/ui/section";
import { HeroShowcase } from "./hero-showcase";

interface HeroProps {
  locale: Locale;
  dict: Dictionary["hero"];
}

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ locale, dict }: HeroProps) {
  const home = localePath(locale, "/");
  return (
    <section id="top" className="relative isolate flex min-h-svh items-center overflow-hidden pb-stack pt-page">
      <NetworkBackground className="mask-fade-b absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden="true" className="bg-grid mask-fade-radial absolute inset-0 -z-10" />

      <div className={cn(containerClass, "grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16")}>
        <div>
          {site.availableForWork ? (
            <p
              style={rise(0)}
              className="rise inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-3.5 py-1.5 text-xs font-medium backdrop-blur"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent motion-reduce:hidden" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {dict.available}
            </p>
          ) : null}

          <h1 className="mt-7 font-display text-[clamp(3rem,10.5vw,6.5rem)] font-bold leading-[0.92] tracking-tight">
            <span style={rise(1)} className="rise block">
              Ivan
            </span>{" "}
            <span style={rise(2)} className="rise block">
              Kurniawan
            </span>{" "}
            <span style={rise(3)} className="rise text-gradient block pb-2">
              Sentosa
            </span>
          </h1>

          <div style={rise(4)} className="rise mt-5">
            <RoleCycler roles={dict.roles} />
          </div>

          <p style={rise(5)} className="rise mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {dict.lead}
          </p>

          <div style={rise(6)} className="rise mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={`${home}#work`}>
              {dict.ctaWork}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={`${home}#contact`} variant="ghost">
              {dict.ctaTalk}
            </ButtonLink>
          </div>

          <p
            style={rise(7)}
            className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              {site.location.city}, {site.location.country}
            </span>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              github.com/{site.githubUser}
            </a>
          </p>
        </div>

        <HeroShowcase locale={locale} dict={dict.showcase} />
      </div>
    </section>
  );
}
