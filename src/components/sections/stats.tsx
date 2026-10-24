import type { Dictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { intlLocale, type Locale } from "@/lib/i18n";
import { CountUp } from "@/components/ui/count-up";
import { containerClass } from "@/components/ui/section";

interface StatsProps {
  locale: Locale;
  dict: Dictionary["proof"];
  repos: number;
  languages: number;
  cases: number;
}

export function Stats({ locale, dict, repos, languages, cases }: StatsProps) {
  const years = new Date().getFullYear() - site.careerStartYear;
  const stats = [
    { value: years, suffix: "+", label: dict.years },
    { value: repos, suffix: "", label: dict.repos },
    { value: languages, suffix: "", label: dict.languages },
    { value: cases, suffix: "", label: dict.cases },
  ];

  return (
    <section aria-label="Highlights" className="border-t border-line bg-surface/40">
      <div className={containerClass}>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="font-display text-4xl font-bold sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} locale={intlLocale[locale]} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
