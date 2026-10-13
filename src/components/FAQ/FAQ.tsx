import { useState } from 'react';
import styles from './FAQ.module.css';
import { faqItems } from '../../data/faq';
import { DISCLAIMER } from '../../data/nav';
import { IconPlus, IconInfo } from '../Icons';
import { track } from '../../lib/analytics';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    const willOpen = openId !== id;
    setOpenId(willOpen ? id : null);
    if (willOpen) track('faq_open', { question: id });
  }

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.head}>
          <p className="eyebrow">Dúvidas</p>
          <h2 id="faq-title">Perguntas frequentes</h2>
          <p className={styles.sub}>Respostas diretas sobre o que o app faz — e o que ele não faz.</p>
          <p className={`disclaimer ${styles.disclaimer}`}>
            <IconInfo />
            <span>{DISCLAIMER}</span>
          </p>
        </div>
        <div className={styles.list}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <h3 className={styles.q}>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={`faq-painel-${item.id}`}
                    id={`faq-botao-${item.id}`}
                    onClick={() => toggle(item.id)}
                  >
                    <span>{item.question}</span>
                    <IconPlus className={styles.plus} />
                  </button>
                </h3>
                <div
                  id={`faq-painel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-botao-${item.id}`}
                  className={styles.answer}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                  {item.link && (
                    <p className={styles.link}>
                      <a href={item.link.href}>{item.link.label}</a>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
