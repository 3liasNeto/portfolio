import { profile } from "../../data";
import { defaultLocale, hasLocale, locales } from "../../i18n";
import { countPosts, getBlogDictionary } from "./dictionary";
import { blogOgImage, ogSize } from "./og-card";
import { postSlugs } from "./posts";

export const alt = "Blog";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function BlogOpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getBlogDictionary(hasLocale(lang) ? lang : defaultLocale);
  return blogOgImage({
    kicker: countPosts(t, postSlugs().length),
    title: t.masthead.titleA.toUpperCase(),
    titleItalic: t.masthead.titleB,
    footer: profile.name,
  });
}
