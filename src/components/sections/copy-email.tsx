"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

interface CopyEmailProps {
  email: string;
  label: string;
  copiedLabel: string;
}

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
        aria-label={label}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-mono text-sm text-muted transition-colors hover:border-accent-text/60 hover:text-ink"
      >
        {email}
        {copied ? (
          <CheckIcon className="h-4 w-4 text-accent-text" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
