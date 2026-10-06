import styles from './Roadmap.module.css';
import { roadmapItems } from '../../data/roadmap';

export function Roadmap() {
  return (
    <section id="novidades" className={styles.section} aria-labelledby="roadmap-title">
      <div className="container">
        <h2 id="roadmap-title" className={styles.title}>
          O que vem na nova versão
        </h2>
        <p className={styles.context}>
          Estas funcionalidades estão sendo construídas na versão web (V2), que ainda não foi
          publicada. Elas aparecem aqui para mostrar o rumo do projeto, e não como recursos já
          disponíveis.
        </p>

        <div className={styles.grid}>
          {roadmapItems.map((item) => (
            <article key={item.id} className={`${styles.card} ${item.status === 'planned' ? styles.planned : ''}`}>
              <span className="badge-wip">{item.status === 'wip' ? 'Em desenvolvimento' : 'Planejado'}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
