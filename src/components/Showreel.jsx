import { useEffect, useRef, useState } from 'react';
import { showreel } from '../data/siteConfig.js';
import { toTimecode } from '../utils/format.js';
import useReveal from '../hooks/useReveal.js';
import './Showreel.css';

export default function Showreel() {
  const revealRef = useReveal();
  const videoRef = useRef(null);
  const frameRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      const playPromise = v.play();
      if (playPromise) {
        playPromise.then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        setPlaying(true);
      }
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const frame = frameRef.current;
    if (!frame) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      frame.requestFullscreen?.();
    }
  };

  const onScrub = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const pct = Number(e.target.value);
    v.currentTime = (pct / 100) * duration;
  };

  const handleMouseEnter = () => {
  const v = videoRef.current;
  if (!v) return;

  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  const playPromise = v.play();

  if (playPromise) {
    playPromise
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  } else {
    setPlaying(true);
  }
};

const handleMouseLeave = () => {
  const v = videoRef.current;
  if (!v) return;

  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  v.pause();
  setPlaying(false);
};

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;

    const onTime = () => {
      setCurrent(v.currentTime);
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    const onLoaded = () => setDuration(v.duration || 0);
    const onEnded = () => setPlaying(false);

    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section id="showreel" className="showreel section" ref={revealRef}>
      <div className="container">
        <div className="showreel__head reveal">
          <span className="eyebrow">{showreel.eyebrow}</span>
          <h2 className="section-heading">{showreel.title}</h2>
          <p className="section-subtitle">{showreel.subtitle}</p>
        </div>

        <div
          className="showreel__frame reveal"
          ref={frameRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            className="showreel__video"
            src={showreel.video}
            poster={showreel.poster}
            muted={muted}
            playsInline
            preload="metadata"
            onClick={togglePlay}
          />

          {!playing && (
            <button type="button" className="showreel__play" onClick={togglePlay} aria-label="Play showreel">
              <span className="showreel__play-icon">
                <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                  <path d="M0 0L22 13L0 26V0Z" fill="currentColor" />
                </svg>
              </span>
            </button>
          )}

          <div className="showreel__controls">
            <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} data-cursor="hover">
              {playing ? (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                  <rect width="4" height="16" />
                  <rect x="10" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
                  <path d="M0 0L14 8L0 16V0Z" />
                </svg>
              )}
            </button>

            <span className="timecode showreel__time">
              {toTimecode(current)} / {toTimecode(duration)}
            </span>

            <input
              type="range"
              className="showreel__scrub"
              min="0"
              max="100"
              value={Number.isFinite(progress) ? progress : 0}
              onChange={onScrub}
              aria-label="Seek"
            />

            <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} data-cursor="hover">
              {muted ? (
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 6h3l5-4v12l-5-4H1V6Z" />
                  <path d="M13 5l4 6M17 5l-4 6" />
                </svg>
              ) : (
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 6h3l5-4v12l-5-4H1V6Z" />
                  <path d="M13 4c1.5 1.2 1.5 6.6 0 7.8M15.5 1.5c3 2.6 3 10.4 0 13" />
                </svg>
              )}
            </button>

            <button type="button" onClick={toggleFullscreen} aria-label="Fullscreen" data-cursor="hover">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
