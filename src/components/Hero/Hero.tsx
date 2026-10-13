import styles from './Hero.module.css';
import { PhoneFrame } from '../PhoneFrame/PhoneFrame';
import { screenById } from '../../data/screens';
import { TESTER_GUIDE_HREF } from '../../data/nav';
import { track } from '../../lib/analytics';
import { IconArrowRight, IconTextSize, IconUsers, IconCheck } from '../Icons';

const facts = [
  { icon: IconCheck, text: 'Você confere antes de salvar' },
  { icon: IconUsers, text: 'Família acompanha só para leitura' },
  { icon: IconTextSize, text: 'Letras grandes e cores seguras' },
];

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glow1} />
        <span className={styles.glow2} />
        <span className={styles.glow3} />
        <span className={styles.grid} />
      </div>

      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" />
            Nova versão em teste no Android
          </p>
          <h1 id="hero-title" className={styles.title}>
            O diabetes do dia a dia, <span className={styles.accent}>organizado em poucos toques.</span>
          </h1>
          <p className={styles.lead}>
            Registre glicemia, refeições, remédios e pressão com um toque ou uma foto, leve um
            resumo para a consulta e deixe quem cuida de você acompanhar, só para leitura.
          </p>
          <div className={styles.ctas}>
            <a href={TESTER_GUIDE_HREF} className="btn btn-primary" onClick={() => track('cta_click', { location: 'hero_primary' })}>
              Guia do testador
              <IconArrowRight />
            </a>
            <a href="#novidades" className="btn btn-ghost" onClick={() => track('cta_click', { location: 'hero_secondary' })}>
              Ver as novidades
            </a>
          </div>
          <p className={styles.note}>Teste fechado, por convite. Ainda não está na Play Store.</p>

          <ul className={styles.facts}>
            {facts.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.art}>
          <div className={`${styles.phone} ${styles.left}`}>
            <PhoneFrame screen={screenById.assistant} width={250} decorative />
          </div>
          <div className={`${styles.phone} ${styles.right}`}>
            <PhoneFrame screen={screenById.sharing} width={250} decorative />
          </div>
          <div className={`${styles.phone} ${styles.center}`}>
            <PhoneFrame screen={screenById.home} width={300} eager />
          </div>
          <p className={styles.chipA} aria-hidden="true">
            <span className={styles.chipIcon} data-tone="ok">●</span> Na faixa geral
          </p>
          <p className={styles.chipB} aria-hidden="true">
            <span className={styles.chipIcon} data-tone="lock">
              <IconUsers />
            </span>
            Só leitura
          </p>
        </div>
      </div>
      <p className={`container ${styles.caption}`}>Telas reais do app, com dados de demonstração.</p>
    </section>
  );
}
