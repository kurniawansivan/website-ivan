import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Every illustration is drawn on the same 640 x 400 canvas, so it scales cleanly into a card or a page. */
export const W = 640;
export const H = 400;

export type Tone = "accent" | "sky" | "amber" | "muted";

const textTone: Record<Tone | "ink", string> = {
  accent: "fill-accent-text",
  sky: "fill-sky",
  amber: "fill-amber",
  muted: "fill-muted",
  ink: "fill-ink",
};

const chipTone: Record<Tone, string> = {
  accent: "fill-accent/15 stroke-accent-text/40",
  sky: "fill-sky/15 stroke-sky/40",
  amber: "fill-amber/15 stroke-amber/40",
  muted: "fill-raised stroke-line-strong",
};

/** Soft tinted block: used for calendar blocks, bars and cells. */
export const softTone: Record<Tone, string> = {
  accent: "fill-accent/20 stroke-accent-text/50",
  sky: "fill-sky/20 stroke-sky/50",
  amber: "fill-amber/20 stroke-amber/50",
  muted: "fill-line-strong/40 stroke-line-strong",
};

export const solidTone: Record<Tone, string> = {
  accent: "fill-accent",
  sky: "fill-sky",
  amber: "fill-amber",
  muted: "fill-line-strong",
};

export const lineTone: Record<Tone, string> = {
  accent: "stroke-accent-text",
  sky: "stroke-sky",
  amber: "stroke-amber",
  muted: "stroke-line-strong",
};

export interface VisualProps {
  /** Thumbnail mode: decorative, and animations wait for hover. */
  compact?: boolean;
  /** Accessible description. Omitted for decorative thumbnails. */
  label?: string;
}

export function Canvas({ children, compact, label }: VisualProps & { children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("viz block h-auto w-full", compact && "viz-card")}
    >
      <defs>
        <linearGradient id="viz-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)" }} />
          <stop offset="1" style={{ stopColor: "var(--sky)" }} />
        </linearGradient>
        <linearGradient id="viz-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0.55 }} />
        </linearGradient>
        <pattern id="viz-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="fill-line-strong" />
        </pattern>
      </defs>
      <rect width={W} height={H} className="fill-surface" />
      <rect width={W} height={H} fill="url(#viz-dots)" opacity={0.45} />
      {children}
    </svg>
  );
}

interface TxtProps {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  tone?: Tone | "ink";
  anchor?: "start" | "middle" | "end";
  weight?: number;
  mono?: boolean;
}

export function Txt({ x, y, children, size = 10, tone = "muted", anchor = "start", weight, mono = true }: TxtProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      fontWeight={weight}
      className={cn(mono ? "font-mono" : "font-sans", textTone[tone])}
    >
      {children}
    </text>
  );
}

export function chipWidth(label: string, size = 9) {
  return Math.round(label.length * size * 0.62 + 14);
}

export function Chip({ x, y, label, tone = "muted", size = 9 }: { x: number; y: number; label: string; tone?: Tone; size?: number }) {
  const w = chipWidth(label, size);
  const h = size + 9;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={h / 2} className={chipTone[tone]} strokeWidth={1} />
      <text x={w / 2} y={h / 2 + size * 0.35} textAnchor="middle" fontSize={size} className={cn("font-mono", textTone[tone])}>
        {label}
      </text>
    </g>
  );
}

/** Placeholder text line, used where real copy would be invented. */
export function Skel({ x, y, w, h = 6, tone = "muted" }: { x: number; y: number; w: number; h?: number; tone?: "muted" | "accent" }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={tone === "accent" ? "fill-accent/40" : "fill-line-strong/70"} />;
}

interface WindowProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  children: ReactNode;
}

/** App window. Children use window-local coordinates; the title bar occupies the first 28 units. */
export function Window({ x, y, w, h, title, children }: WindowProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={12} className="fill-canvas stroke-line-strong" strokeWidth={1.2} />
      <path d={`M0.6 28H${w - 0.6}`} className="stroke-line" />
      {[14, 28, 42].map((cx) => (
        <circle key={cx} cx={cx} cy={14} r={3.5} className="fill-line-strong" />
      ))}
      <text x={58} y={18} fontSize={10} className="fill-muted font-mono">
        {title}
      </text>
      {children}
    </g>
  );
}

interface PhoneProps {
  x: number;
  y: number;
  w?: number;
  h?: number;
  rotate?: number;
  children: ReactNode;
}

/** Phone frame. Children use phone-local coordinates. */
export function Phone({ x, y, w = 160, h = 320, rotate = 0, children }: PhoneProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} ${w / 2} ${h / 2})`}>
      <rect width={w} height={h} rx={24} className="fill-canvas stroke-line-strong" strokeWidth={2} />
      <rect x={w / 2 - 26} y={9} width={52} height={6} rx={3} className="fill-line-strong" />
      {children}
    </g>
  );
}

export type IconName = "cloud" | "db" | "api" | "box" | "bolt";

const iconPath: Record<IconName, string> = {
  cloud: "M7 18a4 4 0 0 1-.6-7.95A6 6 0 0 1 18 9.5 4.2 4.2 0 0 1 17 18H7Z",
  db: "M12 4c4.4 0 8 1.1 8 2.5S16.4 9 12 9 4 7.9 4 6.5 7.6 4 12 4ZM20 6.5v11c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5v-11M20 12c0 1.4-3.6 2.5-8 2.5S4 13.4 4 12",
  api: "m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12",
  box: "M12 3 4 7.500v9L12 21l8-4.500v-9L12 3ZM4 7.500l8 4.500 8-4.500M12 12v9",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6l1-7Z",
};

export function Icon({ name, x, y, size = 16, tone = "accent" }: { name: IconName; x: number; y: number; size?: number; tone?: Tone }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
      <path d={iconPath[name]} fill="none" className={lineTone[tone]} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  icon?: IconName;
  tone?: Tone;
}

/** Labelled box for architecture diagrams. */
export function Node({ x, y, w, h, label, sub, icon, tone = "muted" }: NodeProps) {
  const pad = icon ? 34 : 12;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={h}
        rx={10}
        className={cn("fill-canvas", tone === "muted" ? "stroke-line-strong" : tone === "accent" ? "stroke-accent-text/60" : tone === "sky" ? "stroke-sky/60" : "stroke-amber/60")}
        strokeWidth={1.2}
      />
      {icon ? <Icon name={icon} x={11} y={h / 2 - 9} size={18} tone={tone === "muted" ? "accent" : tone} /> : null}
      <Txt x={pad} y={sub ? h / 2 - 2 : h / 2 + 4} size={11} tone="ink" mono={false} weight={600}>
        {label}
      </Txt>
      {sub ? (
        <Txt x={pad} y={h / 2 + 12} size={9}>
          {sub}
        </Txt>
      ) : null}
    </g>
  );
}

/** Dashed, flowing connector between diagram nodes. */
export function Flow({ d, tone = "accent", dim }: { d: string; tone?: Tone; dim?: boolean }) {
  return <path d={d} fill="none" className={cn("viz-flow", lineTone[tone], dim && "opacity-50")} strokeWidth={1.6} strokeLinecap="round" />;
}

/** Deterministic pseudo-random generator so server and client always draw the same picture. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
