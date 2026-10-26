# Ivan Kurniawan Sentosa: personal website

Next.js (App Router) + Tailwind CSS v4 + Motion. Bilingual (EN default, ID under `/id`), statically generated, ready for Vercel.

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm typecheck
```

## Deploy on Vercel

1. Push this folder to a Git repository and import it in Vercel. No build settings are needed.
2. Set `NEXT_PUBLIC_SITE_URL` to the final domain (for example `https://ivankurniawan.dev`). It feeds canonical URLs, hreflang, the sitemap and Open Graph metadata. If it is unset, the site falls back to `VERCEL_PROJECT_PRODUCTION_URL`.
3. Optional: set `GITHUB_TOKEN` (read-only, no scopes) to raise the GitHub API rate limit for the live activity feed. Without it the feed falls back to a built-in snapshot if the API is rate limited.
4. After the first deploy, add the domain to Google Search Console and submit `/sitemap.xml`.

## Where to edit content

| What | File |
| --- | --- |
| Name, email, links, location, availability flag | `src/content/site.ts` |
| All UI copy in English and Indonesian (hero, services, about, experience, contact) | `src/content/dictionary.ts` |
| Projects and case studies (both languages) | `src/content/projects.ts` |
| Colors, fonts, glow and motion tokens | `src/app/globals.css` |

Add a project by appending an entry to `projects` in `src/content/projects.ts`. Its page, sitemap entry, hreflang tags and structured data are generated automatically.

## How routing works

`src/proxy.ts` serves English from `/` (rewritten to `/en` internally), Indonesian from `/id`, and redirects `/en/...` to `/...` so every page has exactly one canonical URL. Each page declares `hreflang` alternates, and the language switch links to the same page in the other locale.

## SEO checklist (already wired)

- Server-rendered semantic HTML, one `h1` per page, skip link, landmarks.
- Per-page `<title>`, description, canonical, Open Graph and Twitter metadata (`src/lib/seo.ts`).
- `sitemap.xml` and `robots.txt` generated from content, with hreflang alternates.
- JSON-LD: `Person`, `WebSite`, `BreadcrumbList` and per-project `CreativeWork` (`src/lib/schema.ts`).
- Generated Open Graph image (`src/app/opengraph-image.tsx`).
- Fonts via `next/font` (self-hosted, no layout shift); animation uses transform and opacity only and honours `prefers-reduced-motion`.

## Design notes

The visual language is a SNES-era JRPG menu: 4px pixel-notched windows (drawn with box-shadows, so layout never shifts) in a purple / blue / white palette.

**Readability rules**

- Pixel type (Pixelify Sans) is only for big display moments, 40px and up: the hero name, section titles, big numerals, the 404.
- Everything readable is Instrument Sans (body 18px / 1.7, headings 700, labels 600 uppercase) or IBM Plex Mono (hashes, stack, never below 12px).
- Reading column is capped near 60-64 characters. On wide screens each section pins its title in a left column while the content scrolls on the right; on narrow screens it stacks.
- One window per section at most. Lists inside use plain hairlines instead of nested boxes.

| Section | Game metaphor |
| --- | --- |
| Hero | Title screen: letters drop in; the table of production builds is the quest board |
| Stats | Status window |
| Work | Quest log. On a mouse device a menu cursor, the stack line and a preview plate appear on hover; on touch the illustration is inline |
| Services | Skill window, then a path whose steps light up as you scroll |
| About | Dialogue box (typewriter), then principles and tools as plain lists |
| Experience | Save points along a path, each citing its parent hash |
| Contact | "Continue?" choice menu |

**Scroll motion** (all of it is skipped under `prefers-reduced-motion`): a two-layer parallax star field, a pixel explorer that walks between stage markers on wide screens, sticky section titles, a scroll-filled path in Services and Experience, and staggered quest rows.

Two themes share the same tokens (`src/app/globals.css`): **Day** (white windows, navy ink, purple accent) and **Night** (deep indigo, RPG-blue windows, white ink, lavender accent). The theme follows the OS preference until the visitor toggles it.
