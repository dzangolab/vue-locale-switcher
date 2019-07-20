import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createRouter} from './router'

Vue.config.productionTip = false

// setup router
const router = createRouter()

// setup i18n
Vue.use(VueI18n)

const i18n = new VueI18n({
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

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
