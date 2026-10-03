import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

// Demo-only Vite config: serves the real V2 app source (read-only) but swaps
// the service layer for in-memory fake data, so nothing here ever touches
// Firebase or /api. The V2 repo is never modified.
// V2_DIR defaults to the workspace layout: <workspace>/diabetes-ai-react/Front/diabetesIA-v2
const here = fileURLToPath(new URL('.', import.meta.url));
const v2Root = path.resolve(process.env.V2_DIR ?? path.join(here, '../../../diabetes-ai-react/Front/diabetesIA-v2'));

export default defineConfig({
  root: v2Root,
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\/services$/, replacement: fileURLToPath(new URL('./demoServices.ts', import.meta.url)) },
      { find: /^@\/services\/firebase\/firebaseApp$/, replacement: fileURLToPath(new URL('./demoFirebaseApp.ts', import.meta.url)) },
      { find: '@', replacement: `${v2Root}/src` },
    ],
  },
  server: { fs: { allow: [v2Root, here] } },
});
