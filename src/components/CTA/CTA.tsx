import styles from './CTA.module.css';
import { track } from '../../lib/analytics';

const platforms = ['Android', 'iPhone', 'Web'];

export function CTA() {
  return (
    <section id="aplicativo" className={styles.section} aria-labelledby="cta-title">
      <div className="container">
        <h2 id="cta-title" className={styles.title}>
          Conheça o DiabetesIA.
        </h2>
        <p className={styles.text}>
          Ainda não temos o app nas lojas nem uma versão web publicada. Mas você já pode ver como
          o DiabetesIA funciona e acompanhar as novidades.
        </p>
        <div className={styles.buttons}>
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              className={styles.btn}
              onClick={() => track('cta_click', { location: 'final', platform: p })}
            >
              {p} — Em breve
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
