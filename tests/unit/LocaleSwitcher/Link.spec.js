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
  routes
})

describe('Index.vue', () => {
  let wrapper

  const label = 'English'
  const locale = 'en'

  beforeEach(() => {
    wrapper = shallowMount(Link, {
      localVue,
      router,
      propsData: {
        label: label,
        locale: locale
      }
    })
  })

  it('renders passed label prop', () => {
    expect(wrapper.text()).toEqual(label)
  })

  it('emits an event with locale argument', () => {
    wrapper.vm.onLocaleChanged()

    expect(wrapper.emitted()['localeChanged'][0]).toEqual([locale])
  })
})
