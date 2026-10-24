import { Fragment } from "react";
import { CubeIcon } from "@/components/ui/icons";

const ITEMS = [
  "Python",
  "FastAPI",
  "Go",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Flutter",
  "Next.js",
  "TimescaleDB",
  "Azure",
  "WebSocket",
  "Pandas",
  "TypeScript",
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden ? "true" : undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <li className="whitespace-nowrap font-mono text-sm uppercase tracking-widest text-muted">{item}</li>
          <li aria-hidden="true">
            <CubeIcon className="h-4 w-4 text-accent-text/60" />
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

/** Decorative ticker; the same technologies are listed in text in the About section. */
export function Marquee() {
  return (
    <div aria-hidden="true" className="overflow-hidden py-6">
      <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
