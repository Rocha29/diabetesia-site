import styles from './Tracking.module.css';

export function Tracking() {
  return (
    <section className={styles.section} aria-labelledby="tracking-title">
      <div className="container">
        <h2 id="tracking-title" className={styles.title}>
          Acompanhamento
        </h2>
        <p className={styles.context}>
          O acompanhamento por período está em desenvolvimento na versão web (V2), ainda não
          publicada. Ele mostra somente o que você registrou: quando não há dados suficientes, a
          tela avisa em vez de preencher um número.
        </p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <span className="badge-wip">Em desenvolvimento</span>
            <h3>Hoje</h3>
            <p>Um resumo do dia, com as medições e as refeições registradas.</p>
          </article>

          <article className={styles.card}>
            <span className="badge-wip">Em desenvolvimento</span>
            <h3>Semana</h3>
            <p>
              Resumo da semana, com gráfico de 7 dias, faixas de glicemia e destaque para
              hipoglicemias.
            </p>
          </article>

          <article className={styles.card}>
            <span className="badge-wip">Em desenvolvimento</span>
            <h3>Mês</h3>
            <p>O mês, com comparação objetiva em relação ao mês anterior.</p>
          </article>

          <article className={styles.card}>
            <span className="badge-wip">Em desenvolvimento</span>
            <h3>Ano</h3>
            <p>A visão do ano, para acompanhar a evolução dos seus registros ao longo do tempo.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
