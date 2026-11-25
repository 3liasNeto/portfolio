import type { Dictionary, Language } from "@/dictionaries/types";

// Where the 404 and error pages send the visitor back to. Those files get no
// params, so whether we're in the blog comes from the URL; the copy comes from
// the "status" section of the dictionary (via useDict).

export function statusContext(pathname: string, language: Language, t: Dictionary["status"]) {
  const inBlog = pathname.startsWith(`/${language}/blog`);
  return {
    t,
    // The blog is standalone, so its pages lead back to the blog, not the portfolio
    back: inBlog
      ? { href: `/${language}/blog`, label: t.blog }
      : { href: `/${language}`, label: t.home },
  };
}
