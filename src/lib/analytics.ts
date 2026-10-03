/**
 * Analytics "stub": por enquanto não enviamos dados a nenhum serviço externo.
 * `track` apenas emite um CustomEvent('diabetesia:track') no document, com
 * { event, props } no detail. Isso permite observar os eventos no DevTools
 * (Console > Event Listeners, ou document.addEventListener) sem depender de
 * credenciais ou bibliotecas de terceiros.
 *
 * Como plugar um serviço de analytics depois:
 * 1. Crie um listener em main.tsx (ou num módulo próprio), por exemplo:
 *      document.addEventListener('diabetesia:track', (e) => {
 *        const { event, props } = (e as CustomEvent).detail;
 *        meuServico.send(event, props);
 *      });
 * 2. Ou substitua o corpo da função `track` abaixo para chamar o SDK do
 *    serviço escolhido diretamente, mantendo a mesma assinatura
 *    `track(event, props)` usada pelos componentes.
 * 3. Nunca coloque chaves/segredos de analytics no código do front-end;
 *    prefira um proxy no backend, assim como já é feito com a IA.
 */
export type TrackProps = Record<string, string | number | boolean | undefined>;

export function track(event: string, props: TrackProps = {}): void {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(
    new CustomEvent('diabetesia:track', {
      detail: { event, props, timestamp: Date.now() },
    }),
  );
}
