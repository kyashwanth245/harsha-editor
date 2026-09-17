import { useState } from 'react';
import { projects } from '../data/projects.js';
import { workSection } from '../data/siteConfig.js';
import VideoCard from './VideoCard.jsx';
import VideoModal from './VideoModal.jsx';
import useReveal from '../hooks/useReveal.js';
import './Work.css';

export default function Work() {
  const revealRef = useReveal();
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="work" className="work section" ref={revealRef}>
      <div className="container">
        <div className="work__head reveal">
          <span className="eyebrow">{workSection.eyebrow}</span>

          <h2 className="section-heading">
            {workSection.title}{' '}
            <span className="text-gradient">
              {workSection.titleAccent}
            </span>
          </h2>

          <p className="section-subtitle">
            {workSection.subtitle}
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="work__empty">
            Selected projects will appear here soon.
          </p>
        ) : (
          <div className="work__grid">
            {projects.map((project, i) => (
              <div className="reveal" key={project.id}>
                <VideoCard
                  project={project}
                  index={i}
                  onOpen={setActiveProject}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <VideoModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}