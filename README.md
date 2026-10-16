# DiabetesIA — site institucional

O site oficial do DiabetesIA apresenta a nova versão do app (V2), hoje **em teste fechado no Android, por convite**:
nova tela inicial com carrossel e Registro rápido, barra com 4 abas, assistente com ações na hora,
"Quem me acompanha" (família só leitura), carboidratos e calorias pela tabela TACO/IBGE, pressão arterial,
Minha jornada, relatório em PDF, leitura por foto com conferência e acessibilidade.

O site não faz alegações médicas nem inventa números, depoimentos, preços ou lojas. O assistente
**não vê os registros** do usuário — não escrever o contrário. Nada de detalhes de infraestrutura no site.

Stack: React 18 + TypeScript + Vite 5, CSS Modules, fonte Atkinson Hyperlegible Next (a mesma do app)
auto-hospedada via `@fontsource-variable`. Sem framework de UI e sem biblioteca de animação.
Tema claro e escuro por `prefers-color-scheme` (tokens em `src/styles/tokens.css`, alinhados ao design system do app).

## Onde editar o conteúdo

| O que | Arquivo |
|---|---|
| Cartões de novidades (bento) | `src/data/highlights.ts` |
| Telas, legendas, textos alternativos e abas da galeria | `src/data/screens.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Menu, link do guia do testador e aviso médico | `src/data/nav.ts` |
| Assistente / Quem me acompanha / Acessibilidade / Privacidade | `src/components/<Seção>/` |
| Disponibilidade (Android, iPhone, Web, Premium…) | `src/components/FinalCTA/FinalCTA.tsx` |

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
`privacidade/index.html`, `termos/index.html` e `testador/index.html` dentro de `dist/`.

## Deploy (GitHub Pages)

Todo PR roda `.github/workflows/ci.yml` (typecheck e build). Faça o merge só com o check verde.


`.github/workflows/deploy.yml` builda e publica `dist/` via `actions/upload-pages-artifact` +
`actions/deploy-pages` a cada push na `main`. É preciso habilitar GitHub Pages com fonte
"GitHub Actions" nas configurações do repositório.

## Como trocar os screenshots

As imagens em `src/assets/screens/` são **telas reais da V2, no novo visual, com dados fictícios**. Elas são geradas por `tools/screenshots`, cujo README explica tudo.

```bash
cd tools/screenshots
npm install
V2_DIR=/caminho/da/v2 npm run shots
```

O script sobe a V2 com dados de demonstração (sem Firebase e sem backend), fotografa as telas em 390×844 e copia PNG e WebP para `src/assets/screens/`. A lista de telas, as legendas e os textos alternativos ficam em `src/data/screens.ts`.

**Revise as imagens antes do commit:** só dados fictícios, sem texto de diagnóstico.

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

## Relatório para o médico (`relatorio/`)

Página que o médico abre pelo link temporário criado no app (issue V2 #15): `https://rocha29.github.io/diabetesia-site/relatorio/#<token>`.

- Lê o resumo direto da API REST do Firestore (`sharedReports/<token>`), **sem chave de API e sem login**. Quem decide o que pode ser lido são as regras do Firestore (repositório do backend, `firestore.rules`).
- Registra a abertura em `sharedReports/<token>/accesses` só com o horário do servidor.
- `noindex`, `<meta name="referrer" content="no-referrer">`, sem analytics. O token fica depois do `#`, então não vai para os logs do GitHub Pages.
- Projeto do Firestore: `VITE_REPORT_FIRESTORE_PROJECT_ID` (padrão no código).
- Ver com dados fictícios (só em `npm run dev`, nunca no build): `/diabetesia-site/relatorio/#demo`, `#demo-indisponivel`, `#demo-invalido`, `#demo-erro`, `#demo-carregando`.
- Código: `src/relatorio/`.

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
