'use client';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useSyncExternalStore, type ComponentProps } from 'react';

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

const noop = () => () => {};

// next-themes already knows the theme on the first client render (it reads
// localStorage), but the server doesn't. Reporting it before hydration makes the
// server HTML and the client disagree, so theme/resolvedTheme stay undefined
// until the component has hydrated (false on the server snapshot, true after).
export function useTheme() {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const context = useNextTheme();
  return hydrated
    ? context
    : { ...context, theme: undefined, resolvedTheme: undefined };
}
