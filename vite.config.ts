import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const SITE_BASE = process.env.SITE_BASE || '/diabetesia-site/';

export default defineConfig({
  base: SITE_BASE,
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidade: resolve(__dirname, 'privacidade/index.html'),
        termos: resolve(__dirname, 'termos/index.html'),
      },
    },
  },
});
