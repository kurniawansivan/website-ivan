import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { localePath, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button-link";
import { MapPinIcon, PixelArrow } from "@/components/ui/icons";
import { RoleCycler } from "@/components/ui/role-cycler";
import { Clouds } from "@/components/layout/clouds";
import { containerClass, STAGE_TOTAL } from "@/components/ui/section";
import { HeroShowcase } from "./hero-showcase";

interface HeroProps {
  locale: Locale;
  dict: Dictionary["hero"];
  /** Label of the opening stage, shown top right. */
  opening: string;
}

const step = (i: number) => ({ "--i": i }) as CSSProperties;
const WORDS = ["Ivan", "Kurniawan", "Sentosa"];

/** The title screen: letters drop in with a bounce, then the quest board of production builds. */
export function Hero({ locale, dict, opening }: HeroProps) {
  const home = localePath(locale, "/");
  let letter = 0;

  return (
    <section id="top" className="relative isolate pb-stack pt-page">
      <Clouds variant="hero" className="top-0 h-[55%]" />
      <div className={containerClass}>
        <div style={step(0)} className="rise hud flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          {site.availableForWork ? (
            <span className="flex items-center gap-3 text-ink">
              <span aria-hidden="true" className="h-2 w-2 animate-blink bg-accent" />
              {dict.available}
            </span>
          ) : (
            <span />
          )}
          <span>
            Stage 01/{String(STAGE_TOTAL).padStart(2, "0")} — {opening}
          </span>
        </div>

        <h1 className="title-shadow mt-10 font-display text-[clamp(2.75rem,9.6vw,8rem)] font-bold leading-[1.02] tracking-[-0.01em]">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden="true">
            {WORDS.map((word) => (
              <span key={word} className="mr-[0.28em] inline-block whitespace-nowrap">
                {[...word].map((char, index) => (
                  <span key={index} className="letter" style={{ "--i": letter++ } as CSSProperties}>
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-start lg:gap-16">
          <div>
            <div style={step(8)} className="rise flex items-center gap-4">
              <span className="hud">{dict.roleLabel}</span>
              <RoleCycler roles={dict.roles} />
            </div>
            <p style={step(9)} className="rise mt-6 max-w-[34rem] text-[1.3rem] leading-[1.5] sm:text-2xl">
              {dict.lead}
            </p>
            <div style={step(10)} className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
              <ButtonLink href={`${home}#work`}>
                <PixelArrow className="h-3 w-3" />
                {dict.ctaWork}
              </ButtonLink>
              <ButtonLink href={`${home}#contact`} variant="ghost">
                {dict.ctaTalk}
              </ButtonLink>
            </div>
            <p style={step(11)} className="rise hud mt-10 flex flex-wrap items-center gap-x-6 gap-y-1">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                {site.location.city}, {site.location.country}
              </span>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-ink hover:text-accent-text"
              >
                github.com/{site.githubUser}
              </a>
            </p>
          </div>

          <HeroShowcase locale={locale} dict={dict.showcase} />
        </div>
      </div>
    </section>
  );
}
