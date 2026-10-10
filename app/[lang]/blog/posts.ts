import { readFile } from "node:fs/promises";
import { join } from "node:path";
import GithubSlugger from "github-slugger";
import type { MDXContent } from "mdx/types";
import { posts, type PostEntry } from "@/content/blog/posts";
import type { Locale } from "../../i18n";

export type PostMeta = { title: string; excerpt: string };
export type Heading = { id: string; text: string; level: 2 | 3 };

export type PostSummary = PostEntry &
  PostMeta & {
    number: number; // 1 = oldest, used as "Nº" on covers
    readingMinutes: number;
  };

const wordsPerMinute = 200;

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

function readingMinutes(source: string) {
  const words = source.replace(/export const meta[\s\S]*?};/, "").split(/\s+/).filter(Boolean);
  return Math.max(1, Math.round(words.length / wordsPerMinute));
}

// ## and ### headings, with the same ids rehype-slug gives them
function extractHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of source.split("\n")) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const match = line.match(/^(##|###)\s+(.+)$/);
    if (!match) continue;
    const text = match[2].replace(/`/g, "").trim();
    headings.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
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
