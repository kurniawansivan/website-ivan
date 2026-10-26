import type { Dictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ProcessPath } from "./process-path";

/** One window holding four skills, then the path a project takes from first contact to hand-over. */
export function Services({ dict }: { dict: Dictionary["services"] }) {
  return (
    <Section id="services" stage={3} eyebrow={dict.eyebrow} title={dict.title} intro={dict.intro}>
      <Reveal>
        <div className="pixel pixel-lift">
          <ul className="grid sm:grid-cols-2">
            {dict.items.map((item, index) => (
              <li
                key={item.title}
                className={cn(
                  "border-line p-6 sm:p-8",
                  index > 0 && "border-t-2",
                  index === 1 && "sm:border-t-0",
                  index % 2 === 1 && "sm:border-l-2",
                )}
              >
                <p className="hud">
                  <span className="bg-accent px-2 py-1 text-accent-ink">Skill {String(index + 1).padStart(2, "0")}</span>
                </p>
                <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
                <ul className="mt-5 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-base">
                      <span aria-hidden="true" className="mt-[0.6rem] h-2 w-2 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-stack">
        <Reveal>
          <h3 className="text-3xl font-bold">{dict.processTitle}</h3>
        </Reveal>
        <div className="mt-8">
          <ProcessPath steps={dict.steps} />
        </div>
      </div>
    </Section>
  );
}
