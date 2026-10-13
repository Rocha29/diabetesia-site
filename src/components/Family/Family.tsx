import type { CSSProperties } from 'react';
import styles from '../Split/Split.module.css';
import own from './Family.module.css';
import { PhoneFrame } from '../PhoneFrame/PhoneFrame';
import { screenById } from '../../data/screens';
import { IconKey, IconEye, IconUserX } from '../Icons';

const steps = [
  {
    icon: IconKey,
    title: 'Convide com um código',
    text: 'Você cria um convite com código de uso único e envia para quem quiser. Se não for usado, ele expira.',
  },
  {
    icon: IconEye,
    title: 'Acompanham só para leitura',
    text: 'Quem aceita vê seus registros, mas não consegue mudar nada. Você vê quando cada pessoa olhou seus dados.',
  },
  {
    icon: IconUserX,
    title: 'Você decide até quando',
    text: 'Remova qualquer pessoa a qualquer momento. Até 5 pessoas, contando os convites pendentes.',
  },
];

export function Family() {
  return (
    <section
      id="familia"
      className={`section ${own.section}`}
      aria-labelledby="familia-title"
      style={{ '--glow': 'var(--hero-glow-3)' } as CSSProperties}
    >
      <div className={`container ${styles.layout} ${styles.reverse}`}>
        <div className={`${styles.copy} reveal`}>
          <p className="eyebrow">Quem me acompanha</p>
          <h2 id="familia-title">Cuidado em família, com o seu consentimento.</h2>
          <p className={styles.lead}>
            Mãe, filho, cuidador ou médico: quem você convidar acompanha seus registros de onde
            estiver — e você continua no controle.
          </p>
          <ol className={styles.steps}>
            {steps.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className={styles.cardIcon}>
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={own.also}>
            Também dá para acompanhar alguém: a aba <strong>Quem eu acompanho</strong> mostra os dados de
            quem convidou você, em modo somente leitura.
          </p>
        </div>

        <div className={`${styles.phones} reveal`}>
          <div className={styles.phoneA}>
            <PhoneFrame screen={screenById.sharing} width={260} />
          </div>
          <div className={styles.phoneB}>
            <PhoneFrame screen={screenById.following} width={260} />
          </div>
        </div>
      </div>
    </section>
  );
}
