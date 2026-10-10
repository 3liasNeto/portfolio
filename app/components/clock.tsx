"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
}

export function Clock({ timeZone, locale }: { timeZone: string; locale: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(new Date()),
    () => "--:--",
  );

  return <span>{time}</span>;
}
