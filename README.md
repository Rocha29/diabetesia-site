# DiabetesIA — site institucional

Site oficial do DiabetesIA: apresenta o que o app faz hoje (glicemia, refeições, medicamentos,
receitas, chat de IA, histórico e relatórios), o que está em desenvolvimento na versão web V2
(acompanhamento por dia, semana, mês e ano, lembretes, consultas, insights, relatório com PDF,
CSV e JSON, controles de privacidade e perfil) e o que é planejado (dispositivos como Garmin e
Health Connect). Não faz claims médicos nem inventa números, depoimentos ou lojas.

Stack: React 18 + TypeScript + Vite 5, CSS Modules, fontes via `@fontsource`. Sem framework de UI
e sem biblioteca de animação.

## Onde editar o conteúdo

| O que | Arquivo |
|---|---|
| Recursos disponíveis hoje | `src/data/features.ts` |
| Recursos de IA | `src/data/features.ts` (`aiItems`) |
| Acompanhamento (Hoje, Semana, Mês, Ano) | `src/components/Tracking/Tracking.tsx` |
| Novidades da V2 ("Em desenvolvimento" e "Planejado") | `src/data/roadmap.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Versões V1 e V2 | `src/components/Versions/Versions.tsx` |

Regra: a V2 web **ainda não está publicada**. Um recurso só sai de `roadmap.ts` para `features.ts`
depois de estar disponível para o público.

## Como rodar

```bash
npm install
npm run dev
```

Node 18.20 é o alvo deste projeto — por isso o Vite está fixado na major 5 (não usar Vite 6/7).

## Build

```bash
npm run build
```

Roda `tsc --noEmit` e depois `vite build`. Gera multi-página: `index.html`,
`privacidade/index.html` e `termos/index.html` dentro de `dist/`.

## Deploy (GitHub Pages)

Todo PR roda `.github/workflows/ci.yml` (typecheck e build). Faça o merge só com o check verde.


`.github/workflows/deploy.yml` builda e publica `dist/` via `actions/upload-pages-artifact` +
`actions/deploy-pages` a cada push na `main`. É preciso habilitar GitHub Pages com fonte
"GitHub Actions" nas configurações do repositório.

## Como trocar os screenshots

As imagens em `src/assets/screens/{login,home,glucose,food,medication,prescription,chat,report,
tracking,profile,checkin}.{webp,png}` são **placeholders temporários** (gerados por
`npm run placeholders`, script em `scripts/generate-placeholders.mjs`). Para usar as capturas
reais da V2:

1. Capture as telas em 390×844, com dados fictícios de demonstração (nunca dados reais).
2. Exporte em WebP e PNG (fallback), com os mesmos nomes de arquivo.
3. Substitua os arquivos em `src/assets/screens/`.
4. A lista e os textos alternativos ficam em `src/data/screens.ts` — ajuste `label`/`alt` se
   necessário.

## Domínio próprio

Por padrão o build usa `base: '/diabetesia-site/'` (GitHub Pages em subcaminho). Para publicar em
domínio próprio na raiz:

1. Defina a variável de ambiente `SITE_BASE=/` antes do build: `SITE_BASE=/ npm run build`.
2. Adicione um arquivo `CNAME` em `public/` com o domínio (ex.: `diabetesia.com.br`), que será
   copiado para `dist/` no build.
3. Atualize `public/robots.txt`, `public/sitemap.xml` e as URLs canônicas/OG nos `index.html`
   (hoje apontam para `https://rocha29.github.io/diabetesia-site/`).

## Analytics

`src/lib/analytics.ts` expõe `track(event, props)`. Hoje ele só emite um
`CustomEvent('diabetesia:track')` no `document` — nenhum dado sai do navegador. Para plugar um
serviço de analytics depois, veja os comentários no próprio arquivo: basta escutar o evento
customizado ou substituir o corpo de `track` para chamar o SDK do serviço escolhido.

## Páginas legais

`/privacidade/` e `/termos/` são páginas HTML separadas (não SPA), com aviso de rascunho em
destaque no topo — o conteúdo precisa de revisão jurídica antes de uso comercial.

## Regenerar imagens geradas por script

```bash
npm run placeholders   # screenshots placeholder em src/assets/screens
npm run og              # public/og.png e public/apple-touch-icon.png
```

## Documentação e ferramentas para retomar
- `docs/SITE_CONTEXT.md`: os fatos do produto (o que existe, o que está em desenvolvimento) e as regras de conteúdo (não inventar, não fazer claims médicos).
- `docs/SITE_DESIGN.md`: a especificação visual (tokens, seções, acessibilidade).
- `docs/SITE_COPY.md`: todos os textos do site e os rascunhos de Privacidade e Termos.
- `tools/screenshots/`: gera os prints reais da V2 com dados de demonstração (veja o README da pasta).
