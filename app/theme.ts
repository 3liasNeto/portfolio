export type Theme = "light" | "dark";

export const themeStorageKey = "theme";

// Runs before paint (inlined in <head>) so the page never flashes the wrong theme.
// Follows the OS setting until the visitor picks a theme by hand.
// Also flags that JS is running, so scroll reveals only hide content when they can show it again.
export const themeScript = `(function(){document.documentElement.classList.add("js");try{var m=matchMedia("(prefers-color-scheme: dark)");var a=function(){document.documentElement.dataset.theme=localStorage.getItem("${themeStorageKey}")||(m.matches?"dark":"light")};a();m.addEventListener("change",a)}catch(e){}})()`;

export function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(themeStorageKey, next);
  } catch {}
}
