<template>
  <div id="app">
    <LocaleSwitcher
      @changeLocale="changeLocale"
      :locale="locale"
      :locales="locales"
    />
  </div>
</template>

<script>
import { LocaleSwitcher } from './components/index'

export default {
  name: 'app',
  components: {
    LocaleSwitcher
  },

  data () {
    return {
      locale: 'en',
      locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'fr',
          name: 'Français'
        },
        {
          code: 'th',
          name: 'ภาษาไทย'
        }
      ]
    }
  },

  methods: {
    changeLocale (locale) {
      this.locale = locale
    }
  }
}
</script>
