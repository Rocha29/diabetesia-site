import styles from './Hero.module.css';
import { PhoneFrame } from '../PhoneFrame/PhoneFrame';
import { screens } from '../../data/screens';
import { track } from '../../lib/analytics';

const home = screens.find((s) => s.id === 'home')!;
const report = screens.find((s) => s.id === 'report')!;

export function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Acompanhamento com apoio de IA</p>
          <h1>Inteligência para acompanhar o diabetes.</h1>
          <p className={styles.subhead}>
            Registre sua glicemia, suas refeições e seus medicamentos por foto, e deixe a
            inteligência artificial organizar essas informações para você e para quem cuida de
            você.
          </p>
          <div className={styles.ctas}>
            <a
              href="#aplicativo"
              className={styles.primary}
              onClick={() => track('cta_click', { location: 'hero_primary' })}
            >
              Conheça o DiabetesIA
            </a>
            <a
              href="#como-funciona"
              className={styles.secondary}
              onClick={() => track('cta_click', { location: 'hero_secondary' })}
            >
              Como funciona
            </a>
          </div>
          <p className={styles.trust}>Seus dados ficam numa área da sua conta, acessível só por você.</p>
        </div>

        <div className={styles.art}>
          <svg className={styles.blob} viewBox="0 0 400 400" aria-hidden="true">
            <path
              fill="var(--accent-primary)"
              opacity="0.08"
              d="M80 60c60-40 180-40 240 20s60 180 0 240-180 60-240 0S20 120 80 60Z"
            />
          </svg>
          <div className={styles.phoneBack}>
            <PhoneFrame screen={report} eager size="sm" caption={false} />
          </div>
          <div className={styles.phoneFront}>
            <PhoneFrame screen={home} eager size="lg" caption={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
