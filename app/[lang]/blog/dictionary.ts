import type { PostTag } from "@/content/blog/posts";
import type { Locale } from "../../i18n";

const pt = {
  meta: {
    title: "Notas de código — Blog do Elias Neto",
    description:
      "Front-end, ferramentas e os bastidores de construir produtos digitais, por Elias Neto.",
  },
  testBadge: "beta",
  masthead: {
    edition: "Edição",
    titleA: "Notas",
    titleB: "de código.",
    intro:
      "Escrevo sobre front-end, ferramentas e os bastidores de construir produtos — com código de verdade e alguns deploys de sexta.",
  },
  featured: "Em destaque",
  readPost: "Ler post",
  allPosts: "Todos os posts",
  // "{n}" is replaced with the number
  postsCount: { one: "{n} post", other: "{n} posts" },
  readingTime: "{n} min de leitura",
  search: "Buscar posts…",
  allTags: "Tudo",
  empty: "Nenhum post encontrado.",
  topics: "Tópicos",
  about: {
    title: "Sobre o autor",
    body: "Elias Neto é desenvolvedor full-stack em São Paulo. Aqui ele anota o que aprende pelo caminho.",
  },
  rss: "Assinar via RSS",
  back: "Todos os posts",
  published: "Publicado em",
  toc: "Neste post",
  share: "Compartilhar",
  copyLink: "Copiar link",
  linkCopied: "Link copiado!",
  newer: "Mais recente",
  older: "Mais antigo",
  related: "Leia também",
  copyCode: "Copiar",
  codeCopied: "Código copiado!",
  callout: { tip: "Dica", warning: "Atenção" },
  backToTop: "Voltar ao topo ↑",
  tags: {
    nextjs: "Next.js",
    react: "React",
    css: "CSS",
    i18n: "i18n",
    career: "Carreira",
    tooling: "Ferramentas",
  } satisfies Record<PostTag, string>,
};

export type BlogDictionary = typeof pt;

const en: BlogDictionary = {
  meta: {
    title: "Notes on code — Elias Neto's blog",
    description: "Front-end, tooling and the behind the scenes of building digital products, by Elias Neto.",
  },
  testBadge: "beta",
  masthead: {
    edition: "Issue",
    titleA: "Notes",
    titleB: "on code.",
    intro:
      "I write about front-end, tooling and the behind the scenes of building products — with real code and a few Friday deploys.",
  },
  featured: "Featured",
  readPost: "Read post",
  allPosts: "All posts",
  postsCount: { one: "{n} post", other: "{n} posts" },
  readingTime: "{n} min read",
  search: "Search posts…",
  allTags: "All",
  empty: "No posts found.",
  topics: "Topics",
  about: {
    title: "About the author",
    body: "Elias Neto is a full-stack developer in São Paulo. This is where he writes down what he learns along the way.",
  },
  rss: "Subscribe via RSS",
  back: "All posts",
  published: "Published on",
  toc: "In this post",
  share: "Share",
  copyLink: "Copy link",
  linkCopied: "Link copied!",
  newer: "Newer",
  older: "Older",
  related: "Read next",
  copyCode: "Copy",
  codeCopied: "Code copied!",
  callout: { tip: "Tip", warning: "Heads up" },
  backToTop: "Back to top ↑",
  tags: {
    nextjs: "Next.js",
    react: "React",
    css: "CSS",
    i18n: "i18n",
    career: "Career",
    tooling: "Tooling",
  },
};

const es: BlogDictionary = {
  meta: {
    title: "Notas de código — Blog de Elias Neto",
    description:
      "Front-end, herramientas y los bastidores de construir productos digitales, por Elias Neto.",
  },
  testBadge: "beta",
  masthead: {
    edition: "Edición",
    titleA: "Notas",
    titleB: "de código.",
    intro:
      "Escribo sobre front-end, herramientas y los bastidores de construir productos — con código de verdad y algunos deploys de viernes.",
  },
  featured: "Destacado",
  readPost: "Leer post",
  allPosts: "Todos los posts",
  postsCount: { one: "{n} post", other: "{n} posts" },
  readingTime: "{n} min de lectura",
  search: "Buscar posts…",
  allTags: "Todo",
  empty: "No se encontraron posts.",
  topics: "Temas",
  about: {
    title: "Sobre el autor",
    body: "Elias Neto es desarrollador full-stack en São Paulo. Aquí anota lo que aprende por el camino.",
  },
  rss: "Suscribirse vía RSS",
  back: "Todos los posts",
  published: "Publicado el",
  toc: "En este post",
  share: "Compartir",
  copyLink: "Copiar enlace",
  linkCopied: "¡Enlace copiado!",
  newer: "Más reciente",
  older: "Más antiguo",
  related: "Lee también",
  copyCode: "Copiar",
  codeCopied: "¡Código copiado!",
  callout: { tip: "Consejo", warning: "Atención" },
  backToTop: "Volver arriba ↑",
  tags: {
    nextjs: "Next.js",
    react: "React",
    css: "CSS",
    i18n: "i18n",
    career: "Carrera",
    tooling: "Herramientas",
  },
};

const dictionaries: Record<Locale, BlogDictionary> = { pt, en, es };

export const fill = (template: string, n: number) => template.replace("{n}", String(n));

export const countPosts = (t: BlogDictionary, n: number) =>
  fill(n === 1 ? t.postsCount.one : t.postsCount.other, n);

export const getBlogDictionary = (locale: Locale) => dictionaries[locale];
