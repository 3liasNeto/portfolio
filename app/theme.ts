export type Theme = "light" | "dark";

export const themeStorageKey = "theme";
export const motionStorageKey = "motion";

// Runs before paint (inlined in <head>) so the page never flashes the wrong theme.
// Follows the OS setting until the visitor picks a theme by hand.
// Also flags that JS is running, so scroll reveals only hide content when they can show it again,
// and restores the visitor's "pause animations" choice.
export const themeScript = `(function(){document.documentElement.classList.add("js");try{var m=matchMedia("(prefers-color-scheme: dark)");var a=function(){document.documentElement.dataset.theme=localStorage.getItem("${themeStorageKey}")||(m.matches?"dark":"light")};a();m.addEventListener("change",a);if(localStorage.getItem("${motionStorageKey}")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}})()`;

export function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(themeStorageKey, next);
  } catch {}
}

export function setMotionPaused(paused: boolean) {
  const root = document.documentElement;
  if (paused) root.dataset.motion = "paused";
  else delete root.dataset.motion;
  try {
    localStorage.setItem(motionStorageKey, paused ? "paused" : "running");
  } catch {}
}
