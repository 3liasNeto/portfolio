import { htmlLang, locales } from "@/dictionaries/config";
import { siteUrl } from "@/lib/data";

// The blog is still a test: it stays out of search engines and the sitemap until
// this is true (flipping it updates the blog's robots meta and the sitemap together).
export const blogIndexed = false;

// Last meaningful content change, sent to crawlers as <lastmod>. Bump it when the
// portfolio content changes (a build-time date would make every deploy look "new").
export const siteUpdatedAt = "2026-11-25";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

// hreflang alternates for a path that exists in every locale ("" = home, "/blog", …).
// x-default points at "/", which redirects to the visitor's language.
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}${path}`])),
    "x-default": `/${path.replace(/^\//, "")}`,
  };
}

// Robots meta for indexable pages: allow large image previews and full snippets
export const indexable = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
} as const;

export const notIndexable = { index: false, follow: false } as const;
