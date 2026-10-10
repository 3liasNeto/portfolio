"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "../[lang]/dictionaries";
import { localeNames, locales, rememberLocale, type Locale } from "../i18n";
import { applyTheme } from "../theme";
import { copyEmail } from "./contact-actions";
import { scrollToTarget, setScrollLocked } from "./smooth-scroll";

type Command = {
  id: string;
  group: string;
  label: string;
  icon: string;
  keywords?: string;
  run: () => void;
};

const noop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

export function CommandPalette({
  lang,
  t,
  contact,
  profile,
}: {
  lang: Locale;
  t: Dictionary["palette"];
  contact: Dictionary["contact"];
  profile: {
    email: string;
    cv: string;
    calendar: string;
    socials: { label: string; href: string }[];
  };
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const mac = useSyncExternalStore(noop, isMac, () => true);

  const commands = useMemo<Command[]>(() => {
    const go = (selector: string) => () => scrollToTarget(selector);
    return [
      { id: "top", group: t.groups.navigate, label: t.commands.top, icon: "↑", run: go("#top") },
      { id: "work", group: t.groups.navigate, label: t.commands.work, icon: "◆", run: go("#trabalhos") },
      { id: "about", group: t.groups.navigate, label: t.commands.about, icon: "✳", run: go("#sobre") },
      { id: "exp", group: t.groups.navigate, label: t.commands.experience, icon: "⎇", keywords: "git log", run: go("#experiencia") },
      { id: "contact", group: t.groups.navigate, label: t.commands.contact, icon: "✉", run: go("#contato") },
      { id: "light", group: t.groups.preferences, label: t.commands.light, icon: "☀", keywords: "theme", run: () => applyTheme("light") },
      { id: "dark", group: t.groups.preferences, label: t.commands.dark, icon: "☾", keywords: "theme", run: () => applyTheme("dark") },
      ...locales
        .filter((locale) => locale !== lang)
        .map((locale) => ({
          id: `lang-${locale}`,
          group: t.groups.preferences,
          label: `${t.commands.language} ${localeNames[locale]}`,
          icon: locale.toUpperCase(),
          keywords: "language idioma",
          run: () => {
            rememberLocale(locale);
            router.push(`/${locale}`);
          },
        })),
      { id: "copy", group: t.groups.contact, label: contact.copy, icon: "⧉", keywords: profile.email, run: () => copyEmail(profile.email, contact.copied) },
      { id: "cv", group: t.groups.contact, label: contact.cv, icon: "↓", keywords: "pdf resume curriculo", run: () => window.open(profile.cv, "_blank") },
      { id: "cal", group: t.groups.contact, label: contact.schedule, icon: "◷", keywords: "cal meeting", run: () => window.open(profile.calendar, "_blank", "noreferrer") },
      ...profile.socials.map((social) => ({
        id: social.label,
        group: t.groups.social,
        label: social.label,
        icon: "↗",
        run: () => window.open(social.href, "_blank", "noreferrer"),
      })),
    ];
  }, [t, contact, profile, lang, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  function open() {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
    setScrollLocked(true);
  }

  // Lets the global shortcut call the latest open() without re-subscribing
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  });

  function close() {
    dialogRef.current?.close();
    // Resume scrolling right away; the dialog's close event fires a task later,
    // after a command may already have asked Lenis to scroll
    setScrollLocked(false);
  }

  function run(command: Command) {
    close();
    command.run();
  }

  // ⌘K / Ctrl+K toggles the palette from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else openRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Keep the highlighted command visible while navigating with the keyboard
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={t.open}
        aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
        className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[11px] tracking-wider transition-colors hover:border-signal hover:text-signal"
      >
        <span aria-hidden className="text-signal">&gt;_</span>
        <span className="hidden lg:inline">{mac ? "⌘K" : "Ctrl K"}</span>
      </button>

      <dialog
        ref={dialogRef}
        data-lenis-prevent
        aria-label={t.open}
        onClose={() => setScrollLocked(false)}
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes it
          if (e.target === dialogRef.current) close();
        }}
        className="palette m-auto mt-[12vh] w-[min(640px,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-chalk backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="overflow-hidden rounded-2xl border border-chalk/10 bg-[#181715] font-mono text-sm shadow-[8px_8px_0_var(--signal)]">
          <div className="flex items-center gap-2 border-b border-chalk/10 px-4 py-3">
            <span className="size-3 rounded-full bg-signal" />
            <span className="size-3 rounded-full bg-chalk/30" />
            <span className="size-3 rounded-full bg-chalk/30" />
            <span className="ml-3 text-xs text-chalk/50">elias@neto: ~/{t.title}</span>
          </div>

          <label className="flex items-center gap-3 border-b border-chalk/10 px-5 py-4">
            <span className="shrink-0 text-signal">~/ $</span>
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder={t.placeholder}
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
              className="w-full bg-transparent text-base text-chalk outline-none placeholder:text-chalk/35"
            />
          </label>

          <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
            {results.length === 0 && <li className="px-3 py-6 text-center text-chalk/50">{t.empty}</li>}
            {results.map((command, i) => {
              const header =
                i === 0 || results[i - 1].group !== command.group ? command.group : null;
              return (
                <li key={command.id} role="presentation">
                  {header && (
                    <p className="px-3 pt-3 pb-1.5 text-[10px] tracking-[0.2em] text-chalk/40 uppercase">
                      {header}
                    </p>
                  )}
                  <button
                    id={`cmd-${command.id}`}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    data-index={i}
                    tabIndex={-1}
                    onMouseMove={() => setActive(i)}
                    onClick={() => run(command)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      i === active ? "bg-signal text-on-signal" : "text-chalk/85"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`grid h-7 min-w-7 place-items-center rounded-md px-1 text-[11px] ${
                        i === active ? "bg-on-signal/15" : "bg-chalk/10"
                      }`}
                    >
                      {command.icon}
                    </span>
                    <span className="flex-1 font-sans text-[15px]">{command.label}</span>
                    {i === active && <span aria-hidden>↵</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-5 border-t border-chalk/10 px-5 py-3 text-[11px] text-chalk/45">
            <span><kbd className="text-chalk/80">↑↓</kbd> {t.hints.move}</span>
            <span><kbd className="text-chalk/80">↵</kbd> {t.hints.run}</span>
            <span><kbd className="text-chalk/80">esc</kbd> {t.hints.close}</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
