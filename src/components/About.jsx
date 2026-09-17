import { useState } from 'react';
import { about } from '../data/siteConfig.js';
import useReveal from '../hooks/useReveal.js';
import './About.css';

export default function About() {
  const revealRef = useReveal();
  const [photoError, setPhotoError] = useState(false);

  return (
    <section id="about" className="about section" ref={revealRef}>
      <div className="container about__grid">
        <div className="about__photo reveal">
          {!photoError ? (
            <img
              src={about.photo}
              alt="Portrait of Harsha"
              onError={() => setPhotoError(true)}
            />
          ) : (
            <div className="about__photo-placeholder" aria-hidden="true">
              <span>H</span>
            </div>
          )}
          <span className="about__photo-border" aria-hidden="true" />
        </div>

        <div className="about__copy reveal">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="section-heading">{about.heading}</h2>
          {about.body.map((paragraph) => (
            <p className="about__paragraph" key={paragraph.slice(0, 24)}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
