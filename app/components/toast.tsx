"use client";

import { useEffect, useState } from "react";

const eventName = "app:toast";

type Tone = "success" | "error";
type Toast = { message: string; tone: Tone; id: number };

export function showToast(message: string, tone: Tone = "success") {
  window.dispatchEvent(new CustomEvent(eventName, { detail: { message, tone } }));
}

// Copies text and always tells the visitor how it went
export async function copyText(text: string, messages: { copied: string; copyFailed: string }) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(messages.copied);
    return true;
  } catch {
    // Clipboard is unavailable on insecure origins or when permission is denied
    showToast(messages.copyFailed, "error");
    return false;
  }
}

export function Toaster() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      const { message, tone } = (e as CustomEvent<Omit<Toast, "id">>).detail;
      setToast({ message, tone, id: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 2400);
    };
    window.addEventListener(eventName, onToast);
    return () => {
      window.removeEventListener(eventName, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"
    >
      {toast && (
        <p
          key={toast.id}
          className="toast-in flex items-center gap-3 rounded-full bg-ink py-3 pr-5 pl-3 font-mono text-xs tracking-wider text-paper uppercase shadow-[4px_4px_0_var(--signal)]"
        >
          <span
            aria-hidden
            className={`grid size-6 place-items-center rounded-full ${
              toast.tone === "error" ? "bg-paper text-ink" : "bg-signal text-on-signal"
            }`}
          >
            {toast.tone === "error" ? "!" : "✓"}
          </span>
          {toast.message}
        </p>
      )}
    </div>
  );
}
