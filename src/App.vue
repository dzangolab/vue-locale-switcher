<template>
  <div id="app">
    <LocaleSwitcher
      :locale="locale"
      :locales="locales"
      :ssr="false"
    />
  </div>
</template>

<script>
import LocaleSwitcher from './components/LocaleSwitcher.vue'

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
        }
      ]
    }
  }
}
</script>
