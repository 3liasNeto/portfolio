"use client";

import { usePathname } from "next/navigation";
import { useDict } from "@/hooks/use-dict";
import { StatusLink, StatusPage } from "@/components/status-page";
import { statusContext } from "@/lib/status-copy";

export default function NotFound() {
  const { dictionary, language } = useDict();
  const { t, back } = statusContext(usePathname(), language, dictionary.status);
  return (
    <StatusPage code="404" title={t.notFoundTitle} body={t.notFoundBody}>
      <StatusLink href={back.href}>{back.label}</StatusLink>
    </StatusPage>
  );
}
