import {createApp} from 'vue'
import {createI18n} from 'vue-i18n'
import App from './App.vue'
import {createRoute} from './router'

import '@/assets/scss/app.scss'

const app = createApp(App)

// setup router
const router = createRoute()

// setup i18n
const i18n = createI18n({
  fallbackLocale: 'en',
  locale: 'en',
  messages: {
    en: {
      current_locale: 'The current locale is: '
    },
    fr: {
      current_locale: 'Le locale actuel est : '
    }
  }
})

app.use(i18n).use(router).mount('#app')
