export type Theme = "light" | "dark";

export const themeStorageKey = "theme";

// Runs before paint (inlined in <head>) so the page never flashes the wrong theme.
// Follows the OS setting until the visitor picks a theme by hand.
export const themeScript = `(function(){try{var m=matchMedia("(prefers-color-scheme: dark)");var a=function(){document.documentElement.dataset.theme=localStorage.getItem("${themeStorageKey}")||(m.matches?"dark":"light")};a();m.addEventListener("change",a)}catch(e){}})()`;
