import { useEffect, useState } from 'react';
import { nav, site } from '../data/siteConfig.js';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* LOGO */}
        <a
          href="#home"
          className="navbar__logo"
          data-cursor="hover"
        >
          {site.name}
          <span className="navbar__logo-dot" aria-hidden="true" />
        </a>

        {/* DESKTOP NAV */}
        <nav className="navbar__links" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navbar__link"
              data-cursor="hover"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* TOP LET'S WORK */}
        <a
          href="https://discord.gg/yDw579XQB"
          className="btn btn-outline navbar__cta "
          data-cursor="hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="navbar__discord-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M19.54 5.06A16.7 16.7 0 0 0 15.5 3.8l-.5 1.02a15.1 15.1 0 0 0-6 0L8.5 3.8c-1.4.3-2.75.72-4.04 1.26C1.9 8.9 1.2 12.95 1.55 16.94a16.8 16.8 0 0 0 4.96 2.5l1.2-1.65c-.66-.25-1.28-.55-1.88-.9l.46-.36c3.63 1.7 7.57 1.7 11.16 0l.47.36c-.6.35-1.23.65-1.89.9l1.2 1.65a16.8 16.8 0 0 0 4.96-2.5c.42-4.63-.72-8.64-2.65-11.88ZM8.7 15.13c-1.08 0-1.97-.99-1.97-2.2s.87-2.2 1.97-2.2 1.99.99 1.97 2.2c0 1.21-.87 2.2-1.97 2.2Zm6.6 0c-1.08 0-1.97-.99-1.97-2.2s.87-2.2 1.97-2.2 1.99.99 1.97 2.2c0 1.21-.87 2.2-1.97 2.2Z"
            />
                </svg>
          <span>Join Discord</span>
        </a>

        {/* MOBILE BURGER */}
        <button
          type="button"
          className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
      >

        <div className="mobile-menu__top">
          <span className="mobile-menu__label">MENU</span>

          <span className="mobile-menu__counter">
            00 / {String(nav.length).padStart(2, '0')}
          </span>
        </div>

        <nav
          className="mobile-menu__links"
          aria-label="Mobile"
        >
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              style={{
                transitionDelay: `${i * 45}ms`,
              }}
            >
              <span className="mobile-menu__number">
                {String(i + 1).padStart(2, '0')}
              </span>

              <span className="mobile-menu__text">
                {item.label}
              </span>

              <span
                className="mobile-menu__arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </nav>

        {/* BOTTOM LET'S WORK */}
        <a
          href="https://discord.gg/yDw579XQB"
          className="btn btn-glow mobile-menu__bottom-cta"
          onClick={handleNavClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Let&rsquo;s Join Discord</span>
          <span aria-hidden="true">↗</span>
        </a>

      </div>
    </header>
  );
}