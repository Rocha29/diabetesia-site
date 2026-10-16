import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const SITE_BASE = process.env.SITE_BASE || '/diabetesia-site/';

// Página do médico (relatorio/): Content-Security-Policy só no build (o servidor de
// desenvolvimento do Vite usa scripts inline). Só scripts, estilos e fontes do
// próprio site; rede só para o Firestore; nada de terceiros.
const REPORT_CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self' data:",
  "img-src 'self' data:",
  'connect-src https://firestore.googleapis.com',
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');

function reportCsp(): Plugin {
  return {
    name: 'relatorio-csp',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      if (!ctx.path.endsWith('/relatorio/index.html')) return html;
      return [{ tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: REPORT_CSP }, injectTo: 'head-prepend' }];
    },
  };
}

export default defineConfig({
  base: SITE_BASE,
  plugins: [react(), reportCsp()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidade: resolve(__dirname, 'privacidade/index.html'),
        termos: resolve(__dirname, 'termos/index.html'),
        testador: resolve(__dirname, 'testador/index.html'),
        // Página do médico (link temporário do relatório, issue V2 #15).
        relatorio: resolve(__dirname, 'relatorio/index.html'),
      },
    },
  },
});
