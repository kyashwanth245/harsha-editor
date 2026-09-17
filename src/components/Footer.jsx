import { site, nav, contact } from '../data/siteConfig.js';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">{site.name}</span>
          <span className="footer__role timecode">{site.role}</span>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__social">
          <a href={contact.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={contact.email}>Email</a>
        </div>
      </div>

      <div className="container footer__bottom">
      <span className="timecode">
        © {year} {site.name}. All rights reserved.
      </span>

      <span className="footer__developer timecode">
        Designed &amp; Developed by <strong>Yashwanth</strong>
      </span>
       </div>
    </footer>
  );
}
