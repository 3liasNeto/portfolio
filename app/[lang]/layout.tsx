import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { themeScript } from "../theme";
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
  style: ["normal", "italic"],
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
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
    },
  };
}

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
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
