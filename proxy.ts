import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, localeCookie, locales, negotiateLocale } from "./app/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) return;

  // A language the visitor picked by hand wins over the browser preference
  const saved = request.cookies.get(localeCookie)?.value;
  const locale =
    saved && hasLocale(saved) ? saved : negotiateLocale(request.headers.get("accept-language"));

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, files with an extension and the generated app icons
  matcher: ["/((?!_next|api|icon|apple-icon|.*\\..*).*)"],
};
