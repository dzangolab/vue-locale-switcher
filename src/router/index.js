import {createRouter, createWebHistory} from 'vue-router'
import home from './home.js'

export function createRoute () {
  const router = createRouter({
    history: createWebHistory(),
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
