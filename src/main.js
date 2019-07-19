import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createRouter} from './router'

// router setup

const router = createRouter()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
