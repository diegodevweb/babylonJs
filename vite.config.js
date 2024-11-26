import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,          
    open: true,          // Abre automaticamente o navegador
  },
  css: {
    postcss: './postcss.config.js', // Integra Tailwind via PostCSS
  },
});
