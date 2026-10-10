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

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

// Remember a manual choice so the proxy stops following the browser language
export function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
