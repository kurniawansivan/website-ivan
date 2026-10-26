import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { intlLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/ui/count-up";
import { containerClass } from "@/components/ui/section";

interface StatsProps {
  locale: Locale;
  dict: Dictionary["proof"];
  repos: number;
  languages: number;
  cases: number;
}

/** The status window: four totals, like a character sheet. */
export function Stats({ locale, dict, repos, languages, cases }: StatsProps) {
  const year = new Date().getFullYear();
  const stats = [
    { value: year - site.careerStartYear, suffix: "+", label: dict.years },
    { value: repos, suffix: "", label: dict.repos },
    { value: languages, suffix: "", label: dict.languages },
    { value: cases, suffix: "", label: dict.cases },
  ];

  return (
    <section aria-label={dict.title} className="py-4">
      <div className={containerClass}>
        <div className="pixel pixel-lift">
          <p className="hud flex items-center justify-between border-b-4 border-dashed border-line px-5 py-3">
            <span className="text-ink">{dict.title}</span>
            <span>{year}</span>
          </p>
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse gap-4 border-dashed border-line p-5 sm:p-7",
                  index % 2 === 1 && "border-l-4",
                  index >= 2 && "border-t-4 md:border-t-0",
                  index > 0 && "md:border-l-4",
                )}
              >
                <dt className="hud">{stat.label}</dt>
                <dd className="title-shadow-sm font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-none">
                  <CountUp value={stat.value} suffix={stat.suffix} locale={intlLocale[locale]} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
