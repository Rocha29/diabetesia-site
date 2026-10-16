import styles from './Security.module.css';
import { IconLock, IconEye, IconCheck, IconShield, IconDocument, IconUserX } from '../Icons';

const items = [
  {
    icon: IconLock,
    title: 'Seus dados, sua conta',
    text: 'Os registros ficam numa área ligada à sua conta, acessível só por você.',
  },
  {
    icon: IconEye,
    title: 'Compartilhar é escolha sua',
    text: 'Só quem você convidar acompanha, e apenas para leitura. Você remove quando quiser.',
  },
  {
    icon: IconCheck,
    title: 'Você confere antes de salvar',
    text: 'O que a IA leu numa foto aparece para você revisar. Nada entra no histórico sem a sua confirmação.',
  },
  {
    icon: IconShield,
    title: 'IA com a sua autorização',
    text: 'Na leitura por foto, o Gemini, do Google, recebe a imagem ou o texto da análise, sem o seu nome nem o seu e-mail. No plano gratuito, o Google pode usar esse conteúdo para melhorar os produtos dele. A IA só funciona se você autorizar.',
  },
  {
    icon: IconDocument,
    title: 'Seus dados com você',
    text: 'Veja quantos registros você tem na tela Privacidade do app. A exportação completa ainda está em construção.',
  },
  {
    icon: IconUserX,
    title: 'Saída fácil',
    text: 'Apague seus registros direto no app. A exclusão da conta pelo app ainda está em construção.',
  },
];

export function Security() {
  return (
    <section id="privacidade" className={`section ${styles.section}`} aria-labelledby="privacidade-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Privacidade e segurança</p>
          <h2 id="privacidade-title">Dado de saúde é assunto sério.</h2>
          <p>
            Por isso o DiabetesIA pede só o necessário e deixa você no controle. Este site não usa
            cookies nem rastreadores de terceiros.
          </p>
        </div>
        <ul className={styles.grid}>
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className={`${styles.card} reveal`}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
        <p className={styles.links}>
          Saiba mais na <a href="privacidade/">Política de Privacidade</a> e nos{' '}
          <a href="termos/">Termos de Uso</a>.
        </p>
      </div>
    </section>
  );
}
