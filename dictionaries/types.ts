import type { PostTag } from "@/content/blog/posts";
import type { ExperienceId, ProjectId, StatId } from "@/lib/data";
import type { Locale } from "./config";

// Same union as Locale, derived from the `locales` list so a new language is added in one place
export type Language = Locale;

// Shape shared by every locale file in data/ (pt.json, en.json, es.json).
export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    work: string;
    about: string;
    experience: string;
    cta: string;
    language: string;
  };
  hero: {
    availability: string;
    role: string;
    /** Rendered as: role + before + <em> + middle + <mark> + after */
    before: string;
    em: string;
    middle: string;
    highlight: string;
    after: string;
    scroll: string;
    terminal: {
      command: string;
      phrases: string[];
    };
  };
  work: {
    label: string;
    titleA: string;
    titleEm: string;
    titleB: string;
    /** Shown only on devices with a mouse */
    hint: string;
    years: string;
    private: string;
    personal: string;
  };
  projects: Record<ProjectId, string>;
  about: {
    label: string;
    /** Alternates plain text and <em> fragments */
    statement: string[];
    card: {
      hint: string;
      flip: string;
      alt: string;
      back: string;
    };
    stats: Record<StatId, string>;
  };
  services: {
    title: string;
    body: string;
  }[];
  experience: {
    label: string;
    titleA: string;
    titleEm: string;
    titleB: string;
    terminal: string;
    items: Record<
      ExperienceId,
      {
        period: string;
        role: string;
        company: string;
        note: string;
      }
    >;
  };
  contact: {
    label: string;
    title: string;
    titleEm: string;
    back: string;
    madeWith: string;
    copy: string;
    copied: string;
    copyFailed: string;
    cv: string;
    schedule: string;
  };
  palette: {
    open: string;
    title: string;
    placeholder: string;
    empty: string;
    hints: {
      move: string;
      run: string;
      close: string;
    };
    groups: {
      navigate: string;
      preferences: string;
      contact: string;
      social: string;
    };
    commands: {
      top: string;
      work: string;
      about: string;
      experience: string;
      contact: string;
      light: string;
      dark: string;
      language: string;
    };
  };
  theme: {
    label: string;
    light: string;
    dark: string;
  };
  motion: {
    pause: string;
    play: string;
  };
  /** 404 and error pages */
  status: {
    notFoundTitle: string;
    notFoundBody: string;
    errorTitle: string;
    errorBody: string;
    retry: string;
    home: string;
    blog: string;
  };
  blog: BlogDictionary;
}

/** Templates with "{n}" are filled by fill() / countPosts() in lib/blog/format.ts */
export interface BlogDictionary {
  meta: {
    title: string;
    description: string;
  };
  testBadge: string;
  language: string;
  theme: {
    light: string;
    dark: string;
  };
  masthead: {
    edition: string;
    titleA: string;
    titleB: string;
    intro: string;
  };
  featured: string;
  readPost: string;
  allPosts: string;
  postsCount: {
    one: string;
    other: string;
  };
  readingTime: string;
  search: string;
  allTags: string;
  empty: string;
  topics: string;
  about: {
    title: string;
    body: string;
  };
  rss: string;
  back: string;
  published: string;
  toc: string;
  share: string;
  copyLink: string;
  linkCopied: string;
  newer: string;
  older: string;
  related: string;
  copyCode: string;
  codeCopied: string;
  copyFailed: string;
  callout: {
    tip: string;
    warning: string;
  };
  backToTop: string;
  tags: Record<PostTag, string>;
}
