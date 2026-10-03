import { useEffect, useRef } from 'react';

/**
 * Observa um elemento e adiciona a classe "revealed" quando ele entra na
 * viewport. O CSS base (global.css) mantém o conteúdo 100% visível sem JS;
 * a classe "reveal" só aplica opacidade/translateY dentro de
 * `@media (prefers-reduced-motion: no-preference)`, então mesmo sem este
 * hook (ou com JS desabilitado) o conteúdo aparece normalmente.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('revealed');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
