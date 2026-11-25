import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import en from "@/dictionaries/data/en.json";
import es from "@/dictionaries/data/es.json";
import pt from "@/dictionaries/data/pt.json";
import { locales } from "@/dictionaries/config";
import type { Dictionary } from "@/dictionaries/types";
import { posts } from "@/content/blog/posts";

// Read straight from the JSON: get-dictionary is server-only
const dictionaries: Record<(typeof locales)[number], Dictionary> = { pt, en, es };

const source = (slug: string, lang: string) =>
  join(process.cwd(), "content/blog", slug, `${lang}.mdx`);

describe("blog content", () => {
  it("has a file for every post in every language, with title and excerpt", () => {
    for (const { slug } of posts) {
      for (const lang of locales) {
        const file = source(slug, lang);
        expect(existsSync(file), file).toBe(true);
        const text = readFileSync(file, "utf8");
        expect(text, file).toMatch(/^export const meta = \{/);
        expect(text, `${file} title`).toMatch(/\btitle:\s*"[^"]+"/);
        expect(text, `${file} excerpt`).toMatch(/\bexcerpt:\s*"[^"]+"/);
      }
    }
  });

  it("lists posts newest first with valid, unique slugs and dates", () => {
    expect(posts.length).toBeGreaterThan(0);
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const { slug, date } of posts) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(date))).toBe(false);
    }
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("has a translated label for every tag", () => {
    for (const lang of locales) {
      const { tags } = dictionaries[lang].blog;
      for (const post of posts) for (const tag of post.tags) expect(tags[tag]).toBeTruthy();
    }
  });
});
