import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/posts";
import { locales, type Locale } from "@/dictionaries/config";
import { profile } from "@/lib/data";
import { absoluteUrl, blogIndexed, languageAlternates, siteUpdatedAt } from "@/lib/seo";

type EntryOptions = Omit<MetadataRoute.Sitemap[number], "url" | "alternates" | "images"> & {
  images?: (locale: Locale) => string[];
};

// One entry per page and language, each listing its translations (hreflang + x-default)
function entry(path: string, { images, ...options }: EntryOptions): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absoluteUrl(href)]),
  );
  return locales.map((locale) => ({
    url: absoluteUrl(`/${locale}${path}`),
    alternates: { languages },
    images: images?.(locale),
    ...options,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home = entry("", {
    lastModified: siteUpdatedAt,
    changeFrequency: "monthly",
    priority: 1,
    images: (locale) => [absoluteUrl(`/${locale}/opengraph-image`), absoluteUrl(profile.cardArt)],
  });
  if (!blogIndexed) return home;

  const blog = entry("/blog", {
    lastModified: posts[0]?.date ?? siteUpdatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
    images: (locale) => [absoluteUrl(`/${locale}/blog/opengraph-image`)],
  });
  const articles = posts.flatMap((post) =>
    entry(`/blog/${post.slug}`, {
      lastModified: post.date,
      changeFrequency: "yearly",
      priority: 0.6,
      images: (locale) => [absoluteUrl(`/${locale}/blog/${post.slug}/opengraph-image`)],
    }),
  );
  return [...home, ...blog, ...articles];
}
