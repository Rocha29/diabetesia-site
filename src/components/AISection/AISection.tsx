import styles from './AISection.module.css';
import { aiItems } from '../../data/features';
import { IconDroplet, IconMeal, IconPill, IconDocument, IconCompare } from '../Icons';
import { DISCLAIMER } from '../../data/nav';

const iconMap = {
  glucose: IconDroplet,
  food: IconMeal,
  medication: IconPill,
  prescription: IconDocument,
  cross: IconCompare,
};

export function AISection() {
  return (
    <section id="ia" className={styles.section} aria-labelledby="ai-title">
      <div className="container">
        <h2 id="ai-title" className={styles.title}>
          Inteligência Artificial
        </h2>
        <div className={styles.grid}>
          {aiItems.map((item) => {
            const Icon = iconMap[item.accent];
            return (
              <article key={item.id} className={styles.card} data-accent={item.accent}>
                <div className={styles.stripe} />
                <Icon className={styles.icon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
        <p className={`${styles.disclaimer} disclaimer`}>{DISCLAIMER}</p>
      </div>
    </section>
  );
}
