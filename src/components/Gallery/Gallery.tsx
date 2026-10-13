import { useRef, useState, type KeyboardEvent } from 'react';
import styles from './Gallery.module.css';
import { screenById, screenGroups } from '../../data/screens';
import { PhoneFrame } from '../PhoneFrame/PhoneFrame';
import { IconChevronLeft, IconChevronRight } from '../Icons';
import { track } from '../../lib/analytics';

export function Gallery() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLUListElement | null>(null);

  function select(i: number, focus = false) {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
    trackRef.current?.scrollTo({ left: 0 });
    track('gallery_tab', { tab: screenGroups[i].id });
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const n = screenGroups.length;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (active + 1) % n;
    else if (e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  }

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>('li');
    el.scrollBy({ left: dir * (item ? item.offsetWidth + 24 : 300), behavior: 'smooth' });
  }

  const group = screenGroups[active];

  return (
    <section id="telas" className={`section ${styles.section}`} aria-labelledby="telas-title">
      <div className="container">
        <div className="section-head center reveal">
          <p className="eyebrow">Telas do app</p>
          <h2 id="telas-title">Veja o app por dentro.</h2>
          <p>Capturas reais da nova versão, preenchidas com dados de demonstração — nenhum dado de pessoa real.</p>
        </div>

        <div className={styles.tabsWrap}>
          <div role="tablist" aria-label="Grupos de telas" className={styles.tabs}>
            {screenGroups.map((g, i) => (
              <button
                key={g.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={i === active}
                aria-controls={`painel-${g.id}`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => select(i)}
                onKeyDown={onKeyDown}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`painel-${group.id}`}
          aria-labelledby={`tab-${group.id}`}
          className={styles.panel}
        >
          <ul ref={trackRef} className={styles.track} tabIndex={0} aria-label={`Telas: ${group.label}. Role para o lado para ver mais.`}>
            {group.screens.map((id) => {
              const s = screenById[id];
              return (
                <li key={id} className={styles.item}>
                  <PhoneFrame screen={s} width={250} />
                  <h3 className={styles.label}>{s.label}</h3>
                  <p className={styles.caption}>{s.caption}</p>
                </li>
              );
            })}
          </ul>
          {group.screens.length > 2 && (
            <div className={styles.nav}>
              <button type="button" className={styles.navBtn} onClick={() => scrollBy(-1)} aria-label="Ver telas anteriores">
                <IconChevronLeft />
              </button>
              <button type="button" className={styles.navBtn} onClick={() => scrollBy(1)} aria-label="Ver próximas telas">
                <IconChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
