import { cn } from "@/lib/utils";

/** The site mark: pixel initials in a small window with a purple corner pip. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pixel relative grid h-9 w-9 shrink-0 place-items-center font-display text-xl font-extrabold leading-none",
        className,
      )}
    >
      IK
      <span className="absolute -right-2 -top-2 h-2 w-2 bg-accent" />
    </span>
  );
}
