import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from '@rollup/plugin-yaml'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/vocab-tester/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    yaml(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vocabulary',
        short_name: 'Vocabulary',
        description: 'Practice vocabulary with interactive quizzes.',
        start_url: '/vocab-tester/',
        scope: '/vocab-tester/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/vocab-tester/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/vocab-tester/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp}',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
