"use client";

import { useEffect, useState } from "react";

const eventName = "portfolio:toast";

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: message }));
}

export function Toaster() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setToast({ message: (e as CustomEvent<string>).detail, id: Date.now() });
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
          <span className="grid size-6 place-items-center rounded-full bg-signal text-on-signal">
            ✓
          </span>
          {toast.message}
        </p>
      )}
    </div>
  );
}
