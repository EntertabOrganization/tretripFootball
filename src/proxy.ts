import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_PATHS = ["/login", "/register"];
const PROTECTED_PATHS = ["/profile", "/dashboard"];

function getLocaleFromPathname(pathname: string) {
  const segment = pathname.split("/")[1];
  return routing.locales.includes(segment as (typeof routing.locales)[number])
    ? segment
    : routing.defaultLocale;
}

function getLocalizedPathname(pathname: string) {
  const segments = pathname.split("/");
  const locale = getLocaleFromPathname(pathname);

  if (segments[1] === locale) {
    return `/${segments.slice(2).join("/")}`.replace(/\/$/, "") || "/";
  }

  return pathname;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPathname(pathname);
  const localizedPathname = getLocalizedPathname(pathname);
  const hasSession = Boolean(request.cookies.get("tretrip_session")?.value);

  if (PROTECTED_PATHS.some((path) => localizedPathname.startsWith(path)) && !hasSession) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (PUBLIC_PATHS.includes(localizedPathname) && hasSession) {
    return NextResponse.redirect(new URL(`/${locale}/profile`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
