"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { rememberLocale } from "@/dictionaries/config";
import type { Dictionary, Language } from "@/dictionaries/types";

interface DictionaryContextValue {
  dictionary: Dictionary;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function useDict() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDict must be used within a DictionaryProvider");
  }
  return context;
}

export function DictionaryProvider({
  dictionary,
  language,
  children,
}: Omit<DictionaryContextValue, "changeLanguage"> & { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = useCallback(
    (next: Language) => {
      if (next === language) return;
      // Saved so the proxy stops following the browser language
      rememberLocale(next);

      const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
      const { search, hash } = window.location;
      
      router.push(`/${next}${rest}${search}${hash}`);
    },
    [language, pathname, router],
  );

  const value = useMemo(
    () => ({ dictionary, language, changeLanguage }),
    [dictionary, language, changeLanguage],
  );

  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}
