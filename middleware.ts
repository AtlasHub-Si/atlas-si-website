import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/*
 * Every page lives under /[locale]; requests without a locale prefix are
 * redirected to the best matching locale (Cookie → Accept-Language → pt).
 * The /download API route and files with an extension are excluded.
 */

const COOKIE_NAME = "ATLASBOT_LOCALE";

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie && locales.includes(cookie as (typeof locales)[number])) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase() ?? "")
    .map((tag) => tag.split("-")[0]);
  for (const tag of preferred) {
    if (locales.includes(tag as (typeof locales)[number])) return tag;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) {
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, pathname.split("/")[1], {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  if (hash) url.hash = hash;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|download|api|.*\\..*).*)"],
};
