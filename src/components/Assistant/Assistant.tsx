import styles from '../Split/Split.module.css';
import { PhoneFrame } from '../PhoneFrame/PhoneFrame';
import { screenById } from '../../data/screens';
import { IconBolt, IconSparkle, IconCheck, IconInfo } from '../Icons';

const instant = [
  'Criar lembrete de remédio',
  'Cadastrar consulta',
  'Registrar glicemia, refeição ou remédio',
  'Dúvidas sobre o app',
];

export function Assistant() {
  return (
    <section id="assistente" className="section" aria-labelledby="assistente-title">
      <div className={`container ${styles.layout}`}>
        <div className={`${styles.copy} reveal`}>
          <p className="eyebrow">Assistente</p>
          <h2 id="assistente-title">Peça, confira e pronto.</h2>
          <p className={styles.lead}>
            O assistente guia você um passo de cada vez, mostra um resumo para conferir e só salva
            quando você confirma.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardIcon}>
                  <IconBolt />
                </span>
                <h3>Na hora, sem IA</h3>
              </div>
              <ul className={styles.checks}>
                {instant.map((t) => (
                  <li key={t}>
                    <IconCheck />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardIcon}>
                  <IconSparkle />
                </span>
                <h3>Perguntas abertas, com IA</h3>
              </div>
              <p>
                Escreva uma pergunta geral sobre diabetes. A resposta usa IA e pode levar um pouco
                mais. Não é diagnóstico nem orientação de dose: dúvidas sobre o seu tratamento são
                com o seu médico.
              </p>
            </div>
          </div>

          <p className={styles.honest}>
            <IconInfo />
            <span>O assistente ainda não vê os seus registros. Ele ajuda com o app e com dúvidas gerais.</span>
          </p>
        </div>

        <div className={`${styles.phones} reveal`}>
          <div className={styles.phoneA}>
            <PhoneFrame screen={screenById.chat} width={260} />
          </div>
          <div className={styles.phoneB}>
            <PhoneFrame screen={screenById.assistant} width={260} />
          </div>
        </div>
      </div>
    </section>
  );
}
