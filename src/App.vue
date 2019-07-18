<template>
  <div id="app">
    <div class="locale-switcher">
      <LocaleSwitcher
        @localeChanged="onLocaleChanged"
        :locale="locale"
        :locales="locales"
      />
    </div>
    <div class="content">
      <p>
        Current app locale:&nbsp;
        <span class="locale">{{locale}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import LocaleSwitcher from './components/LocaleSwitcher/Index'

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
    onLocaleChanged (locale) {
      this.locale = locale
    }
  }
}
</script>
<style lang="scss" scoped>
.locale {
  font-weight: bold;
}
</style>
