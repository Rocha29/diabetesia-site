import type { CSSProperties } from 'react';
import styles from './Solution.module.css';
import { IconDroplet, IconMeal, IconPill, IconHistory, IconArrowRight } from '../Icons';

const inputs = [
  { icon: IconDroplet, label: 'Glicemia', color: 'var(--glucose-in-range)' },
  { icon: IconMeal, label: 'Refeição', color: 'var(--accent-warm)' },
  { icon: IconPill, label: 'Medicamento', color: 'var(--accent-secondary)' },
  { icon: IconHistory, label: 'Histórico', color: 'var(--text-hint)' },
];

export function Solution() {
  return (
    <section className={styles.section} aria-labelledby="solution-title">
      <div className="container">
        <h2 id="solution-title" className={styles.title}>
          A solução
        </h2>
        <p className={styles.lead}>
          O DiabetesIA ajuda a registrar essas informações de forma mais simples, usando fotos e
          inteligência artificial para preencher boa parte do trabalho manual. Você tira uma foto
          do glicosímetro, da refeição, do medicamento ou da receita, e o app organiza esses dados
          num histórico que pode ser acompanhado ao longo do tempo.
        </p>

        <div className={styles.diagram}>
          <div className={styles.inputs}>
            {inputs.map(({ icon: Icon, label, color }) => (
              <div key={label} className={styles.chip} style={{ '--chip-color': color } as CSSProperties}>
                <Icon className={styles.chipIcon} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <IconArrowRight className={styles.arrow} />

          <div className={styles.center}>DiabetesIA</div>

          <IconArrowRight className={styles.arrow} />

          <div className={styles.output}>Contexto para você e seu médico</div>
        </div>
      </div>
    </section>
  );
}
