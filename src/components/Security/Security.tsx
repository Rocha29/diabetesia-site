import styles from './Security.module.css';
import { IconLock, IconCloud } from '../Icons';
import { DISCLAIMER } from '../../data/nav';

const items = [
  'Seus dados ficam no Firebase (Google), numa área acessível só pela sua própria conta.',
  'As chaves de inteligência artificial ficam apenas no nosso servidor, nunca no aplicativo.',
  'Os registros do servidor não guardam o conteúdo das fotos e dos textos enviados.',
  'Na versão web, as fotos não são guardadas; no Android, elas ficam no próprio celular.',
  'A IA na nuvem recebe apenas a foto e o texto da análise, sem seu nome ou e-mail.',
];

export function Security() {
  return (
    <section className={styles.section} aria-labelledby="security-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="security-title">Privacidade e segurança</h2>
          <ul className={styles.list}>
            {items.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <p className={styles.links}>
            Saiba mais:{' '}
            <a href="privacidade/">Política de Privacidade</a> e{' '}
            <a href="termos/">Termos de Uso</a>.
          </p>
          <p className={`disclaimer ${styles.disclaimer}`}>{DISCLAIMER}</p>
        </div>
        <div className={styles.art} aria-hidden="true">
          <IconLock className={styles.icon} />
          <IconCloud className={styles.icon} />
        </div>
      </div>
    </section>
  );
}
