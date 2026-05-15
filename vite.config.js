import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteImagemin from '@vheemstra/vite-plugin-imagemin'

// The minifiers you want to use:
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminWebp from 'imagemin-webp'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
        },
      },
    }),
  ],
});
