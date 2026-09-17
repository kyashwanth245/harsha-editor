import { useEffect, useState } from 'react';

/**
 * Tracks whether the enhanced custom cursor should render at all —
 * false on touch devices or when the user prefers reduced motion.
 */
export function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!isTouch && !prefersReduced);
  }, []);

  return enabled;
}

export default useCustomCursorEnabled;
