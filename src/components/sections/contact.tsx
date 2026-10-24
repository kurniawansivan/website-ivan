import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { containerClass } from "@/components/ui/section";
import { CopyEmail } from "./copy-email";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-28">
      <div className={containerClass}>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-14">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 -z-10 h-96 w-96 bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.22),transparent)]"
            />
            <div aria-hidden="true" className="bg-grid mask-fade-radial absolute inset-0 -z-10 opacity-60" />

            <p className="eyebrow">
              <span aria-hidden="true">{"// "}</span>
              {dict.eyebrow}
            </p>
            <h2 id="contact-title" className="mt-3 max-w-3xl text-4xl font-bold sm:text-6xl">
              {dict.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">{dict.body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${site.email}`} external>
                <MailIcon className="h-4 w-4" />
                {dict.email}
              </ButtonLink>
              <CopyEmail email={site.email} label={dict.copy} copiedLabel={dict.copied} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonLink href={site.linkedin} external variant="ghost">
                <LinkedinIcon className="h-4 w-4" />
                {dict.linkedin}
              </ButtonLink>
              <ButtonLink href={site.github} external variant="ghost">
                <GithubIcon className="h-4 w-4" />
                {dict.github}
              </ButtonLink>
            </div>

            <p className="mt-10 flex items-center gap-2 font-mono text-xs text-muted">
              <MapPinIcon className="h-4 w-4" />
              {dict.location} {site.location.city}, {site.location.country}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
