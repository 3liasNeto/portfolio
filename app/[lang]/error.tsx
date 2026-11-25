"use client";

import { usePathname } from "next/navigation";
import { useDict } from "@/hooks/use-dict";
import { StatusLink, StatusPage, statusButton } from "@/components/status-page";
import { statusContext } from "@/lib/status-copy";

// Error boundary for everything under [lang]; the root layout itself stays up
export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  const { dictionary, language } = useDict();
  const { t, back } = statusContext(usePathname(), language, dictionary.status);
  return (
    <StatusPage code="500" title={t.errorTitle} body={t.errorBody}>
      <button type="button" onClick={() => retry()} className={statusButton}>
        ↻ {t.retry}
      </button>
      <StatusLink href={back.href}>{back.label}</StatusLink>
    </StatusPage>
  );
}
