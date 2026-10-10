// Blog registry. Each post lives in content/blog/<slug>/<lang>.mdx and exports
// `meta` ({ title, excerpt }); the language-independent data lives here.
// Newest first — the first post is the featured one.

export type PostTag = "nextjs" | "react" | "css" | "i18n" | "career" | "tooling";

export type PostEntry = {
  slug: string;
  date: string; // YYYY-MM-DD
  tags: PostTag[];
  // Generative cover: two colors and a big glyph, like the portfolio project previews
  cover: { palette: [string, string]; glyph: string };
};

export const posts: PostEntry[] = [
  {
    slug: "building-this-portfolio",
    date: "2026-09-28",
    tags: ["nextjs", "i18n", "css"],
    cover: { palette: ["#ff4d1c", "#ffb199"], glyph: "En." },
  },
  {
    slug: "mix-blend-mode-in-practice",
    date: "2026-08-14",
    tags: ["css"],
    cover: { palette: ["#2b2bff", "#c6c6ff"], glyph: "◑" },
  },
  {
    slug: "friday-deploy-survival-guide",
    date: "2026-06-02",
    tags: ["career", "tooling"],
    cover: { palette: ["#1f3d2b", "#b9d77a"], glyph: "☕" },
  },
  {
    slug: "command-palette-in-100-lines",
    date: "2026-03-19",
    tags: ["react", "tooling"],
    cover: { palette: ["#121110", "#f1ece2"], glyph: "⌘K" },
  },
];
