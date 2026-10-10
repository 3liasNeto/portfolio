import { ImageResponse } from "next/og";
import { loadBrandFonts, MonogramTile } from "./brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<MonogramTile size={180} radius={0} />, {
    ...size,
    fonts: await loadBrandFonts(),
  });
}
