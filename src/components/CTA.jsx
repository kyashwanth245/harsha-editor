import { cta, contact } from '../data/siteConfig.js';
import useReveal from '../hooks/useReveal.js';
import './CTA.css';

export default function CTA() {
  const revealRef = useReveal();

  return (
    <section id="contact" className="cta section" ref={revealRef}>
      <div className="cta__glow" aria-hidden="true" />
      <div className="container cta__content reveal">
        <span className="eyebrow">{cta.eyebrow}</span>
        <h2 className="cta__heading">
          <span className="text-gradient">{cta.titleLine1}</span>
          <span>{cta.titleLine2}</span>
        </h2>
        <p className="section-subtitle cta__subtitle">{cta.subtitle}</p>

        <div className="cta__actions">
          <a href={contact.email} className="btn btn-glow" data-cursor="hover">
            {cta.button.label}
          </a>
          <div className="cta__social">
            <a href={contact.instagram} target="_blank" rel="noreferrer" data-cursor="hover">
              Instagram
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" data-cursor="hover">
              WhatsApp
            </a>
            <a href={contact.email} data-cursor="hover">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
