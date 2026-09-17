import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroScene from './HeroScene.jsx';
import { hero } from '../data/siteConfig.js';
import { prefersReducedMotion } from '../utils/format.js';
import './Hero.css';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__eyebrow', { opacity: 0, y: 16, duration: 0.7 })
        .from('.hero__line', { opacity: 0, y: 60, stagger: 0.12, duration: 1 }, '-=0.35')
        .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
        .from('.hero__actions > *', { opacity: 0, y: 16, stagger: 0.1, duration: 0.7 }, '-=0.5')
        .from('.hero__scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.3');
    }, rootRef);

    // Gentle mouse-reactive parallax on the headline
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to('.hero__headline', { x: x * 10, y: y * 6, duration: 0.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" className="hero" ref={rootRef}>
      <HeroScene />
      <div className="hero__glow hero__glow--purple" aria-hidden="true" />
      <div className="hero__glow hero__glow--cyan" aria-hidden="true" />

      <div className="container hero__content">
        <span className="eyebrow hero__eyebrow">{hero.eyebrow}</span>

        <h1 className="hero__headline">
          <span className="hero__line text-gradient">{hero.titleLine1}</span>
          <span className="hero__line">{hero.titleLine2}</span>
          <span className="hero__line">{hero.titleLine3}</span>
        </h1>

        <p className="hero__subtitle">{hero.subtitle}</p>

        <div className="hero__actions">
          <a href={hero.ctaPrimary.href} className="btn btn-glow" data-cursor="hover">
            {hero.ctaPrimary.label}
          </a>
          <a href={hero.ctaSecondary.href} className="btn btn-outline" data-cursor="hover">
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="timecode">00:00:00:01</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
