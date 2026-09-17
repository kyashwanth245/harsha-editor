import { useEffect, useRef } from 'react';

/**
 * Adds `.is-visible` to the element (and optionally its `.reveal` children)
 * once it scrolls into view. Pairs with the `.reveal` CSS class.
 */
export function useReveal({ selector = '.reveal', threshold = 0.15, once = true } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const targets = root.matches(selector) ? [root] : Array.from(root.querySelectorAll(selector));
    if (targets.length === 0) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, threshold, once]);

  return containerRef;
}

export default useReveal;
