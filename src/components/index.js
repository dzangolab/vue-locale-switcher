import Vue from 'vue'
import LocaleSwitcher from './LocaleSwitcher/Index'
import LocaleSwitcherSSR from './LocaleSwitcherSSR/Index'

const Components = {
  LocaleSwitcher,
  LocaleSwitcherSSR
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
