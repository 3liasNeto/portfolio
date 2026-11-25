import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";
import { htmlLang, locales } from "@/dictionaries/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], `${siteUrl}/${l}`]));
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
