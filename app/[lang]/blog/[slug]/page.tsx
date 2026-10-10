import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorAvatar } from "../../../components/blog/author-avatar";
import { Callout } from "../../../components/blog/callout";
import { CodeBlock } from "../../../components/blog/code-block";
import { PostCover } from "../../../components/blog/post-cover";
import { ReadingProgress } from "../../../components/blog/reading-progress";
import { ShareButtons } from "../../../components/blog/share-buttons";
import { TableOfContents } from "../../../components/blog/table-of-contents";
import { profile } from "../../../data";
import { hasLocale, htmlLang, locales } from "../../../i18n";
import { fill, getBlogDictionary } from "../dictionary";
import { formatDate } from "../format";
import { getPost, postSlugs, type PostSummary } from "../posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return postSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const data = await getPost(slug, lang);
  if (!data) return {};
  return {
    title: `${data.post.title} — Elias Neto`,
    description: data.post.excerpt,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}/blog/${slug}`])),
    },
  };
}

function PostCard({ post, lang, label }: { post: PostSummary; lang: string; label: string }) {
  return (
    <Link href={`/${lang}/blog/${post.slug}`} className="group block">
      <PostCover
        cover={post.cover}
        number={post.number}
        className="aspect-[16/9] rounded-xl transition-transform duration-500 group-hover:-rotate-1"
      />
      <p className="mt-4 font-mono text-[11px] tracking-widest text-muted uppercase">{label}</p>
      <p className="mt-1 text-2xl leading-tight font-extrabold tracking-tight transition-colors group-hover:text-signal">
        {post.title}
      </p>
    </Link>
  );
}

export default async function BlogPost({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const data = await getPost(slug, lang);
  if (!data) notFound();
  const { post, Content, headings, newer, older, related } = data;
  const t = getBlogDictionary(lang);
  const shareLabels = { share: t.share, copyLink: t.copyLink, linkCopied: t.linkCopied };

  return (
    <main>
      <ReadingProgress target="#article" />

      <header className="mx-auto max-w-[1400px] px-4 pt-10 md:px-8 md:pt-14">
        <Link
          href={`/${lang}/blog`}
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase hover:text-signal"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> {t.back}
        </Link>
        <p className="mt-8 flex flex-wrap gap-2 font-mono text-[11px] tracking-widest uppercase">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-ink/20 px-2.5 py-1">
              {t.tags[tag]}
            </span>
          ))}
        </p>
        <h1 className="mt-5 max-w-5xl text-5xl leading-[0.92] font-extrabold tracking-[-0.045em] md:text-7xl lg:text-8xl">
          {post.title}
        </h1>
        <p className="mt-6 max-w-3xl font-serif text-2xl leading-snug text-muted italic md:text-3xl">
          {post.excerpt}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-ink py-4">
          <span className="flex items-center gap-3">
            <AuthorAvatar />
            <span className="font-mono text-xs uppercase">
              <span className="block font-semibold">{profile.name}</span>
              <span className="text-muted">
                {t.published} {formatDate(post.date, lang)} · {fill(t.readingTime, post.readingMinutes)}
              </span>
            </span>
          </span>
          <ShareButtons title={post.title} labels={shareLabels} />
        </div>
        <PostCover
          cover={post.cover}
          number={post.number}
          size="lg"
          className="mt-10 aspect-[16/9] rounded-2xl md:aspect-[21/8]"
        />
      </header>

      <div className="mx-auto mt-16 grid max-w-[1400px] grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-20">
        <article id="article" className="prose mx-auto w-full min-w-0 max-w-[44rem] lg:mx-0 lg:ml-auto">
          <Content
            components={{
              pre: (props) => <CodeBlock {...props} labels={{ copy: t.copyCode, copied: t.codeCopied }} />,
              Callout: ({ type = "tip", children }: { type?: "tip" | "warning"; children?: React.ReactNode }) => (
                <Callout type={type} label={t.callout[type]}>
                  {children}
                </Callout>
              ),
            }}
          />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents headings={headings} title={t.toc} />
          </div>
        </aside>
      </div>

      <footer className="mx-auto mt-20 max-w-[1400px] px-4 md:px-8">
        <div className="mx-auto flex max-w-[44rem] items-center justify-between gap-4 border-y border-ink py-5 lg:mr-[calc(16rem+5rem)] lg:ml-auto">
          <span className="flex items-center gap-3">
            <AuthorAvatar />
            <span className="font-mono text-xs font-semibold uppercase">{profile.name}</span>
          </span>
          <ShareButtons title={post.title} labels={shareLabels} />
        </div>

        {(newer || older) && (
          <nav className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink bg-ink md:grid-cols-2">
            {[
              { post: newer, label: `← ${t.newer}`, align: "" },
              { post: older, label: `${t.older} →`, align: "md:text-right" },
            ].map(({ post: item, label, align }) =>
              item ? (
                <Link
                  key={label}
                  href={`/${lang}/blog/${item.slug}`}
                  className={`group bg-paper p-6 transition-colors hover:bg-signal md:p-8 ${align}`}
                >
                  <span className="font-mono text-[11px] tracking-widest text-muted uppercase group-hover:text-on-signal">
                    {label}
                  </span>
                  <span className="mt-2 block text-2xl leading-tight font-extrabold tracking-tight group-hover:text-on-signal">
                    {item.title}
                  </span>
                </Link>
              ) : (
                <span key={label} className="hidden bg-paper md:block" />
              ),
            )}
          </nav>
        )}

        <section className="mt-20">
          <h2 className="mb-8 text-4xl font-extrabold tracking-[-0.04em] md:text-5xl">
            <span className="font-serif font-normal italic">{t.related}</span>
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {related.map((item) => (
              <PostCard
                key={item.slug}
                post={item}
                lang={lang}
                label={`${formatDate(item.date, lang)} · ${fill(t.readingTime, item.readingMinutes)}`}
              />
            ))}
          </div>
        </section>
      </footer>
    </main>
  );
}
