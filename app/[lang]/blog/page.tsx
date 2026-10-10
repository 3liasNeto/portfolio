import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorAvatar } from "../../components/blog/author-avatar";
import { PostCover } from "../../components/blog/post-cover";
import { PostExplorer } from "../../components/blog/post-explorer";
import { profile } from "../../data";
import { hasLocale, htmlLang, locales } from "../../i18n";
import { countPosts, fill, getBlogDictionary } from "./dictionary";
import { formatDate, formatMonth } from "./format";
import { getAllPosts } from "./posts";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getBlogDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    // Test area for now: keep it out of search engines
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${lang}/blog`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}/blog`])),
      types: { "application/rss+xml": `/${lang}/blog/rss.xml` },
    },
  };
}

export default async function BlogIndex({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getBlogDictionary(lang);
  const posts = await getAllPosts(lang);
  const [featured] = posts;

  return (
    <main className="mx-auto max-w-[1400px] px-4 md:px-8">
      {/* ---------- Masthead ---------- */}
      <section className="pt-10 md:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-3 border-y-4 border-double border-ink py-2 font-mono text-[11px] tracking-widest uppercase">
          <span>
            {t.masthead.edition} Nº {String(posts.length).padStart(2, "0")} · {formatMonth(featured.date, lang)}
          </span>
          <span className="hidden sm:inline">{profile.location}</span>
          <span>{countPosts(t, posts.length)}</span>
        </div>
        <div className="grid gap-8 py-10 md:grid-cols-[1fr_minmax(0,22rem)] md:items-end">
          <h1 className="text-[22vw] leading-[0.8] font-black tracking-[-0.06em] uppercase md:text-[13vw] xl:text-[11rem]">
            {t.masthead.titleA}
            <br />
            <span className="font-serif font-normal tracking-[-0.03em] normal-case italic">
              {t.masthead.titleB.replace(".", "")}
              <span className="text-signal">.</span>
            </span>
          </h1>
          <p className="text-xl leading-snug md:pb-6">{t.masthead.intro}</p>
        </div>
      </section>

      {/* ---------- Featured ---------- */}
      <section className="border-t border-ink pt-10">
        <Link
          href={`/${lang}/blog/${featured.slug}`}
          className="group grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center"
        >
          <PostCover
            cover={featured.cover}
            number={featured.number}
            size="lg"
            className="aspect-[4/3] rounded-2xl transition-transform duration-700 group-hover:scale-[0.98] md:aspect-[5/4]"
          />
          <div>
            <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
              <span className="rounded-full bg-signal px-2.5 py-1 text-on-signal">{t.featured}</span>
              {featured.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-ink/20 px-2.5 py-1">
                  {t.tags[tag]}
                </span>
              ))}
            </p>
            <h2 className="mt-5 text-4xl leading-[0.95] font-extrabold tracking-[-0.04em] transition-colors group-hover:text-signal md:text-6xl">
              {featured.title}
            </h2>
            <p className="mt-5 font-serif text-2xl leading-snug text-muted italic">{featured.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <span className="flex items-center gap-3">
                <AuthorAvatar />
                <span className="font-mono text-xs uppercase">
                  <span className="block font-semibold">{profile.name}</span>
                  <span className="text-muted">
                    {formatDate(featured.date, lang)} · {fill(t.readingTime, featured.readingMinutes)}
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-3 font-mono text-xs tracking-wider uppercase">
                {t.readPost}
                <span className="grid size-11 place-items-center rounded-full border border-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal">
                  ↗
                </span>
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ---------- Archive + sidebar ---------- */}
      <section className="mt-24 grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-[-0.04em] md:text-5xl">
            {t.allPosts.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-serif font-normal italic">{t.allPosts.split(" ").at(-1)}</span>
          </h2>
          <PostExplorer
            lang={lang}
            tagLabels={t.tags}
            labels={{ search: t.search, allTags: t.allTags, empty: t.empty, count: t.postsCount }}
            posts={posts.map((post) => ({
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              tags: post.tags,
              number: post.number,
              cover: post.cover,
              dateLabel: formatDate(post.date, lang),
              monthLabel: formatMonth(post.date, lang),
              readingLabel: fill(t.readingTime, post.readingMinutes),
            }))}
          />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-night p-6 text-chalk">
            <p className="font-mono text-[11px] tracking-widest text-signal uppercase">{t.about.title}</p>
            <div className="mt-4 flex items-center gap-3">
              <AuthorAvatar className="size-14" />
              <p className="text-xl font-extrabold tracking-tight">{profile.name}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-chalk/70">{t.about.body}</p>
          </div>
          <a
            href={`/${lang}/blog/rss.xml`}
            className="group block overflow-hidden rounded-2xl border border-ink/80 bg-[#181715] font-mono text-sm text-chalk shadow-[6px_6px_0_var(--signal)]"
          >
            <span className="flex items-center gap-1.5 border-b border-chalk/10 px-3 py-2">
              <span className="size-2.5 rounded-full bg-signal" />
              <span className="size-2.5 rounded-full bg-chalk/30" />
              <span className="size-2.5 rounded-full bg-chalk/30" />
            </span>
            <span className="block px-4 py-4">
              <span className="text-signal">$</span> curl /{lang}/blog/rss.xml
              <span className="mt-2 block text-[#b9d77a] group-hover:underline">&gt; {t.rss} ↗</span>
            </span>
          </a>
        </aside>
      </section>
    </main>
  );
}
