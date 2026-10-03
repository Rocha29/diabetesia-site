import { useState } from 'react';
import styles from './FAQ.module.css';
import { faqItems } from '../../data/faq';
import { IconPlus } from '../Icons';
import { track } from '../../lib/analytics';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    const willOpen = openId !== id;
    setOpenId(willOpen ? id : null);
    if (willOpen) {
      track('faq_open', { question: id });
    }
  }

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className="container">
        <h2 id="faq-title" className={styles.title}>
          Perguntas frequentes
        </h2>
        <div className={styles.list}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={styles.item}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-button-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <span>{item.question}</span>
                  <IconPlus className={`${styles.plus} ${isOpen ? styles.plusOpen : ''}`} />
                </button>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${item.id}`}
                  className={styles.answer}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
