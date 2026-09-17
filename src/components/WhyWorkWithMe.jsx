import { whyWorkWithMe } from '../data/siteConfig.js';
import useReveal from '../hooks/useReveal.js';
import './WhyWorkWithMe.css';

export default function WhyWorkWithMe() {
  const revealRef = useReveal();

  return (
    <section className="why section" ref={revealRef}>
      <div className="container">
        <div className="why__head reveal">
          <span className="eyebrow">{whyWorkWithMe.eyebrow}</span>
          <h2 className="section-heading">{whyWorkWithMe.title}</h2>
        </div>

        <div className="why__grid">
          {whyWorkWithMe.points.map((point) => (
            <div className="why__card reveal glass" key={point.title}>
              <h3 className="why__card-title">{point.title}</h3>
              <p className="why__card-desc">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
