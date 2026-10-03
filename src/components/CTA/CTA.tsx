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
        <a
          href="#como-funciona"
          className={styles.btn}
          onClick={() => track('cta_click', { location: 'final' })}
        >
          Ver como funciona
        </a>
        {/* Availability badges: informative only, not clickable until real links exist. */}
        <ul className={styles.badges} aria-label="Disponibilidade">
          {platforms.map((p) => (
            <li key={p} className={styles.badge}>
              {p} — Em breve
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
