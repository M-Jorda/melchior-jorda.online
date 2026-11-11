import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import staticBlog from './build/blog/plugin.js'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), staticBlog({ contentDir: 'content/blog' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue-i18n') || id.includes('node_modules/@intlify')) {
            return 'i18n'
          }
          if (id.includes('node_modules/vue-router')) {
            return 'router'
          }
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vue'
          }
        }
      }
    }
  }
})
