import { profile } from "@/lib/data";
import { defaultLocale, hasLocale, locales } from "@/dictionaries/config";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { countPosts } from "@/lib/blog/format";
import { blogOgImage, ogSize } from "@/lib/blog/og-card";
import { postSlugs } from "@/lib/blog/posts";

export const alt = "Blog";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function BlogOpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = (await getDictionary(hasLocale(lang) ? lang : defaultLocale)).blog;
  return blogOgImage({
    kicker: countPosts(t, postSlugs().length),
    title: t.masthead.titleA.toUpperCase(),
    titleItalic: t.masthead.titleB,
    footer: profile.name,
  });
}
