# Prints da V2 com dados de demonstração

Gera os prints usados no site (`src/assets/screens/`) a partir do **app real da V2**, rodando com **dados fictícios** ("Ana Souza").

- Nada chama o Firebase ou o backend.
- O repositório da V2 **não é alterado**.

## Como funciona
- `vite.config.demo.ts` serve o código-fonte da V2 e troca `@/services` (e `@/services/firebase/firebaseApp`) por `demoServices.ts` e `demoFirebaseApp.ts`. Esses arquivos são implementações em memória com as mesmas interfaces.
- `shoot.mjs` abre o app no Chrome (puppeteer-core, 390×844 @2x), navega pelas telas e salva PNG e WebP em `out/`. O WebP é gerado pelo próprio Chrome via canvas.
- `run.sh` sobe o Vite de demonstração, roda a captura e copia as imagens para o site.

## Uso
```bash
cd tools/screenshots
npm install
npm run shots          # V2_DIR=/caminho/da/v2 se a pasta não estiver no layout padrão do workspace
```

Variáveis opcionais:
- `V2_DIR`: pasta da V2. O padrão é `../../../diabetes-ai-react/Front/diabetesIA-v2`.
- `CHROME_PATH`: caminho do Chrome.
- `DEMO_PORT`: porta do servidor (padrão 5180).

## Quando a V2 mudar
- Se uma interface de `src/services/**` mudar, ajuste `demoServices.ts`. Ele precisa exportar os mesmos nomes de `src/services/index.ts`.
- Se uma tela nova for criada, adicione a captura em `shoot.mjs` e o item em `src/data/screens.ts`.

## Regras dos dados de demonstração
- Só dados fictícios.
- Textos da IA neutros e de organização: sem diagnóstico, tratamento ou recomendação.
- Revise as imagens antes de publicar.
