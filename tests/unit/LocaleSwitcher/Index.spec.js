import {createRouter, createWebHistory} from 'vue-router'
import {shallowMount} from '@vue/test-utils'

import LocaleSwitcher from '@/components/LocaleSwitcher/Index.vue'

const routes = [
  {
    name: 'home_en',
    path: '/'
  },
  {
    name: 'home_fr',
    path: '/fr'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('Index.vue', () => {
  const locale = 'en'
  const locales = [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'fr',
      name: 'Français'
    }
  ]

  function wrapperFactory ({props} = {}) {
    return shallowMount(LocaleSwitcher, {
      global: {
        plugins: [router]
      },
      propsData: {
        locale: locale,
        locales: locales,
        ...props
      }
    })
  }

  it('renders locale options', () => {
    const wrapper = wrapperFactory()

    expect(wrapper.findAll('a[data-test-id="locale"]').length).toBe(2)
  })

  it('emits an event with locale argument', () => {
    const wrapper = wrapperFactory()

    wrapper.vm.onLocaleChanged('fr')

    expect(wrapper.emitted()['locale-switcher:localeChanged'][0]).toEqual(['fr'])
  })

  it('generates locales correctly for spa mode', () => {
    const wrapper = wrapperFactory({
      props: {
        locale: 'fr',
        mode: 'spa'
      }
    })

    expect(wrapper.vm.href).toEqual('javascript:')
  })

  it('generates locales correctly for pwa mode', () => {
    const wrapper = wrapperFactory({
      props: {
        locale: 'fr',
        mode: 'pwa'
      }
    })

    expect(wrapper.vm.href).toEqual('/fr')
  })

  it('generates locales correctly for ssr mode', () => {
    const wrapper = wrapperFactory({
      props: {
        locale: 'fr',
        mode: 'ssr'
      }
    })

    expect(wrapper.vm.href).toEqual('/fr')
  })
})
