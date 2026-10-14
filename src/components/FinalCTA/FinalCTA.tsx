import styles from './FinalCTA.module.css';
import { TESTER_GUIDE_HREF } from '../../data/nav';
import { track } from '../../lib/analytics';
import { IconArrowRight } from '../Icons';

const availability = [
  { name: 'Android', status: 'Em teste, por convite', live: true },
  { name: 'iPhone', status: 'Ainda não disponível', live: false },
  { name: 'Web', status: 'Ainda não publicada', live: false },
  { name: 'Premium', status: 'Em breve', live: false },
  { name: 'Relógios e sensores', status: 'Planejado', live: false },
];

export function FinalCTA() {
  return (
    <section id="aplicativo" className="section" aria-labelledby="cta-title">
      <div className="container">
        <div className={`${styles.box} reveal`}>
          <div className={styles.copy}>
            <h2 id="cta-title">Recebeu um convite para testar?</h2>
            <p>
              O beta do DiabetesIA é fechado e por convite. O guia do testador mostra, passo a passo,
              como instalar o app no Android e fazer os primeiros registros.
            </p>
            <a
              href={TESTER_GUIDE_HREF}
              className={`btn ${styles.btn}`}
              onClick={() => track('cta_click', { location: 'final' })}
            >
              Abrir o guia do testador
              <IconArrowRight />
            </a>
          </div>
          <div className={styles.side}>
            <h3 className={styles.sideTitle}>Onde o DiabetesIA está hoje</h3>
            <ul className={styles.list}>
              {availability.map((a) => (
                <li key={a.name}>
                  <span className={styles.name}>{a.name}</span>
                  <span className={`${styles.status} ${a.live ? styles.live : ''}`}>
                    <span aria-hidden="true">{a.live ? '●' : '○'}</span> {a.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
