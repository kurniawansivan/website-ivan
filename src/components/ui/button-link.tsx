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

/** Chunky pixel button. The look lives in `.btn` (globals.css); this only picks the variant. */
export function ButtonLink({ href, variant = "primary", external, className, children, ...rest }: ButtonLinkProps) {
  const classes = cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className);

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
