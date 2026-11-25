import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, localeCookie, locales, negotiateLocale } from "./config";

// Sends URLs without a /{lang} prefix to the visitor's language
export function withDict(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) return;

  // A language the visitor picked by hand wins over the browser preference
  const saved = request.cookies.get(localeCookie)?.value;
  const locale =
    saved && hasLocale(saved)
      ? saved
      : negotiateLocale(request.headers.get("accept-language"));

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
