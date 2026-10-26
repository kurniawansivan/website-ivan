import Link from "next/link";
import { getDictionary } from "@/content/dictionary";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { PixelArrow } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/section";

/** not-found has no access to route params, so the message is shown in both languages. */
export default function NotFound() {
  const en = getDictionary("en").notFound;
  const id = getDictionary("id").notFound;

  return (
    <PageShell locale="en" path="/">
      <section className="flex min-h-svh items-center pb-stack pt-page">
        <div className={containerClass}>
          <p className="hud text-ink">Game over</p>
          <p className="title-shadow mt-6 font-display text-[clamp(6rem,22vw,16rem)] font-bold leading-[0.9]">{en.code}</p>
          <h1 className="mt-8 font-heading text-[clamp(1.8rem,4.6vw,3.25rem)] font-bold leading-tight">{en.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{en.body}</p>
          <p className="mt-2 max-w-xl text-muted" lang="id">
            {id.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href="/">
              <PixelArrow className="h-3 w-3" />
              {en.home}
            </ButtonLink>
            <Link href="/id" lang="id" className="hud inline-flex min-h-11 items-center gap-2 text-ink hover:text-accent-text">
              <PixelArrow className="h-3 w-3" />
              {id.home}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
