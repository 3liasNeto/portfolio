"use client";

import { usePathname } from "next/navigation";
import { StatusLink, StatusPage, statusButton } from "../components/status-page";
import { statusContext } from "./status-copy";

// Error boundary for everything under [lang]; the root layout itself stays up
export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  const { t, back } = statusContext(usePathname());
  return (
    <StatusPage code="500" title={t.errorTitle} body={t.errorBody}>
      <button type="button" onClick={() => retry()} className={statusButton}>
        ↻ {t.retry}
      </button>
      <StatusLink href={back.href}>{back.label}</StatusLink>
    </StatusPage>
  );
}
