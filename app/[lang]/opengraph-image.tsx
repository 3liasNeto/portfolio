import { ImageResponse } from "next/og";
import { brand, loadBrandFonts } from "../brand";
import { hasLocale, locales } from "../i18n";
import { getDictionary } from "./dictionaries";

export const alt = "Elias Neto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.paper,
          color: brand.ink,
          padding: "56px 64px",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, textTransform: "uppercase", letterSpacing: 2 }}>
          <span style={{ display: "flex" }}>
            <span style={{ color: brand.signal }}>~/</span>portfolio $ whoami
          </span>
          <span>{t.hero.role}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.82 }}>
          <span style={{ fontFamily: "Inter Tight", fontWeight: 900, fontSize: 250, letterSpacing: -16 }}>
            ELIAS
          </span>
          <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: -30 }}>
            <span
              style={{
                width: 120,
                height: 120,
                borderRadius: 999,
                background: brand.signal,
                marginRight: 48,
                marginBottom: 40,
              }}
            />
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 270, letterSpacing: -8 }}>
              Neto
            </span>
            <span style={{ fontFamily: "Inter Tight", fontWeight: 900, fontSize: 200, color: brand.signal }}>
              .
            </span>
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, textTransform: "uppercase", letterSpacing: 2 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: brand.signal }} />
            {t.hero.availability}
          </span>
          <span>eliasneto.dev</span>
        </div>
      </div>
    ),
    { ...size, fonts: await loadBrandFonts() },
  );
}
