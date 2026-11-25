import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { profile } from "@/lib/data";

// Web app manifest: name, colors and icons used when the site is installed or pinned
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Full Stack Developer`,
    short_name: profile.name,
    description: "Portfolio of Elias Neto: mobile apps, web dashboards and APIs with TypeScript.",
    start_url: "/",
    display: "browser",
    background_color: brand.paper,
    theme_color: brand.paper,
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
