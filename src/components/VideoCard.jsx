import { useEffect, useRef, useState } from 'react';
import { toClipLabel } from '../utils/format.js';
import './VideoCard.css';

export default function VideoCard({ project, index, featured = false, onOpen }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [canPreview, setCanPreview] = useState(false);

  useEffect(() => {
    // Only attempt hover-preview on devices with real hover support.
    setCanPreview(window.matchMedia('(hover: hover)').matches);
  }, []);

  const handleEnter = () => {
    setHovering(true);
    if (canPreview && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    setHovering(false);
    if (canPreview && videoRef.current) {
      videoRef.current.pause();
    }
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  const handleMouseMove = (e) => {
    if (!canPreview || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  };

  return (
    <button
      type="button"
      className={`video-card ${featured ? 'video-card--featured' : ''} ${project.id === 5 ? 'video-card--fifth' : ''}`}
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouseMove}
      onClick={() => onOpen(project)}
      data-cursor="hover"
      aria-label={`Open ${project.title} — ${project.category}`}
    >
      <span className="video-card__frame">
        <img
          src={project.thumbnail}
          alt=""
          className={`video-card__thumb ${hovering && canPreview ? 'is-hidden' : ''}`}
          loading="lazy"
        />
        {canPreview && (
          <video
            ref={videoRef}
            className={`video-card__preview ${hovering ? 'is-visible' : ''}`}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            onLoadedMetadata={(e) => {
              const { videoWidth, videoHeight } = e.currentTarget;

              if (videoWidth && videoHeight) {
                e.currentTarget
                  .closest('.video-card')
                  ?.querySelector('.video-card__frame')
                  ?.style.setProperty(
                    '--video-ratio',
                    `${videoWidth} / ${videoHeight}`
                  );
              }
            }}
          />
        )}
        <span className="video-card__scan" aria-hidden="true" />
        <span className="video-card__border" aria-hidden="true" />

        <span className="video-card__play" aria-hidden="true">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
            <path d="M0 0L16 9L0 18V0Z" />
          </svg>
        </span>
      </span>

      <span className="video-card__meta">
        <span className="video-card__meta-top">
          <span className="timecode">{toClipLabel(index)}</span>
          <span className="video-card__category">{project.category}</span>
        </span>
        <span className="video-card__title">{project.title}</span>
        <span className="video-card__desc">{project.description}</span>
      </span>
    </button>
  );
}
