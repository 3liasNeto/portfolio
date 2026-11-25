import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { DictionaryProvider } from "@/hooks/use-dict";
import { ThemeProvider } from "@/hooks/use-theme";
import { motionScript } from "@/lib/motion";
import { siteUrl } from "@/lib/data";
import { hasLocale, htmlLang, locales } from "@/dictionaries/config";
import { getDictionary } from "@/dictionaries/get-dictionary";
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
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: "Elias Neto",
      title: dict.meta.title,
      description: dict.meta.description,
      locale: htmlLang[lang].replace("-", "_"),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={htmlLang[lang]}
      // next-themes sets data-theme before React hydrates
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        {/* The site has its own light/dark themes: ask dark-mode extensions not to repaint it */}
        <meta name="darkreader-lock" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <DictionaryProvider dictionary={dictionary} language={lang}>
            {children}
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
