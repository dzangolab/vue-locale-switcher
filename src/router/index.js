import Vue from 'vue'
import Router from 'vue-router'
import home from './home.js'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) {
        return {selector: to.hash}
      } else {
        return {y: 0}
      }
    },
    routes: [].concat(
      home
    )
  })

  return router
}
