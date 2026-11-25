import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in every response
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Only this site may frame its pages (clickjacking protection)
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

// Blog posts are MDX files in content/blog, imported by the blog routes.
// Plugins are passed by name so they work with Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
