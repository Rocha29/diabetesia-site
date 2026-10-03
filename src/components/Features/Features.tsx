import styles from './Features.module.css';
import { features } from '../../data/features';
import {
  IconGoogle,
  IconDroplet,
  IconReport,
  IconMeal,
  IconPill,
  IconDocument,
  IconChat,
  IconHistory,
  IconCounter,
} from '../Icons';

const iconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  login: IconGoogle,
  glucose: IconDroplet,
  ranges: IconReport,
  food: IconMeal,
  medication: IconPill,
  prescription: IconDocument,
  chat: IconChat,
  history: IconHistory,
  reports: IconCounter,
};

export function Features() {
  return (
    <section id="recursos" className={styles.section} aria-labelledby="features-title">
      <div className="container">
        <h2 id="features-title" className={styles.title}>
          Funcionalidades
        </h2>
        <div className={styles.grid}>
          {features.map((f) => {
            const Icon = iconMap[f.id] ?? IconHistory;
            return (
              <article key={f.id} className={styles.card}>
                <Icon className={styles.icon} />
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
