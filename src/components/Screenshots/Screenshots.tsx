import { useRef } from 'react';
import styles from './Screenshots.module.css';
import { screens } from '../../data/screens';
import { PhoneFrame } from '../PhoneFrame/PhoneFrame';
import { IconChevronLeft, IconChevronRight } from '../Icons';
import { track } from '../../lib/analytics';

export function Screenshots() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 16 : 300;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
    track('gallery_scroll', { direction: dir === 1 ? 'next' : 'prev' });
  }

  return (
    <section className={styles.section} aria-labelledby="gallery-title">
      <div className="container">
        <h2 id="gallery-title" className={styles.title}>
          Conheça as telas do DiabetesIA
        </h2>
        <p className={styles.intro}>
          As imagens abaixo são telas reais do app, preenchidas com dados de demonstração
          (nenhum dado de pessoa real).
        </p>

        <div className={styles.carouselWrap}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Tela anterior"
            onClick={() => scrollBy(-1)}
          >
            <IconChevronLeft />
          </button>

          <div className={styles.track} ref={trackRef}>
            {screens.map((screen) => (
              <div className={styles.card} data-card key={screen.id}>
                <PhoneFrame screen={screen} size="md" caption={false} />
                <p className={styles.label}>{screen.label}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.navBtn}
            aria-label="Próxima tela"
            onClick={() => scrollBy(1)}
          >
            <IconChevronRight />
          </button>
        </div>

        <p className={styles.note}>Telas reais do app com dados de demonstração.</p>
      </div>
    </section>
  );
}
