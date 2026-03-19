import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Convert render-blocking CSS to async loading in production
function asyncCssPlugin(): Plugin {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Replace <link rel="stylesheet" ...href="/assets/...css"> with async pattern
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="preload" as="style" href="$1" onload="this.rel='stylesheet'" /><noscript><link rel="stylesheet" href="$1" /></noscript>`
      );
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), asyncCssPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom') || id.includes('node_modules/react/')) {
                return 'vendor-react';
              }
              if (id.includes('node_modules/framer-motion')) {
                return 'vendor-motion';
              }
              if (id.includes('node_modules/lucide-react')) {
                return 'vendor-icons';
              }
              // Only used by lazy-loaded Contact page — loads on demand
              if (id.includes('@google/genai') || id.includes('@emailjs')) {
                return 'vendor-lazy';
              }
            }
          }
        }
      },
      css: {
        postcss: './postcss.config.js'
      }
    };
});
