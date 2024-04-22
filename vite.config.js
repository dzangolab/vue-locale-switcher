import { defineConfig } from 'vite'
import {fileURLToPath, URL} from 'url'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/components/LocaleSwitcher/Index.vue',
      name: 'localeSwitcher',
      fileName: (format) => `localeSwitcher.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize Vue if you're using Vue as a dependency
      external: ['vue'],
      output: {
        // Provide global variables to use in your output files
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
