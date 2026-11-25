export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

// Used when the browser asks for a language we don't have
export const defaultLocale: Locale = "en";

export const localeCookie = "NEXT_LOCALE";

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Picks the best supported locale from an Accept-Language header,
// e.g. "es-AR,es;q=0.9,en;q=0.8" -> "es".
export function negotiateLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.split("=")[1]) : 1 };
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.lang);
  return ranked.find(hasLocale) ?? defaultLocale;
}

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

// Remember a manual choice so the proxy stops following the browser language
export function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
