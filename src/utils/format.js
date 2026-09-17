/** Format seconds as an editing-style timecode: HH:MM:SS:FF (FF = frame @ 24fps, approximated). */
export function toTimecode(seconds = 0) {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const fps = 24;
  const totalFrames = Math.floor(seconds * fps);
  const hh = Math.floor(totalFrames / (3600 * fps));
  const mm = Math.floor((totalFrames % (3600 * fps)) / (60 * fps));
  const ss = Math.floor((totalFrames % (60 * fps)) / fps);
  const ff = totalFrames % fps;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

/** Zero-pads a project index for the "clip number" label, e.g. 3 -> "CLIP 03". */
export function toClipLabel(index) {
  return `CLIP ${String(index + 1).padStart(2, '0')}`;
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouchDevice() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}
