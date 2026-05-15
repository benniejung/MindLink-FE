import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import ViteWebp from 'vite-plugin-webp';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteWebp({
      extensions: ['png', 'jpg'],
    }),
  ],
});
