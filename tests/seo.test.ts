import { describe, expect, it, vi } from "vitest";
import { siteUrl } from "@/app/data";
import { locales } from "@/app/i18n";
import manifest from "@/app/manifest";
import robots from "@/app/robots";
import { blogIndexed, languageAlternates } from "@/app/seo";
import sitemap from "@/app/sitemap";

describe("languageAlternates", () => {
  it("lists every locale plus x-default pointing at the language-negotiating root", () => {
    expect(languageAlternates()).toEqual({ "pt-BR": "/pt", en: "/en", es: "/es", "x-default": "/" });
    expect(languageAlternates("/blog")).toMatchObject({ en: "/en/blog", "x-default": "/blog" });
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("has the home page in every language, with absolute hreflang alternates", () => {
    for (const locale of locales) {
      const home = entries.find((e) => e.url === `${siteUrl}/${locale}`);
      expect(home, locale).toBeDefined();
      expect(home?.alternates?.languages).toMatchObject({
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/`,
      });
      expect(home?.images?.[0]).toBe(`${siteUrl}/${locale}/opengraph-image`);
    }
  });

  it("uses a fixed lastModified date, not the build time", () => {
    for (const e of entries) expect(e.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("includes blog URLs only when the blog is indexable", () => {
    const blogUrls = entries.filter((e) => e.url.includes("/blog"));
    if (blogIndexed) expect(blogUrls.length).toBeGreaterThan(0);
    else expect(blogUrls).toEqual([]);
  });

  it("has no duplicate URLs", () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("robots and manifest", () => {
  it("lets crawlers in and points them at the sitemap", () => {
    const r = robots();
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(r.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });

  it("describes the site with existing icons", () => {
    const m = manifest();
    expect(m.start_url).toBe("/");
    expect(m.icons?.map((i) => i.src)).toEqual(["/icon", "/apple-icon"]);
  });
});

describe("sitemap with the blog indexed", () => {
  it("adds the blog index and every post in every language", async () => {
    vi.resetModules();
    vi.doMock("@/app/seo", async (original) => ({
      ...(await original<typeof import("@/app/seo")>()),
      blogIndexed: true,
    }));
    const { default: indexedSitemap } = await import("@/app/sitemap");
    const { posts } = await import("@/content/blog/posts");
    const urls = indexedSitemap().map((e) => e.url);
    expect(urls).toContain(`${siteUrl}/es/blog`);
    for (const post of posts) expect(urls).toContain(`${siteUrl}/pt/blog/${post.slug}`);
    expect(urls).toHaveLength(locales.length * (1 + 1 + posts.length));
    vi.doUnmock("@/app/seo");
  });
});
