import styles from './Tracking.module.css';

export function Tracking() {
  return (
    <section className={styles.section} aria-labelledby="tracking-title">
      <div className="container">
        <h2 id="tracking-title" className={styles.title}>
          Acompanhamento
        </h2>
        <p className={styles.context}>
          Estamos construindo o acompanhamento por semana, mês e ano aos poucos. A visão semanal
          já está em desenvolvimento; mês e ano ainda são planos para o futuro.
        </p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <span className="badge-wip">Em desenvolvimento</span>
            <h3>Semana</h3>
            <p>
              Um resumo da semana, com gráfico de 7 dias e destaque para hipoglicemias, está em
              desenvolvimento.
            </p>
          </article>

          <article className={`${styles.card} ${styles.faded}`}>
            <span className="badge-wip">Em desenvolvimento</span>
            <h3>Mês</h3>
            <p>O acompanhamento mensal, com comparação objetiva em relação ao mês anterior, ainda está sendo planejado.</p>
          </article>

          <article className={`${styles.card} ${styles.faded}`}>
            <span className="badge-wip">Em desenvolvimento</span>
            <h3>Ano</h3>
            <p>O acompanhamento anual ainda não existe e está nos planos futuros do DiabetesIA.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
