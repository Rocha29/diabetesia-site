import styles from './Audience.module.css';
import { IconDroplet, IconUsers } from '../Icons';

const items = [
  {
    icon: IconDroplet,
    text: 'Pessoas que convivem com diabetes, que querem organizar o registro da glicemia, das refeições e dos medicamentos no dia a dia.',
  },
  {
    icon: IconUsers,
    text: 'Familiares e cuidadores, que ajudam a acompanhar os registros de quem cuidam.',
  },
];

export function Audience() {
  return (
    <section className={styles.section} aria-labelledby="audience-title">
      <div className="container">
        <h2 id="audience-title" className={styles.title}>
          Para quem é
        </h2>
        <div className={styles.grid}>
          {items.map(({ icon: Icon, text }, i) => (
            <article key={i} className={styles.card}>
              <Icon className={styles.icon} />
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
