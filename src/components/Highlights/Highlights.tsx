import type { CSSProperties } from 'react';
import styles from './Highlights.module.css';
import { highlights, type Highlight } from '../../data/highlights';
import { screenById } from '../../data/screens';
import { Shot } from '../Shot/Shot';
import {
  IconHome,
  IconChat,
  IconUsers,
  IconMeal,
  IconHeart,
  IconLeaf,
  IconDocument,
  IconCamera,
  IconTextSize,
  IconCheck,
  IconArrowRight,
} from '../Icons';

const icons: Record<string, (p: { className?: string }) => JSX.Element> = {
  home: IconHome,
  assistant: IconChat,
  sharing: IconUsers,
  nutrition: IconMeal,
  pressure: IconHeart,
  journey: IconLeaf,
  report: IconDocument,
  photo: IconCamera,
  a11y: IconTextSize,
};

function Card({ item, index }: { item: Highlight; index: number }) {
  const Icon = icons[item.id] ?? IconCheck;
  const screen = item.screen ? screenById[item.screen] : undefined;
  return (
    <article
      className={`${styles.card} reveal`}
      data-size={item.size ?? 'normal'}
      data-tone={item.tone}
      style={{ '--reveal-delay': `${(index % 3) * 70}ms` } as CSSProperties}
    >
      <div className={styles.body}>
        <span className={styles.icon}>
          <Icon />
        </span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        {item.bullets && (
          <ul className={styles.bullets}>
            {item.bullets.map((b) => (
              <li key={b}>
                <IconCheck />
                {b}
              </li>
            ))}
          </ul>
        )}
        {item.id === 'a11y' && (
          <>
            <ul className={styles.status} aria-label="Exemplo de como o app mostra a situação da glicemia">
              <li data-s="low"><span aria-hidden="true">▼</span> Baixa</li>
              <li data-s="ok"><span aria-hidden="true">●</span> Na faixa geral</li>
              <li data-s="high"><span aria-hidden="true">▲</span> Alta</li>
            </ul>
            <a className={styles.more} href="#acessibilidade">
              Ver acessibilidade <IconArrowRight />
            </a>
          </>
        )}
      </div>
      {screen && (
        <div className={styles.peek} aria-hidden="true">
          <div className={styles.peekFrame} style={{ '--crop': `${item.crop ?? 0}%` } as CSSProperties}>
            <Shot screen={screen} decorative className={styles.peekImg} />
          </div>
        </div>
      )}
    </article>
  );
}

export function Highlights() {
  return (
    <section id="novidades" className={`section ${styles.section}`} aria-labelledby="novidades-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Novidades da nova versão</p>
          <h2 id="novidades-title">Tudo mais perto, mais claro e mais rápido.</h2>
          <p>
            A nova versão do DiabetesIA foi redesenhada do zero para ser fácil de ler e rápida de usar.
            Ela já está em teste no Android.
          </p>
        </div>
        <div className={styles.grid}>
          {highlights.map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
