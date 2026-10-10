"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostTag } from "@/content/blog/posts";
import { PostCover } from "./post-cover";

export type ExplorerPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: PostTag[];
  number: number;
  cover: { palette: [string, string]; glyph: string };
  dateLabel: string;
  monthLabel: string;
  readingLabel: string;
};

// Searchable, tag-filterable archive, grouped by month
export function PostExplorer({
  lang,
  posts,
  tagLabels,
  labels,
}: {
  lang: string;
  posts: ExplorerPost[];
  tagLabels: Record<PostTag, string>;
  labels: { search: string; allTags: string; empty: string; count: { one: string; other: string } };
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<PostTag | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<PostTag, number>();
    for (const post of posts) for (const t of post.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()];
  }, [posts]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (post) =>
        (!tag || post.tags.includes(tag)) &&
        (!q || `${post.title} ${post.excerpt}`.toLowerCase().includes(q)),
    );
  }, [posts, query, tag]);

  const groups = useMemo(() => {
    const map = new Map<string, ExplorerPost[]>();
    for (const post of results) map.set(post.monthLabel, [...(map.get(post.monthLabel) ?? []), post]);
    return [...map.entries()];
  }, [results]);

  const count = (results.length === 1 ? labels.count.one : labels.count.other).replace(
    "{n}",
    String(results.length),
  );
  const chip = (selected: boolean) =>
    `rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors ${
      selected ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-signal hover:text-signal"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-ink pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group">
          <button type="button" aria-pressed={!tag} onClick={() => setTag(null)} className={chip(!tag)}>
            {labels.allTags} <span className="opacity-50">{posts.length}</span>
          </button>
          {tags.map(([t, n]) => (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(tag === t ? null : t)}
              className={chip(tag === t)}
            >
              {tagLabels[t]} <span className="opacity-50">{n}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 font-mono text-sm focus-within:border-signal md:w-72">
          <span aria-hidden className="text-signal">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            aria-label={labels.search}
            className="w-full bg-transparent outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-[11px] tracking-widest text-muted uppercase">
        {count}
      </p>

      {groups.length === 0 && <p className="py-16 text-center text-muted">{labels.empty}</p>}

      {groups.map(([month, items]) => (
        <section key={month} className="mt-8">
          <h3 className="mb-2 font-mono text-[11px] tracking-[0.2em] text-signal uppercase">{month}</h3>
          <ul className="border-t border-ink/15">
            {items.map((post) => (
              <li key={post.slug} className="border-b border-ink/15">
                <Link
                  href={`/${lang}/blog/${post.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 md:grid-cols-[8rem_1fr_auto]"
                >
                  <span className="hidden font-mono text-xs text-muted md:block">{post.dateLabel}</span>
                  <span className="min-w-0">
                    <span className="block text-2xl leading-tight font-extrabold tracking-tight transition-colors group-hover:text-signal md:text-3xl">
                      {post.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-muted">{post.excerpt}</span>
                    <span className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted uppercase">
                      <span className="md:hidden">{post.dateLabel} ·</span>
                      {post.readingLabel}
                      {post.tags.map((t) => (
                        <span key={t} className="rounded-full border border-line px-2 py-0.5 text-ink">
                          {tagLabels[t]}
                        </span>
                      ))}
                    </span>
                  </span>
                  <PostCover
                    cover={post.cover}
                    number={post.number}
                    size="sm"
                    className="size-24 shrink-0 rounded-xl transition-transform duration-500 group-hover:-rotate-3 md:size-28"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
