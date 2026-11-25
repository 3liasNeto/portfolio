// "Pause animations" preference (WCAG 2.2.2). The theme itself is handled by next-themes.

export const motionStorageKey = "motion";

// Runs before paint (inlined in <head>) so paused animations never start moving
export const motionScript = `(function(){try{if(localStorage.getItem("${motionStorageKey}")==="paused")document.documentElement.dataset.motion="paused"}catch(e){}})()`;

export function setMotionPaused(paused: boolean) {
  const root = document.documentElement;
  if (paused) root.dataset.motion = "paused";
  else delete root.dataset.motion;
  try {
    localStorage.setItem(motionStorageKey, paused ? "paused" : "running");
  } catch {}
}
