import { services } from '../data/siteConfig.js';
import useReveal from '../hooks/useReveal.js';
import './Services.css';

export default function Services() {
  const revealRef = useReveal();

  return (
    <section id="services" className="services section" ref={revealRef}>
      <div className="container">
        <div className="services__head reveal">
          <span className="eyebrow">What I Do</span>
          <h2 className="section-heading">Services built around the cut.</h2>
        </div>

        <ul className="services__list">
          {services.map((service, i) => (
            <li className="services__row reveal" key={service.id}>
              <span className="timecode services__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="services__title">{service.title}</span>
              <span className="services__desc">{service.description}</span>
              <span className="services__row-glow" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
