import styles from './Story.module.css';

const principles = [
  { title: 'Discreto', text: 'Sem expor a condição de ninguém para quem está em volta.' },
  { title: 'Simples', text: 'Começar pelo básico, sem cobrança e sem sobrecarga.' },
  { title: 'Acolhedor', text: 'Apoio da família, sempre com o consentimento de quem é cuidado.' },
];

/** Founder story — intentionally does not identify the person it is about. */
export function Story() {
  return (
    <section id="historia" className={styles.section} aria-labelledby="story-title">
      <div className="container">
        <p className={styles.eyebrow}>Por que o DiabetesIA existe</p>
        <h2 id="story-title" className={styles.title}>
          Nasceu de uma história real.
        </h2>
        <div className={styles.body}>
          <p>
            O DiabetesIA começou dentro de casa. Uma pessoa muito próxima de mim convive com o
            diabetes e precisa de insulina, mas nem sempre consegue manter a rotina de aplicações,
            medições e alimentação. Tentamos um sensor de glicose, mas ela não se sentiu bem com um
            aparelho que mostrava a todos que ela tinha a doença.
          </p>
          <p>
            Foi aí que entendi que o desafio não era só tecnológico. Para muita gente, aceitar o
            diabetes já é difícil — e a ferramenta precisa ser <strong>discreta, simples e
            acolhedora</strong>, sem julgamento.
          </p>
          <p>
            O DiabetesIA quer ajudar quem vive essa situação a dar os primeiros passos para um
            controle básico, e permitir que a família apoie de perto — sempre com o consentimento
            de quem está sendo cuidado.
          </p>
        </div>
        <ul className={styles.principles}>
          {principles.map((p) => (
            <li key={p.title} className={styles.principle}>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
