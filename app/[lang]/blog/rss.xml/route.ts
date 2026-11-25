import { notFound } from "next/navigation";
import { siteUrl } from "@/lib/data";
import { hasLocale, htmlLang, locales } from "@/dictionaries/config";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { escapeXml as escape } from "@/lib/blog/parse";
import { getAllPosts } from "@/lib/blog/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}


export async function GET(_: Request, { params }: RouteContext<"/[lang]/blog/rss.xml">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).blog;
  const posts = await getAllPosts(lang);
  const home = `${siteUrl}/${lang}/blog`;

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${home}/${post.slug}</link>
      <guid>${home}/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.excerpt)}</description>
${post.tags.map((tag) => `      <category>${escape(t.tags[tag])}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(t.meta.title)}</title>
    <link>${home}</link>
    <description>${escape(t.meta.description)}</description>
    <language>${htmlLang[lang]}</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
