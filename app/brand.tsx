import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared by the generated icons and Open Graph images (rendered with next/og).

export const brand = {
  paper: "#f1ece2",
  ink: "#121110",
  signal: "#ff4d1c",
};

export async function loadBrandFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [sans, serif, mono] = await Promise.all([
    readFile(join(dir, "InterTight-Black.ttf")),
    readFile(join(dir, "InstrumentSerif-Italic.ttf")),
    readFile(join(dir, "JetBrainsMono-Medium.ttf")),
  ]);
  return [
    { name: "Inter Tight", data: sans, weight: 900 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
    { name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

// The "En." monogram on a dark tile, scaled to the icon size
export function MonogramTile({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brand.ink,
        borderRadius: radius,
        color: brand.paper,
        paddingBottom: size * 0.06,
      }}
    >
      <span style={{ fontFamily: "Inter Tight", fontWeight: 900, fontSize: size * 0.6, letterSpacing: -size * 0.03 }}>
        E
      </span>
      <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: size * 0.62 }}>
        n
      </span>
      <span style={{ fontFamily: "Inter Tight", fontWeight: 900, fontSize: size * 0.6, color: brand.signal }}>
        .
      </span>
    </div>
  );
}
