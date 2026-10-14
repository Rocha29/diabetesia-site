import styles from './Accessibility.module.css';
import { IconTextSize, IconEye, IconCheck } from '../Icons';

const items = [
  {
    icon: IconTextSize,
    title: 'Letras feitas para ler',
    text: 'A fonte Atkinson Hyperlegible Next diferencia letras parecidas, como I, l e 1. E você escolhe o tamanho do texto: Normal, Grande ou Extra grande.',
  },
  {
    icon: IconEye,
    title: 'Mais contraste, botões maiores',
    text: 'Cores com contraste alto, áreas de toque grandes e abas com nome, não só ícone.',
  },
  {
    icon: IconCheck,
    title: 'Nunca só pela cor',
    text: 'A situação da glicemia aparece sempre com forma, palavra e cor, e fica legível também para quem tem daltonismo.',
  },
];

export function Accessibility() {
  return (
    <section id="acessibilidade" className="section" aria-labelledby="a11y-title">
      <div className="container">
        <div className={styles.layout}>
          <div className="reveal">
            <p className="eyebrow">Acessibilidade</p>
            <h2 id="a11y-title">Fácil de ler, em qualquer idade.</h2>
            <div className={styles.list}>
              {items.map(({ icon: Icon, title, text }) => (
                <div key={title} className={styles.item}>
                  <span className={styles.icon}>
                    <Icon />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <figure className={`${styles.demo} reveal`}>
            <div className={styles.sample} aria-hidden="true">
              <span className={styles.aa}>Aa</span>
              <span className={styles.glyphs}>I l 1 · O 0 · rn m</span>
            </div>
            <ul className={styles.legend}>
              <li data-s="vlow">
                <span className={styles.shape} aria-hidden="true">▼▼</span>
                <strong>Muito baixa</strong>
                <span className={styles.range}>abaixo de 54</span>
              </li>
              <li data-s="low">
                <span className={styles.shape} aria-hidden="true">▼</span>
                <strong>Baixa</strong>
                <span className={styles.range}>54 a 69</span>
              </li>
              <li data-s="ok">
                <span className={styles.shape} aria-hidden="true">●</span>
                <strong>Na faixa geral</strong>
                <span className={styles.range}>70 a 180</span>
              </li>
              <li data-s="high">
                <span className={styles.shape} aria-hidden="true">▲</span>
                <strong>Alta</strong>
                <span className={styles.range}>acima de 180</span>
              </li>
            </ul>
            <figcaption>
              Legenda como aparece no app (mg/dL). As faixas são gerais: a sua meta é definida com o
              seu médico.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
