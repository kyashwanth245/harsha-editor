import { useEffect, useRef, useState } from 'react';
import { toTimecode } from '../utils/format.js';
import useLockBodyScroll from '../hooks/useLockBodyScroll.js';
import './VideoModal.css';

export default function VideoModal({ project, onClose }) {
  const isOpen = Boolean(project);
  useLockBodyScroll(isOpen);

  const videoRef = useRef(null);
  const closeBtnRef = useRef(null);
  const frameRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  // Reset + autofocus + attempt playback whenever a new project opens.
  useEffect(() => {
    if (!isOpen) return undefined;
    setPlaying(false);
    setProgress(0);
    setCurrent(0);
    closeBtnRef.current?.focus();

    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      const playPromise = v.play();
      if (playPromise) {
        playPromise
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    }
    return undefined;
  }, [isOpen, project]);

  // Escape key closes the modal.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

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
  }, [project]);

  if (!isOpen) return null;

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

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — video player`}
      onMouseDown={onBackdropClick}
    >
      <div className="video-modal__inner">
        <div className="video-modal__frame" ref={frameRef}>
          <video
            ref={videoRef}
            className="video-modal__video"
            src={project.video}
            poster={project.thumbnail}
            playsInline
            onClick={togglePlay}
          />

          <button
            type="button"
            className="video-modal__close"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close video"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 1l16 16M17 1L1 17" />
            </svg>
          </button>

          <div className="video-modal__info">
            <span className="video-modal__category timecode">{project.category}</span>
            <h3 className="video-modal__title">{project.title}</h3>
          </div>

          <div className="video-modal__controls">
            <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
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

            <span className="timecode video-modal__time">
              {toTimecode(current)} / {toTimecode(duration)}
            </span>

            <input
              type="range"
              className="video-modal__scrub"
              min="0"
              max="100"
              value={Number.isFinite(progress) ? progress : 0}
              onChange={onScrub}
              aria-label="Seek"
            />

            <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
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

            <button type="button" onClick={toggleFullscreen} aria-label="Fullscreen">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
