import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "ghost";
  /** Opens in a new tab with a safe rel. Also used for mailto: links. */
  external?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-200 active:scale-[0.98]";

const variants = {
  primary: "bg-accent text-accent-ink glow-accent hover:brightness-110",
  ghost: "border border-line-strong text-ink hover:border-accent-text/60 hover:bg-accent/5",
} as const;

export function ButtonLink({ href, variant = "primary", external, className, children, ...rest }: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);

  if (external) {
    const isMail = href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
