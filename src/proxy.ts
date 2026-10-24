import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing without a visible /en prefix:
 *   /          -> rewritten to /en        (English is the default, served from the root)
 *   /id/...    -> passed through          (Indonesian lives under /id)
 *   /en/...    -> redirected to /...      (one canonical URL per page)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/id" || pathname.startsWith("/id/")) return NextResponse.next();

  const url = request.nextUrl.clone();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)"],
};
