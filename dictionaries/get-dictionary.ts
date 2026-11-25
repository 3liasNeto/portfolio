import "server-only";
import { cache } from "react";
import { Dictionary, Language } from "./types";

const dictionaries: Record<Language, () => Promise<Dictionary>> = {
  en: () => import("./data/en.json").then((module) => module.default),
  pt: () => import("./data/pt.json").then((module) => module.default),
  es: () => import("./data/es.json").then((module) => module.default),
};

export const getDictionary = cache(async (lang: Language) =>
  dictionaries[lang](),
);
