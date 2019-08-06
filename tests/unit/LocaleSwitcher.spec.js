import {shallowMount} from '@vue/test-utils'
import LocaleSwitcher from '@/components/LocaleSwitcher/Index.vue'

describe('LocaleSwitcher.vue', () => {
  let cmp

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
    cmp = shallowMount(LocaleSwitcher, {
      propsData: {
        locale: locale,
        locales: locales
      }
    })
  })

  it('renders passed locale prop', () => {
    expect(cmp.text()).toEqual(locale)
  })

  it("emits an event with locale argument", () => {
    cmp.vm.onLocaleChanged('fr')

    expect(cmp.emitted()['locale-switcher:localeChanged'][0]).toEqual(["fr"])
  })
})
