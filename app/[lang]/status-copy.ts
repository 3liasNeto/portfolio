import { defaultLocale, hasLocale, type Locale } from "../i18n";

// Copy for the 404 and error pages. Those files get no params, so they read the
// locale (and whether we're in the blog) from the URL.

const copy = {
  pt: {
    notFoundTitle: "Página não encontrada",
    notFoundBody: "O endereço não existe ou mudou de lugar. Volte para um caminho conhecido:",
    errorTitle: "Algo deu errado",
    errorBody: "Um erro inesperado aconteceu ao carregar esta página.",
    retry: "Tentar de novo",
    home: "Ir para o início",
    blog: "Ir para o blog",
  },
  en: {
    notFoundTitle: "Page not found",
    notFoundBody: "This address doesn't exist or has moved. Head back to a known path:",
    errorTitle: "Something went wrong",
    errorBody: "An unexpected error happened while loading this page.",
    retry: "Try again",
    home: "Go to the home page",
    blog: "Go to the blog",
  },
  es: {
    notFoundTitle: "Página no encontrada",
    notFoundBody: "La dirección no existe o cambió de lugar. Vuelve a un camino conocido:",
    errorTitle: "Algo salió mal",
    errorBody: "Ocurrió un error inesperado al cargar esta página.",
    retry: "Intentar de nuevo",
    home: "Ir al inicio",
    blog: "Ir al blog",
  },
} satisfies Record<Locale, Record<string, string>>;

export function statusContext(pathname: string) {
  const segment = pathname.split("/")[1] ?? "";
  const lang = hasLocale(segment) ? segment : defaultLocale;
  const inBlog = pathname.startsWith(`/${lang}/blog`);
  return {
    t: copy[lang],
    // The blog is standalone, so its pages lead back to the blog, not the portfolio
    back: inBlog
      ? { href: `/${lang}/blog`, label: copy[lang].blog }
      : { href: `/${lang}`, label: copy[lang].home },
  };
}
