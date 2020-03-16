import {createLocalVue, shallowMount} from '@vue/test-utils'
import Link from '@/components/LocaleSwitcher/Link.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'history',
  routes
})

describe('Link.vue', () => {
  const label = 'English'
  const locale = 'en'

  function wrapperFactory ({propsData} = {}) {
    return shallowMount(Link, {
      localVue,
      router,
      propsData: {
        label: label,
        locale: locale,
        ...propsData
      }
    })
  }

  it('renders passed label prop', () => {
    const wrapper = wrapperFactory()

    expect(wrapper.text()).toEqual(label)
  })

  it('emits an event with locale argument if element is not active', () => {
    const wrapper = wrapperFactory({
      propsData: {
        active: false
      }
    })

    wrapper.vm.onLocaleChanged()

    expect(wrapper.emitted().localeChanged[0]).toEqual([locale])
  })

  it('do not emit `localeChanged` event if element active', () => {
    const wrapper = wrapperFactory({
      propsData: {
        active: true
      }
    })

    wrapper.vm.onLocaleChanged()

    expect(wrapper.emitted('localeChanged')).toBe(undefined)
  })

  it('generates link correctly for spa mode', () => {
    const wrapper = wrapperFactory({
      propsData: {
        locale: 'fr',
        mode: 'spa'
      }
    })

    expect(wrapper.vm.href).toEqual('javascript:')
  })

  it('generates link correctly for pwa mode', () => {
    const wrapper = wrapperFactory({
      propsData: {
        locale: 'fr',
        mode: 'pwa'
      }
    })

    expect(wrapper.vm.href).toEqual('/fr')
  })

  it('generates link correctly for ssr mode', () => {
    const wrapper = wrapperFactory({
      propsData: {
        locale: 'fr',
        mode: 'ssr'
      }
    })

    expect(wrapper.vm.href).toEqual('/fr')
  })
})
