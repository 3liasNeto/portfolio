"use client";

import Link from "next/link";
import { localeCookie, locales, type Locale } from "../i18n";

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <ul
      aria-label={label}
      className="flex items-center rounded-full border border-ink/15 p-0.5 font-mono text-[11px] tracking-wider uppercase"
    >
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            href={`/${locale}`}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            onClick={() => {
              // Remember the manual choice so the proxy stops following the browser
              document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={`block rounded-full px-2 py-1.5 transition-colors sm:px-2.5 ${
              locale === current ? "bg-ink text-paper" : "hover:text-signal"
            }`}
          >
            {locale}
          </Link>
        </li>
      ))}
    </ul>
  );
}
