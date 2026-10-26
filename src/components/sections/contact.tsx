import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { ArrowUpRight, MapPinIcon, PixelArrow } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { containerClass, STAGE_TOTAL } from "@/components/ui/section";
import { CopyEmail } from "./copy-email";

const row =
  "group relative flex min-h-14 items-center gap-4 border-b-2 border-dashed border-line py-3 pl-12 pr-4 transition-colors hover:bg-raised focus-visible:bg-raised";

/** The last stage: a big headline, then a choice menu with a cursor, like a "Continue?" screen. */
export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const stage = String(STAGE_TOTAL).padStart(2, "0");
  const options = [
    { label: dict.email, value: site.email, href: `mailto:${site.email}`, external: false },
    { label: dict.linkedin, value: "ivankurniawansentosa", href: site.linkedin, external: true },
    { label: dict.github, value: site.githubUser, href: site.github, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-section">
      <div className={containerClass}>
        <Reveal>
          <div className="pixel pixel-lift p-6 sm:p-10">
            <p className="hud flex flex-wrap items-center justify-between gap-3">
              <span className="bg-accent px-2 py-1 text-accent-ink">
                Stage {stage}/{stage}
              </span>
              <span className="text-ink">{dict.eyebrow}</span>
            </p>

            <h2
              id="contact-title"
              className="title-shadow mt-8 font-display text-[clamp(2.5rem,6.6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            >
              {dict.title}
            </h2>
            <p className="mt-6 max-w-xl text-xl text-muted">{dict.body}</p>

            <ul className="mt-10 border-t-4 border-dashed border-line">
              <li>
                <a href={options[0].href} className={row}>
                  <PixelArrow className="absolute left-4 hidden h-3 w-3 animate-nudge text-accent-text group-hover:block group-focus-visible:block" />
                  <span className="text-sm font-bold uppercase tracking-wide">{options[0].label}</span>
                  <span className="ml-auto break-all font-mono text-sm text-muted">{options[0].value}</span>
                </a>
              </li>
              <li>
                <CopyEmail email={site.email} label={dict.copy} copiedLabel={dict.copied} />
              </li>
              {options.slice(1).map((option) => (
                <li key={option.label}>
                  <a href={option.href} target="_blank" rel="noopener noreferrer" className={row}>
                    <PixelArrow className="absolute left-4 hidden h-3 w-3 animate-nudge text-accent-text group-hover:block group-focus-visible:block" />
                    <span className="text-sm font-bold uppercase tracking-wide">{option.label}</span>
                    <span className="ml-auto flex items-center gap-2 font-mono text-sm text-muted">
                      {option.value}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="hud mt-8 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                {dict.location} {site.location.city}, {site.location.country}
              </span>
              <span className="text-ink">Player 1 — Ivan K. Sentosa</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
