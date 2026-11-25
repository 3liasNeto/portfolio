import { readFileSync } from "node:fs";
import { join } from "node:path";
import { compile } from "@mdx-js/mdx";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { describe, expect, it } from "vitest";
import { escapeXml, extractHeadings, readingMinutes } from "@/lib/blog/parse";
import { locales } from "@/dictionaries/config";
import { posts } from "@/content/blog/posts";

// The ids the site really renders: same plugins as next.config.ts
async function renderedHeadingIds(source: string) {
  const code = String(
    await compile(source, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] }),
  );
  return [...code.matchAll(/_components\.h[23], \{\s*id: "([^"]+)"/g)].map((m) => m[1]);
}

const tricky = [
  "export const meta = { title: \"t\", excerpt: \"e\" };",
  "",
  "## Três idiomas sem biblioteca",
  "",
  "## O `proxy.ts` decide",
  "",
  "## **Negrito** no título",
  "",
  "### Um [link](https://example.com) aqui",
  "",
  "## Título fechado ##",
  "",
  "~~~md",
  "## dentro de uma cerca, não é título",
  "~~~",
  "",
  "```ts",
  "## também não",
  "```",
  "",
  "## snake_case e números 2026",
  "",
  "## Repetido",
  "",
  "## Repetido",
  "",
].join("\n");

describe("extractHeadings", () => {
  it("produces the same ids as rehype-slug", async () => {
    const ids = extractHeadings(tricky).map((h) => h.id);
    expect(ids).toEqual(await renderedHeadingIds(tricky));
  });

  it("handles Windows line endings", async () => {
    const crlf = tricky.replace(/\n/g, "\r\n");
    const ids = extractHeadings(crlf).map((h) => h.id);
    expect(ids).toHaveLength(8);
    expect(ids).toEqual(await renderedHeadingIds(crlf));
  });

  it("matches rehype-slug on every real post", async () => {
    for (const { slug } of posts) {
      for (const lang of locales) {
        const text = readFileSync(join(process.cwd(), "content/blog", slug, `${lang}.mdx`), "utf8");
        const ids = extractHeadings(text).map((h) => h.id);
        expect(ids, `${slug}/${lang}`).toEqual(await renderedHeadingIds(text));
      }
    }
  });

  it("keeps readable text and the heading level", () => {
    const headings = extractHeadings(tricky);
    expect(headings[1]).toMatchObject({ text: "O proxy.ts decide", level: 2 });
    expect(headings[2].text).toBe("Negrito no título");
    expect(headings[3]).toMatchObject({ text: "Um link aqui", level: 3 });
    expect(headings[4].text).toBe("Título fechado");
  });
});

describe("readingMinutes", () => {
  it("never returns less than a minute and ignores the meta export", () => {
    expect(readingMinutes('export const meta = { title: "x" };\n\nOi.')).toBe(1);
  });

  it("counts about 200 words per minute", () => {
    expect(readingMinutes(Array(1000).fill("palavra").join(" "))).toBe(5);
  });
});

describe("escapeXml", () => {
  it("escapes the XML special characters", () => {
    expect(escapeXml(`a & b <c> "d"`)).toBe("a &amp; b &lt;c&gt; &quot;d&quot;");
  });
});
