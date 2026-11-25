import { describe, expect, it } from "vitest";
import { defaultLocale, negotiateLocale } from "@/dictionaries/config";

describe("negotiateLocale", () => {
  it("falls back to the default locale without a header", () => {
    expect(negotiateLocale(null)).toBe(defaultLocale);
    expect(negotiateLocale("")).toBe(defaultLocale);
  });

  it("matches on the primary language subtag", () => {
    expect(negotiateLocale("pt-BR")).toBe("pt");
    expect(negotiateLocale("es-AR,es;q=0.9")).toBe("es");
  });

  it("follows q-values, not header order", () => {
    expect(negotiateLocale("en;q=0.5,es;q=0.9")).toBe("es");
  });

  it("skips unsupported languages and q=0", () => {
    expect(negotiateLocale("fr-FR,de;q=0.9,es;q=0.5")).toBe("es");
    expect(negotiateLocale("pt;q=0,en;q=0.4")).toBe("en");
  });

  it("falls back when nothing is supported or q is invalid", () => {
    expect(negotiateLocale("fr,de")).toBe(defaultLocale);
    expect(negotiateLocale("es;q=abc")).toBe(defaultLocale);
  });
});
