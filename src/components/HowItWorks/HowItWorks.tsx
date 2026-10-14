import type { CSSProperties } from 'react';
import styles from './HowItWorks.module.css';
import { IconBolt, IconCheck, IconChart, IconDocument } from '../Icons';

const steps = [
  {
    icon: IconBolt,
    title: 'Registre',
    text: 'Um toque no Registro rápido ou uma foto do glicosímetro, da embalagem do remédio ou da receita.',
  },
  {
    icon: IconCheck,
    title: 'Confira',
    text: 'O app mostra o que entendeu e nada é salvo antes de você conferir e confirmar.',
  },
  {
    icon: IconChart,
    title: 'Acompanhe',
    text: 'Histórico por tipo, resumo do dia, da semana, do mês e do ano, e a Minha jornada.',
  },
  {
    icon: IconDocument,
    title: 'Leve para a consulta',
    text: 'Salve o relatório do período em PDF e, se quiser, deixe a família acompanhar só para leitura.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head center reveal">
          <p className="eyebrow">Como funciona</p>
          <h2 id="how-title">Quatro passos, nenhum caderno.</h2>
          <p>Feito para quem quer começar pelo básico, sem cobrança e sem complicação.</p>
        </div>
        <ol className={styles.steps}>
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={`${styles.step} reveal`} style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}>
              <div className={styles.top}>
                <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.icon}>
                  <Icon />
                </span>
              </div>
              <h3>
                <span className="visually-hidden">Passo {i + 1}: </span>
                {title}
              </h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
