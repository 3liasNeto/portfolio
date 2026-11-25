import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { MDXContent } from "mdx/types";
import { posts, type PostEntry } from "@/content/blog/posts";
import type { Locale } from "@/dictionaries/config";
import { extractHeadings, readingMinutes } from "./parse";

export type PostMeta = { title: string; excerpt: string };
export type { Heading } from "./parse";

export type PostSummary = PostEntry &
  PostMeta & {
    number: number; // 1 = oldest, used as "Nº" on covers
    readingMinutes: number;
  };

async function readSource(slug: string, lang: Locale) {
  return readFile(join(process.cwd(), "content/blog", slug, `${lang}.mdx`), "utf8");
}

async function loadModule(slug: string, lang: Locale) {
  const mod = (await import(`@/content/blog/${slug}/${lang}.mdx`)) as {
    default: MDXContent;
    meta: PostMeta;
  };
  return mod;
}

export async function getAllPosts(lang: Locale): Promise<PostSummary[]> {
  return Promise.all(
    posts.map(async (entry, i) => {
      const [{ meta }, source] = await Promise.all([
        loadModule(entry.slug, lang),
        readSource(entry.slug, lang),
      ]);
      return {
        ...entry,
        ...meta,
        number: posts.length - i,
        readingMinutes: readingMinutes(source),
      };
    }),
  );
}

export async function getPost(slug: string, lang: Locale) {
  const index = posts.findIndex((entry) => entry.slug === slug);
  if (index === -1) return null;
  const [mod, source, all] = await Promise.all([
    loadModule(slug, lang),
    readSource(slug, lang),
    getAllPosts(lang),
  ]);
  return {
    post: all[index],
    Content: mod.default,
    headings: extractHeadings(source),
    // Newer / older neighbours in the list
    newer: all[index - 1] ?? null,
    older: all[index + 1] ?? null,
    related: all.filter((p) => p.slug !== slug).slice(0, 2),
  };
}

export const postSlugs = () => posts.map((entry) => entry.slug);
