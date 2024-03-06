import {shallowMount} from '@vue/test-utils'
import Link from '@/components/LocaleSwitcher/Link.vue'
import {createRouter, createWebHistory} from 'vue-router'

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

describe('Link.vue', () => {
  const label = 'English'
  const locale = 'en'

  function wrapperFactory ({props} = {}) {
    return shallowMount(Link, {
      global: {
        plugins: [router]
      },
      props: {
        label: label,
        locale: locale,
        ...props
      }
    })
  }

  it('renders passed label prop', () => {
    const wrapper = wrapperFactory()

    expect(wrapper.text()).toEqual(label)
  })

  it('emits an event with locale argument if element is not active', () => {
    const wrapper = wrapperFactory({
      props: {
        active: false
      }
    })

    wrapper.vm.onLocaleChanged()

    expect(wrapper.emitted().localeChanged[0]).toEqual([locale])
  })

  it('do not emit `localeChanged` event if element active', () => {
    const wrapper = wrapperFactory({
      props: {
        active: true
      }
    })

    wrapper.vm.onLocaleChanged()

    expect(wrapper.emitted('localeChanged')).toBe(undefined)
  })

  it('generates link correctly for spa mode', () => {
    const wrapper = wrapperFactory({
      props: {
        locale: 'fr',
        mode: 'spa'
      }
    })

    expect(wrapper.vm.href).toEqual('javascript:')
  })

  it('generates link correctly for pwa mode', () => {
    const wrapper = wrapperFactory({
      props: {
        locale: 'fr',
        mode: 'pwa'
      }
    })

    expect(wrapper.vm.href).toEqual('/fr')
  })

  it('generates link correctly for ssr mode', () => {
    const wrapper = wrapperFactory({
      props: {
        locale: 'fr',
        mode: 'ssr'
      }
    })

    expect(wrapper.vm.href).toEqual('/fr')
  })
})
