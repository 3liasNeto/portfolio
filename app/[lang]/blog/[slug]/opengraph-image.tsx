import { profile } from "@/lib/data";
import { defaultLocale, hasLocale } from "@/dictionaries/config";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { fill, formatDate } from "@/lib/blog/format";
import { blogOgImage, ogSize } from "@/lib/blog/og-card";
import { getPost, postSlugs } from "@/lib/blog/posts";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return postSlugs().map((slug) => ({ slug }));
}

export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = hasLocale(raw) ? raw : defaultLocale;
  const t = (await getDictionary(lang)).blog;
  const data = await getPost(slug, lang);
  if (!data) throw new Error(`Unknown post: ${slug}`);
  const { post } = data;
  return blogOgImage({
    kicker: `${formatDate(post.date, lang)} · ${fill(t.readingTime, post.readingMinutes)}`,
    title: post.title,
    footer: profile.name,
    accent: post.cover.palette,
  });
}
