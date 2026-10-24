import type { Dictionary } from "@/content/dictionary";
import { CheckIcon } from "@/components/ui/icons";
import { GlowCard } from "@/components/ui/glow-card";
import { HexBadge } from "@/components/ui/hex-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function Services({ dict }: { dict: Dictionary["services"] }) {
  return (
    <Section id="services" eyebrow={dict.eyebrow} title={dict.title} intro={dict.intro}>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dict.items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.08} className="h-full">
              <GlowCard className="h-full rounded-2xl">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                  <HexBadge>{String(index + 1).padStart(2, "0")}</HexBadge>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted">{item.body}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-20">
        <Reveal>
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">{dict.processTitle}</h3>
        </Reveal>
        <ol className="relative mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-line-strong md:block"
          />
          {dict.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 0.08}>
                <HexBadge>{String(index + 1).padStart(2, "0")}</HexBadge>
                <h4 className="mt-4 font-display text-lg font-semibold">{step.title}</h4>
                <p className="mt-1.5 text-sm text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
