import styles from './HowItWorks.module.css';

const steps = [
  { n: '01', title: 'Registre', text: 'Abra o app e escolha o que quer registrar: glicemia, refeição, medicamento ou receita médica.' },
  { n: '02', title: 'Envie', text: 'Tire uma foto do glicosímetro, da refeição, do remédio ou da receita médica.' },
  { n: '03', title: 'Analise', text: 'A inteligência artificial lê a foto e ajuda a preencher o registro automaticamente.' },
  { n: '04', title: 'Acompanhe', text: 'Veja seu histórico, seus relatórios e a evolução dos seus registros ao longo do tempo.' },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-title">
      <div className="container">
        <h2 id="how-title" className={styles.title}>
          Como funciona
        </h2>
        <div className={styles.track}>
          {steps.map((step) => (
            <article key={step.n} className={styles.card}>
              <span className={styles.number}>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
