import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // ...outras configurações...
  optimizeDeps: {
    include: ['node_modules'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Seu arquivo HTML principal
      },
      // output: {
      //   entryFileNames: `[name].js`,
      //   chunkFileNames: `[name].js`,
      //   assetFileNames: `web-ui/[name].[ext]`
      // }
    },
    assetsDir: 'web-ui', // Defina o nome da pasta para os ativos
  },
});
