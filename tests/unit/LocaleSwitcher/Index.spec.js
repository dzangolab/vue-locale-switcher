import {shallowMount} from '@vue/test-utils'
import Link from '@/components/LocaleSwitcher/Link.vue'
import LocaleSwitcher from '@/components/LocaleSwitcher/Index.vue'

describe('Index.vue', () => {
  let wrapper

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

  beforeEach(() => {
    wrapper = shallowMount(LocaleSwitcher, {
      propsData: {
        locale: locale,
        locales: locales
      }
    })
  })

  it('renders passed locale prop', () => {
    expect(wrapper.text()).toEqual(locale)
  })

  it('renders links', () => {
    expect(wrapper.findAll(Link).length).toBe(2)
  })

  it("emits an event with locale argument", () => {
    wrapper.vm.onLocaleChanged('fr')

    expect(wrapper.emitted()['locale-switcher:localeChanged'][0]).toEqual(["fr"])
  })
})
