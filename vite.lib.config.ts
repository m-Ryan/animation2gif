import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  define: {},
  build: {
    emptyOutDir: false,
    minify: true,
    manifest: false,
    sourcemap: true,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'animation2gif',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      plugins: [],
      external: [
        'react',
        'react-dom',
      ],
      output: {},
    },
    outDir: 'lib',
  },
  optimizeDeps: {},
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
