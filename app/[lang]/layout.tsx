import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { themeScript } from "../theme";
import { profile, siteUrl, stack } from "../data";
import { indexable, languageAlternates } from "../seo";
import { hasLocale, htmlLang, locales } from "../i18n";
import { getDictionary } from "./dictionaries";
import "../globals.css";

const sans = Inter_Tight({
  variable: "--font-sans-display",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  // Only the italic is used (em, drop cap, quotes); one less font file to preload
  style: ["italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-display",
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    keywords: [profile.name, dict.hero.role, profile.location, ...stack],
    category: "technology",
    robots: indexable,
    alternates: {
      canonical: `/${lang}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "profile",
      url: `/${lang}`,
      siteName: profile.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: htmlLang[lang].replace("-", "_"),
      alternateLocale: locales.filter((l) => l !== lang).map((l) => htmlLang[l].replace("-", "_")),
      firstName: "Elias",
      lastName: "Neto",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    // Search Console / Bing ownership checks, set per deploy (see README)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined,
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

// Browser UI color follows the OS theme (the in-page toggle can't change this meta)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1ece2" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0d" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={htmlLang[lang]}
      // The theme script sets data-theme before React hydrates
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* The site has its own light/dark themes: ask dark-mode extensions not to repaint it */}
        <meta name="darkreader-lock" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
