import { ImageResponse } from "next/og";
import { brand, loadBrandFonts } from "@/lib/brand";
import { siteUrl } from "@/lib/data";

export const ogSize = { width: 1200, height: 630 };

// Share card for the blog (index and posts): masthead line, big title, footer
export async function blogOgImage({
  kicker,
  title,
  titleItalic,
  footer,
  accent = [brand.signal, "#ffb199"],
}: {
  kicker: string;
  title: string;
  titleItalic?: string;
  footer: string;
  accent?: [string, string];
}) {
  const [a, b] = accent;
  const titleSize = title.length > 48 ? 72 : title.length > 28 ? 88 : 132;

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
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -160,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: `radial-gradient(circle at 30% 30%, ${b}, ${a} 70%)`,
          }}
        />
        {/* Newspaper-style double rule (Satori has no "double" borders, so two boxes) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: `2px solid ${brand.ink}`,
            borderBottom: `2px solid ${brand.ink}`,
            padding: "4px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: `2px solid ${brand.ink}`,
              borderBottom: `2px solid ${brand.ink}`,
              padding: "10px 0",
              fontSize: 22,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            <span style={{ display: "flex" }}>
              En<span style={{ color: brand.signal }}>.</span>&nbsp;blog
            </span>
            <span>{kicker}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <span
            style={{
              fontFamily: "Inter Tight",
              fontWeight: 900,
              fontSize: titleSize,
              lineHeight: 0.95,
              letterSpacing: -titleSize * 0.04,
            }}
          >
            {title}
          </span>
          {titleItalic && (
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: titleSize * 1.05 }}>
              {titleItalic}
            </span>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, textTransform: "uppercase", letterSpacing: 2 }}>
          <span>{footer}</span>
          <span style={{ marginRight: 260 }}>{new URL(siteUrl).host}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadBrandFonts() },
  );
}
