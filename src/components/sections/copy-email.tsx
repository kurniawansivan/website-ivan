"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon, PixelArrow } from "@/components/ui/icons";

interface CopyEmailProps {
  email: string;
  label: string;
  copiedLabel: string;
}

/** A menu row that copies the address. Same look as the link rows around it. */
export function CopyEmail({ email, label, copiedLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the address stays visible and selectable.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="group relative flex min-h-14 w-full items-center gap-4 border-b-2 border-dashed border-line py-3 pl-12 pr-4 text-left transition-colors hover:bg-raised focus-visible:bg-raised"
      >
        <PixelArrow className="absolute left-4 hidden h-3 w-3 animate-nudge text-accent-text group-hover:block group-focus-visible:block" />
        <span className="text-sm font-bold uppercase tracking-wide">{copied ? copiedLabel : label}</span>
        <span className="ml-auto text-muted">
          {copied ? <CheckIcon className="h-4 w-4 text-accent-text" /> : <CopyIcon className="h-4 w-4" />}
        </span>
      </button>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
