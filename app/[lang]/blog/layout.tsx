import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "../../components/language-switcher";
import { SmoothScroll } from "../../components/smooth-scroll";
import { ThemeSwitch } from "../../components/blog/theme-switch";
import { Toaster } from "../../components/toast";
import { hasLocale } from "../../i18n";
import { getDictionary } from "../dictionaries";
import { getBlogDictionary } from "./dictionary";

// The blog is a standalone test: it doesn't link to the portfolio (and vice versa)
export default async function BlogLayout({ children, params }: LayoutProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getBlogDictionary(lang);
  const site = getDictionary(lang);

  return (
    <div id="top" className="flex min-h-svh flex-1 flex-col">
      <SmoothScroll />
      <Toaster />
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link href={`/${lang}/blog`} className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold tracking-tighter">
              E<span className="font-serif font-normal italic">n</span>
              <span className="text-signal">.</span>
            </span>
            <span className="font-serif text-2xl italic">blog</span>
            <span className="rounded-full border border-signal px-2 py-0.5 font-mono text-[10px] tracking-widest text-signal uppercase">
              {t.testBadge}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={`/${lang}/blog/rss.xml`}
              className="hidden rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors hover:border-signal hover:text-signal sm:block"
            >
              RSS
            </a>
            <LanguageSwitcher current={lang} label={site.nav.language} />
            <ThemeSwitch labels={site.theme} />
          </div>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="mt-24 border-t border-ink">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between md:px-8">
          <p className="text-[12vw] leading-[0.8] font-black tracking-[-0.06em] uppercase md:text-[7vw]">
            {t.masthead.titleA}{" "}
            <span className="font-serif font-normal tracking-[-0.03em] normal-case italic">
              {t.masthead.titleB}
            </span>
          </p>
          <div className="flex flex-col gap-2 font-mono text-[11px] tracking-wider uppercase md:items-end">
            <a href={`/${lang}/blog/rss.xml`} className="hover:text-signal">
              {t.rss} ↗
            </a>
            <a href="#top" className="hover:text-signal">
              {t.backToTop}
            </a>
            <span className="text-muted">© {new Date().getFullYear()} Elias Neto</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
