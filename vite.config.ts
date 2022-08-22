import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  return {
    server: {
      port: 3456
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [react(), svgr(), crx({ manifest })],
    build: {
      sourcemap: mode === 'production' ? 'hidden' : true,
      emptyOutDir: true
    }
  };
});
