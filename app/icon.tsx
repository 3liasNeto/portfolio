import { ImageResponse } from "next/og";
import { loadBrandFonts, MonogramTile } from "./brand";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<MonogramTile size={64} radius={14} />, {
    ...size,
    fonts: await loadBrandFonts(),
  });
}
