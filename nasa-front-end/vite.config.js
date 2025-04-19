import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  build: {
    target: 'esnext',
    outDir: process.env.BUILD_PATH || 'dist',
  },
  optimizeDeps: {
    loader: {
      '.js': 'jsx',
      '.ts': 'ts',
    },
    include: ['date-fns'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  resolve: {
    alias: {},
  },
});
