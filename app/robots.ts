import type { MetadataRoute } from "next";
import { siteUrl } from "./data";

export default function robots(): MetadataRoute.Robots {
  return {
    // Everything public is crawlable; pages that shouldn't be indexed (the test blog,
    // 404s) say so with a robots meta tag, which crawlers can only read if allowed in.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
