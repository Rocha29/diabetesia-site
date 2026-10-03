import styles from './Problem.module.css';
import { IconDroplet, IconMeal, IconPill } from '../Icons';

const items = [
  { icon: IconDroplet, text: 'A glicemia de cada horário anotada num caderno.' },
  { icon: IconMeal, text: 'O que foi comido guardado só na memória.' },
  { icon: IconPill, text: 'O remédio e a dose registrados em outro app.' },
];

export function Problem() {
  return (
    <section className={styles.section} aria-labelledby="problem-title">
      <div className="container">
        <h2 id="problem-title" className={styles.title}>
          O desafio
        </h2>
        <p className={styles.lead}>
          Cuidar do diabetes no dia a dia envolve muitas anotações: a glicemia de cada horário, o
          que foi comido, qual remédio foi tomado e em qual dose. Anotar tudo isso manualmente é
          cansativo, e é fácil perder o fio da meada — principalmente quando mais de uma pessoa
          participa do cuidado, como um familiar ou cuidador.
        </p>
        <ul className={styles.list}>
          {items.map(({ icon: Icon, text }, i) => (
            <li key={i} className={styles.item}>
              <Icon className={styles.icon} />
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
