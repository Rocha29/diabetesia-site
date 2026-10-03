import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { navItems } from '../../data/nav';
import { track } from '../../lib/analytics';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function handleNavClick() {
    setOpen(false);
  }

  function handleCtaClick() {
    track('cta_click', { location: 'header' });
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.logo} aria-label="DiabetesIA — início">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 19s-7-4.1-7-9.2A4.1 4.1 0 0 1 12 6.4a4.1 4.1 0 0 1 7 3.4C19 14.9 12 19 12 19Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path d="M7 11.5h2l1.3 2.3 1.7-4.6 1.4 2.3H17" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>DiabetesIA</span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#aplicativo" className={styles.cta} onClick={handleCtaClick}>
          Conhecer o DiabetesIA
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
      >
        <button type="button" className={styles.closeBtn} aria-label="Fechar menu" onClick={() => setOpen(false)}>
          ×
        </button>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={handleNavClick}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#aplicativo" onClick={() => { handleNavClick(); handleCtaClick(); }} className={styles.ctaMobile}>
              Conhecer o DiabetesIA
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
