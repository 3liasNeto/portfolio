import { notFound } from "next/navigation";

// Any URL without a route under /{lang}: render [lang]/not-found.tsx inside the
// root layout (fonts, theme), instead of Next's unstyled default 404.
export default function Missing() {
  notFound();
}
