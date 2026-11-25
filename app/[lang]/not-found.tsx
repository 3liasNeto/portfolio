"use client";

import { usePathname } from "next/navigation";
import { StatusLink, StatusPage } from "../components/status-page";
import { statusContext } from "./status-copy";

export default function NotFound() {
  const { t, back } = statusContext(usePathname());
  return (
    <StatusPage code="404" title={t.notFoundTitle} body={t.notFoundBody}>
      <StatusLink href={back.href}>{back.label}</StatusLink>
    </StatusPage>
  );
}
