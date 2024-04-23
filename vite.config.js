import { defineConfig } from 'vite'
import {fileURLToPath, URL} from 'url'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: 'localeSwitcher',
      entryPoints: ['./src/components/LocaleSwitcher/Index.vue'],
      fileName: (format) => `localeSwitcher.${format}.js`
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
