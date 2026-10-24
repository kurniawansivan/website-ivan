import type { Dictionary } from "@/content/dictionary";
import { HexBadge } from "@/components/ui/hex-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <Section id="about" eyebrow={dict.eyebrow} title={dict.title}>
      <div className="grid gap-stack lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <div className="space-y-5 text-lg text-ink/85">
              {dict.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-stack">
            <h3 className="eyebrow">{dict.principlesTitle}</h3>
            <ol className="mt-5 space-y-5">
              {dict.principles.map((principle, index) => (
                <li key={principle.title} className="flex gap-4">
                  <HexBadge>{index + 1}</HexBadge>
                  <div>
                    <h4 className="font-display text-lg font-semibold">{principle.title}</h4>
                    <p className="mt-1 text-muted">{principle.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <h3 className="eyebrow">{dict.toolbeltTitle}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {dict.toolbelt.map((group) => (
              <section key={group.title} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <h4 className="font-display text-base font-semibold">{group.title}</h4>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-raised/60 px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
