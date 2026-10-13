import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { navItems, TESTER_GUIDE_HREF } from '../../data/nav';
import { track } from '../../lib/analytics';
import { LogoMark } from '../Icons';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    }
    function onResize() {
      if (window.innerWidth >= 1100) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const onCta = (location: string) => track('cta_click', { location });

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.logo} aria-label="DiabetesIA, voltar ao início">
          <LogoMark />
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

        <a href={TESTER_GUIDE_HREF} className={`btn btn-primary ${styles.cta}`} onClick={() => onCta('header')}>
          Guia do testador
        </a>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="menu-celular"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.burgerBox} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </div>

      <div id="menu-celular" ref={panelRef} className={styles.panel} hidden={!open}>
        <nav aria-label="Menu" className="container">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={TESTER_GUIDE_HREF}
            className={`btn btn-primary ${styles.panelCta}`}
            onClick={() => {
              setOpen(false);
              onCta('menu');
            }}
          >
            Guia do testador
          </a>
        </nav>
      </div>
    </header>
  );
}
