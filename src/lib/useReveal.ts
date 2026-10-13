import { useEffect } from 'react';

/**
 * Observa todos os elementos com a classe "reveal" e adiciona "revealed" quando
 * entram na viewport. A classe "js-reveal" no <html> só é colocada aqui, então
 * sem JS (ou sem IntersectionObserver) o conteúdo fica 100% visível. O CSS só
 * anima dentro de `prefers-reduced-motion: no-preference`.
 */
export function useRevealAll(): void {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    // Elementos já na tela no carregamento aparecem sem esperar.
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh) el.classList.add('revealed');
      else observer.observe(el);
    });
    root.classList.add('js-reveal');
    return () => observer.disconnect();
  }, []);
}
