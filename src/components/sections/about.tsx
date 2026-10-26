import type { Dictionary } from "@/content/dictionary";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Typewriter } from "@/components/ui/typewriter";

/** A dialogue box for the bio, then plain lists for principles and tools. One window, easy to read. */
export function About({ dict }: { dict: Dictionary["about"] }) {
  const [lead, ...rest] = dict.paragraphs;
  return (
    <Section id="about" stage={4} eyebrow={dict.eyebrow} title={dict.title}>
      <div className="space-y-stack">
        <Reveal>
          <div className="pixel pixel-lift p-6 sm:p-8">
            <div className="flex items-center gap-4 border-b-2 border-line pb-5">
              <span
                aria-hidden="true"
                className="grid h-14 w-14 shrink-0 place-items-center bg-accent font-display text-2xl font-extrabold text-accent-ink shadow-[0_-3px_0_0_var(--ink),0_3px_0_0_var(--ink),-3px_0_0_0_var(--ink),3px_0_0_0_var(--ink)]"
              >
                IK
              </span>
              <span className="hud text-ink">Ivan</span>
            </div>
            <Typewriter text={lead} speed={8} className="mt-6 max-w-[58ch] text-[1.35rem] leading-[1.6]" />
            <div className="mt-6 max-w-[62ch] space-y-5 text-lg text-muted">
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p aria-hidden="true" className="mt-5 flex justify-end">
              <span className="h-0 w-0 animate-blink border-x-[7px] border-t-[9px] border-x-transparent border-t-accent" />
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="hud text-ink">{dict.principlesTitle}</h3>
          <ol className="mt-4">
            {dict.principles.map((principle, index) => (
              <li key={principle.title} className="flex gap-5 border-t-2 border-line py-6 last:border-b-2">
                <span className="grid h-9 w-9 shrink-0 place-items-center bg-accent text-sm font-bold text-accent-ink">
                  {index + 1}
                </span>
                <div>
                  <h4 className="text-xl font-bold">{principle.title}</h4>
                  <p className="mt-1.5 max-w-[56ch] text-lg text-muted">{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <h3 className="hud text-ink">{dict.toolbeltTitle}</h3>
          <dl className="mt-4">
            {dict.toolbelt.map((group) => (
              <div key={group.title} className="grid gap-3 border-t-2 border-line py-5 last:border-b-2 sm:grid-cols-[8rem_minmax(0,1fr)]">
                <dt className="hud pt-1.5 text-ink">{group.title}</dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="bg-raised px-2.5 py-1 font-mono text-sm leading-tight shadow-[0_-2px_0_0_var(--line-strong),0_2px_0_0_var(--line-strong),-2px_0_0_0_var(--line-strong),2px_0_0_0_var(--line-strong)]"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
