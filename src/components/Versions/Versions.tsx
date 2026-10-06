import styles from './Versions.module.css';

export function Versions() {
  return (
    <section className={styles.section} aria-labelledby="versions-title">
      <div className="container">
        <h2 id="versions-title" className={styles.title}>
          O DiabetesIA está evoluindo
        </h2>
        <p className={styles.lead}>
          O DiabetesIA começou como um aplicativo Android, a nossa versão V1. Agora estamos
          construindo uma nova experiência, em versão web, a V2, com o mesmo cuidado e os mesmos
          objetivos: ajudar você a organizar o registro do seu diabetes no dia a dia. As duas
          versões convivem enquanto a nova experiência é desenvolvida.
        </p>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>V1</h3>
            <ul>
              <li>Aplicativo Flutter.</li>
              <li>Disponível como APK de teste interno no Android.</li>
              <li>Relatórios em PDF, compartilháveis.</li>
            </ul>
          </article>
          <article className={styles.card}>
            <h3>V2</h3>
            <ul>
              <li>Nova experiência em React, para a web.</li>
              <li>Relatórios exportados por impressão do navegador ("Salvar como PDF").</li>
              <li>Acompanhamento por dia, semana, mês e ano, lembretes, consultas e relatório com PDF, CSV e JSON.</li>
              <li>Em desenvolvimento, ainda não publicada.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
