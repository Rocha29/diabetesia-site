# DiabetesIA — Especificação visual do site

Identidade própria, aparentada ao app (não idêntica): menos "azul hospitalar", mais calma/humana. Base: tons petróleo/teal + areia quente, com o azul do app reduzido a acento secundário.

## 1. Tokens CSS

```css
:root {
  /* Superfícies */
  --bg: #faf8f4;              /* areia claro, não branco puro */
  --surface: #ffffff;
  --surface-alt: #f1efe8;     /* cards alternados */
  --border: #e4e0d4;

  /* Texto */
  --text-primary: #16211f;
  --text-secondary: #5a655f;
  --text-hint: #94998f;

  /* Acentos */
  --accent-primary: #0f6e66;   /* teal petróleo — autoral, não o #2196F3 do app */
  --accent-primary-dark: #0a4f49;
  --accent-secondary: #2f7fd1; /* eco do azul do app, só em detalhes/links */
  --accent-warm: #d97a3f;      /* CTA quente, contraste com teal */

  /* Faixas de glicose (ilustrações) — herdadas do app, não recriadas */
  --glucose-low: #c23b3b;
  --glucose-low-bg: #fbe4e0;
  --glucose-in-range: #2f8f5b;
  --glucose-in-range-bg: #e1f1e6;
  --glucose-high: #c97a1f;
  --glucose-high-bg: #fbe9d4;

  --shadow-soft: 0 2px 10px rgba(22, 33, 31, 0.06);
  --shadow-card: 0 6px 20px rgba(22, 33, 31, 0.08);

  --radius-sm: 8px; --radius-md: 14px; --radius-lg: 22px; --radius-pill: 100px;
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 20px;
  --space-5: 32px; --space-6: 48px; --space-7: 72px; --space-8: 104px;

  --container-max: 1160px;
  --gutter: 20px; /* 16px abaixo de 375px */

  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif; /* @fontsource/plus-jakarta-sans: 500,600,700,800 */
  --font-body: 'Inter', system-ui, sans-serif;             /* @fontsource/inter: 400,500,600 */

  --fs-h1: clamp(2rem, 1.3rem + 3vw, 3.4rem);
  --fs-h2: clamp(1.5rem, 1.15rem + 1.6vw, 2.25rem);
  --fs-h3: clamp(1.15rem, 1rem + 0.6vw, 1.4rem);
  --fs-body: clamp(1rem, 0.95rem + 0.2vw, 1.0625rem);
  --fs-small: 0.875rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #10161a; --surface: #161e22; --surface-alt: #1c2529; --border: #263037;
    --text-primary: #eef1ee; --text-secondary: #a9b3ab; --text-hint: #6c766e;
    --accent-primary: #2fa89b; --accent-primary-dark: #4fc3b5; --accent-secondary: #6ba9e8; --accent-warm: #e39157;
    --glucose-low-bg: #3a1f1f; --glucose-in-range-bg: #1c3025; --glucose-high-bg: #352611;
    --shadow-soft: 0 2px 10px rgba(0,0,0,0.3); --shadow-card: 0 8px 24px rgba(0,0,0,0.4);
  }
}
```

Grid: container 1160px, gutter 20px (16px <375px), colunas via CSS Grid 12col em ≥1024px, flex/stack abaixo.

## 2. Header sticky
Desktop: altura 72px, `background: var(--surface)` com `border-bottom: 1px solid var(--border)`, logo (coração+pulso simplificado, inline SVG, cor `--accent-primary`) à esquerda, nav central (Solução, Como funciona, IA, Funcionalidades, Privacidade, FAQ), CTA pill "Conhecer o app" (`--accent-warm`) à direita. `position: sticky; top:0; z-index:50`. Scroll >24px adiciona `--shadow-soft`.
Mobile (<1024px): logo + botão hamburger (3 traços, 44×44px toque) à direita. Menu abre painel full-screen `--surface`, itens em lista 56px altura cada, fecha com X. `aria-expanded`, foco preso no painel, Esc fecha.

## 3. Hero
Desktop: grid 2 colunas (55/45). Esquerda: eyebrow pequeno "Acompanhamento com apoio de IA", H1 ("Organize glicemia, refeições e medicamentos — com contexto"), parágrafo, dois CTAs (primário sólido `--accent-warm`, secundário outline), nota de disclaimer em `--fs-small`/`--text-secondary`. Direita: composição de 2 celulares (moldura CSS, ver seção 17) com **screenshots reais da V2** (390×844, WebP com fallback PNG via `<picture>`), o de trás menor e levemente rotacionado (-6deg) mostrando "Relatórios", o da frente maior mostrando "Home". Ambas as imagens do Hero carregam **sem** `loading="lazy"` (acima da dobra — usar `loading="eager"`/omitir o atributo e, se suportado, `fetchpriority="high"` na imagem da frente). Fundo da seção `--surface-alt` com uma forma orgânica (blob SVG sutil, `--accent-primary` a 8% opacidade) atrás dos celulares — não gradiente chapado.
Mobile: stack vertical, texto centralizado, 1 único celular (Home, mesma regra de carregamento eager), CTAs full-width empilhados.

## 4. Desafio
Desktop: 3 colunas curtas (cartão sem borda, só ícone + frase), tom: dispersão de informação (glicemia num caderno, refeição na memória, remédio em outro app). Sem estatísticas inventadas.
Mobile: stack, divisores finos `--border` entre itens.

## 5. Solução (diagrama)
Diagrama horizontal (desktop): 4 chips de entrada em linha (Glicemia / Refeição / Medicamento / Histórico, cada um com cor de acento própria e ícone) → seta → chip central "DiabetesIA" (`--accent-primary`, maior, com leve `--shadow-card`) → seta → chip de saída "Contexto para você e seu médico". Setas como `<svg>` finas com `stroke: var(--text-hint)`.
Mobile: diagrama vertical, chips empilhados, setas viram linhas verticais curtas com seta para baixo.

## 6. Como funciona (4 passos)
Desktop: 4 cards em linha, numeração grande (01–04) em `--font-sans` 700, `--surface` com `--border`, ícone + título + frase curta (Registrar → IA analisa → Veja o contexto → Acompanhe a evolução).
Mobile: carrossel com scroll-snap horizontal, 1 card visível + pedaço do próximo (peek 12%), dots abaixo.

## 7. IA (cards: glicemia, refeição, medicamento, receita, cruzamento)
Desktop: grid 5 colunas em ≥1280px (quebra para 3+2 em 1024–1279, 2 col em tablet). Cada card: topo com faixa de cor de 4px no acento correspondente, ícone, título, 1 frase factual (ex.: receita = "lê os medicamentos da receita e compara com o que você registrou"). Hover: `translateY(-4px)` + `--shadow-card`, transição 160ms ease.
Mobile: 1 coluna, cards com padding 20px.

## 8. Funcionalidades (só o que existe)
Desktop: grid 3 colunas, cards iguais aos de IA mas ícone bicolor neutro. Listar apenas: login Google, glicemia, refeições, medicamentos, receitas, chat, histórico, relatórios (PDF/impressão), contador de uso diário de IA.
Mobile: 1 coluna.

## 9. Acompanhamento (Semana/Mês/Ano)
Desktop: 3 cards lado a lado. "Semana" com conteúdo real (resumo, gráfico 7 dias, hipoglicemias em destaque) e selo pill "Em desenvolvimento" (`background: var(--surface-alt); border:1px solid var(--border); color:var(--text-secondary)`, nunca vermelho/alerta). "Mês" e "Ano" com mesmo card mas conteúdo tênue (`opacity:0.6`) e mesmo selo. Nenhuma promessa de data.
Mobile: stack vertical.

## 10. Galeria de telas
Desktop: carrossel com setas laterais + dots, 3 celulares visíveis por vez (anterior/atual/próximo, atual em destaque). Telas: Home, Glicemia, Refeição (com foto), Receita, Chat, Relatórios, Acompanhamento semanal, Perfil, Login — 9 screenshots reais da V2 (390×844, capturados do app com dados fictícios de demonstração). Legenda fixa abaixo do carrossel: "Telas reais do app com dados de demonstração" (`--fs-small`, `--text-hint`).
Mobile: scroll-snap horizontal nativo (`scroll-snap-type: x mandatory`), 1 celular por vez com peek de 8%, sem JS obrigatório para navegar (scroll funciona sem JS; setas/dots são enhancement).
Carregamento: todas as imagens da galeria usam `loading="lazy"` (exceto, se a primeira do carrossel ficar visível no primeiro viewport em telas muito altas, essa única pode usar `loading="eager"` — por padrão, tratar a seção inteira como abaixo da dobra e usar lazy).

## 11. V1 e V2
Desktop: 2 colunas lado a lado sob título "O mesmo produto, evoluindo". Cada coluna: nome, 3 bullets de característica real (V1: Flutter, Android teste interno, PDF compartilhável; V2: React web, impressão para PDF), sem comparação de "melhor/pior".
Mobile: stack, V1 acima de V2.

## 12. Privacidade e segurança
Desktop: 2 colunas — texto (bullets factuais: dados no Firebase por conta, chaves de IA só no servidor, logs sem conteúdo, fotos não guardadas na web) + ilustração simples (cadeado + nuvem em SVG linear, sem glassmorphism). Aviso fixo em destaque num bloco `--surface-alt` com borda esquerda 3px `--accent-primary`: "O DiabetesIA é uma ferramenta de apoio e acompanhamento. Ele não substitui o acompanhamento de profissionais de saúde."
Mobile: stack, ilustração acima do texto, aviso mantém destaque.

## 13. Para quem é
Desktop: 3–4 cards curtos (pessoas que registram glicemia no dia a dia, quem toma múltiplos medicamentos, quem quer levar contexto ao médico, cuidadores). Sem claims médicos.
Mobile: 1 coluna.

## 14. FAQ (accordion acessível)
Desktop: lista única largura 720px centralizada. Cada item: `<button aria-expanded> + <div role="region">`, ícone "+" que gira 45° (`transform: rotate(45deg)`, transição 160ms) ao abrir. Perguntas sobre: disponibilidade real (Android teste interno, sem Play Store, sem iPhone, web não publicada), preço (não definido), privacidade, o que a IA faz e não faz.
Mobile: mesmo padrão, full-width.

## 15. CTA final
Desktop: faixa `--accent-primary` sólida (não gradiente), texto claro, 1 CTA (`--accent-warm`), subtexto de disclaimer.
Mobile: mesma faixa, texto centralizado, CTA full-width.

## 16. Footer
Desktop: 4 colunas (logo+frase curta, navegação, legal/privacidade, aviso de apoio repetido em `--fs-small`). `background: var(--surface-alt)`. Sem redes sociais inventadas, sem links de app stores (não publicado).
Mobile: stack, colunas em acordeão simples ou lista direta.

## 17. Screenshots reais em moldura CSS

As telas do app deixam de ser desenhadas em HTML/CSS: usar **screenshots reais da V2**, capturados do app rodando com dados fictícios de demonstração (nunca dados de pessoas reais), em `390×844`, formato WebP com fallback PNG. A moldura de celular continua feita em CSS, agora envolvendo a `<img>`/`<picture>` em vez de markup de interface.

Moldura: `div.phone` — largura responsiva (ex. `clamp(220px, 28vw, 280px)` no desktop, `240px` no mobile), `border-radius: 36px`, `border: 10px solid #1a1a1a` (ou `--text-primary` no dark), `overflow: hidden`, notch central superior sobreposto (`div` 90×18px, `border-radius:0 0 12px 12px`, `background:#1a1a1a`, `position:absolute`). A imagem interna ocupa 100% da área útil da moldura com `object-fit: cover`.

**Proporção fixa (evitar layout shift):** o contêiner da imagem define `aspect-ratio: 390 / 844` e a tag `<img>` recebe `width="390" height="844"` (atributos HTML, independente do tamanho CSS exibido), garantindo que o espaço já exista antes da imagem carregar.

**Markup de referência:**
```html
<picture>
  <source srcset="/screens/home.webp" type="image/webp">
  <img src="/screens/home.png" width="390" height="844"
       alt="Tela Home do DiabetesIA mostrando resumo do dia"
       loading="lazy" decoding="async">
</picture>
```
No Hero, omitir `loading="lazy"` (usar carregamento eager, conforme seção 3); em todas as demais seções (galeria, etc.), manter `loading="lazy"`.

Telas a capturar (9, todas com dados fictícios de demonstração — ex. glicemia 112 mg/dL, refeição "arroz, feijão, frango grelhado", medicamento "Metformina 500mg"): Home, Glicemia, Refeição (com foto), Receita, Chat, Relatórios, Acompanhamento semanal, Perfil, Login.

Cada screenshot, imediatamente abaixo da moldura, leva `<p class="caption">Telas reais do app com dados de demonstração</p>` (`--fs-small`, `--text-hint`, centralizado). Os arquivos de origem (export de `src/data/screens.ts` ou equivalente) devem ficar organizados por nome de tela para facilitar substituição futura.

## 18. Ícones
Inline SVG próprios, 24×24, `stroke-width: 1.75`, `stroke: currentColor`, `fill: none` — estilo linear consistente (não usar Material Icons do app, para diferenciar identidades). Nenhum emoji em cards finais; emoji só é aceitável, se nunca, em microcopy informal (evitar completamente).

## 19. Microinterações
- Hover em cards/botões: `transform: translateY(-2px to -4px)` + sombra, 150–200ms `ease-out`.
- Foco visível: `outline: 2px solid var(--accent-secondary); outline-offset: 2px` em todos elementos interativos (nunca `outline: none` sem substituto).
- Reveal ao rolar: `opacity/translateY` sutil (8px, 300ms), envolto em `@media (prefers-reduced-motion: no-preference)`; conteúdo nasce 100% visível e funcional sem JS — reveal é só enhancement, nunca oculta conteúdo via `opacity:0` fixo no CSS base (usar classe adicionada por JS, com fallback visível).
- Accordion FAQ e carrossel de galeria funcionam por HTML semântico/scroll nativo primeiro; JS adiciona setas/dots/animação.

## 20. Acessibilidade
Contraste mínimo AA (4.5:1 texto normal, 3:1 texto grande) — validar `--text-secondary` sobre `--bg` e `--surface`. Toques ≥44×44px. Breakpoints: 360, 375, 390, 414 (mobile), 768 (tablet), 1024, 1280, 1440 (desktop). `lang="pt-BR"`, hierarquia de headings única por página, `alt` descritivo em SVGs decorativos (`aria-hidden="true"`) vs. informativos.

## 21. O que evitar
Gradientes amplos de fundo (ok só em micro-detalhes, ex. ícone de IA, já que o app usa gradiente roxo/azul nos cards de IA — usar com extrema moderação e só ali). Glassmorphism (blur sobre cards) — zero. Sombras pesadas tipo "neumorphism". Estética de template genérico (ícones de pacote de stock idênticos entre si, grid 3-col "feature cards" sem personalidade): mitigado aqui por paleta teal/areia autoral, tipografia Plus Jakarta Sans + Inter (não Poppins do app, não Inter sozinho de template), molduras de celular em CSS ao redor de screenshots reais (não genéricas de stock), diagrama de solução como peça central visual, e selo "Em desenvolvimento" tratado como parte do design (não um badge vermelho de alerta).
