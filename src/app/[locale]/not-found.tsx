import Link from "next/link";
import { getDictionary } from "@/content/dictionary";
import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowLeft } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/section";

/** not-found has no access to route params, so the message is shown in both languages. */
export default function NotFound() {
  const en = getDictionary("en").notFound;
  const id = getDictionary("id").notFound;

  return (
    <PageShell locale="en" path="/">
      <section className="flex min-h-svh items-center pb-16 pt-28">
        <div className={containerClass}>
          <p className="font-mono text-sm text-accent-text">{en.code}</p>
          <h1 className="mt-3 text-5xl font-bold sm:text-7xl">{en.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{en.body}</p>
          <p className="mt-2 max-w-xl text-muted" lang="id">
            {id.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/">
              <ArrowLeft className="h-4 w-4" />
              {en.home}
            </ButtonLink>
            <Link
              href="/id"
              lang="id"
              className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-accent-text/60"
            >
              {id.home}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
