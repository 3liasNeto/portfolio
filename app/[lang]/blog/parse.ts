import GithubSlugger from "github-slugger";

// Pure helpers over a post's raw MDX source (no I/O), so they can be unit tested.

export type Heading = { id: string; text: string; level: 2 | 3 };

const wordsPerMinute = 200;

export function readingMinutes(source: string) {
  const words = source.replace(/export const meta[\s\S]*?};/, "").split(/\s+/).filter(Boolean);
  return Math.max(1, Math.round(words.length / wordsPerMinute));
}

// Plain text of an inline-markdown heading: [link](url) -> link, **bold** -> bold, `code` -> code
const plainText = (markdown: string) =>
  markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|\*|_)(\S(?:.*?\S)?)\1/g, "$2")
    .replace(/`/g, "")
    .trim();

// ## and ### headings, with the same ids rehype-slug gives them
// (kept in sync by tests/blog-parse.test.ts, which compiles real MDX)
export function extractHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let fence: string | null = null;
  for (const line of source.split(/\r?\n/)) {
    const marker = line.match(/^\s*(```|~~~)/)?.[1];
    if (marker && (!fence || marker === fence)) {
      fence = fence ? null : marker;
      continue;
    }
    if (fence) continue;
    // Optional closing hashes ("## Title ##") are not part of the text
    const match = line.match(/^(##|###)\s+(.+?)(?:\s+#+)?\s*$/);
    if (!match) continue;
    const text = plainText(match[2]);
    headings.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
}

// Escapes text for XML content and attributes (RSS feed)
export const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
