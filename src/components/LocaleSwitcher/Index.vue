<template>
  <div
    class="ls"
    data-id="dzangolab-locale-switcher">
    <a
      @mouseover="expanded = true"
      @click="expanded = !expanded"
      :class="currentLocaleClass"
      aria-expanded="false"
      aria-haspopup="true"
      href="javascript:"
      role="button"
    >
      {{ locale }}
    </a>
    <ul
      @mouseleave="expanded = false"
      @click="expanded = false"
      :class="dropdownClass"
      tabindex="-1"
    >
      <Link
        @localeChanged="onLocaleChanged"
        :active="locale === l.code"
        :label="l.name"
        :locale="l.code"
        :key="l.code"
        :mode="mode"
        :theme="theme"
        v-for="l in getLocales()"
        role="menuitem"
      />
    </ul>
  </div>
</template>

<script>
import Link from './Link'

import '@/assets/scss/locale-switcher.scss'

export default {
  components: {
    Link
  },

  computed: {
    currentLocaleClass () {
      let cls = ''

      switch (this.theme) {
        case 'bootstrap':
          cls = 'nav-link' + (this.expanded ? ' hover' : '')
          break

        case 'custom':
          cls = 'ls__locale'
          break
      }

      return cls
    },

    dropdownClass () {
      let cls = ''

      switch (this.theme) {
        case 'bootstrap':
          cls = 'dropdown-menu dropdown-menu-right' + (this.expanded ? ' show' : '')
          break

        case 'custom':
          cls = 'ls__dropdown' + (this.expanded ? ' ls__dropdown--show' : '')
          break
      }

      return cls
    }
  },

  data () {
    return {
      expanded: false
    }
  },

  methods: {
    onLocaleChanged (locale) {
      this.$emit('locale-switcher:localeChanged', locale)
    },

    getLocales () {
      const locales = []
      let tokens = []

      switch (typeof this.locales) {
        case 'string' :
          tokens = this.locales.split(',')

          for (let i = 0; i < tokens.length; i++) {
            locales.push({
              code: tokens[i].trim(),
              name: tokens[++i].trim()
            })
          }

          return locales

        case 'array' :
        default:
          return this.locales
      }
    }
  },

  name: 'LocaleSwitcher',

  props: {
    locale: {
      required: true,
      type: String
    },
    locales: {
      required: true,
      type: [Array, String]
    },
    mode: {
      default: 'pwa',
      required: false,
      type: String,
      validator: function (value) {
        return ['pwa', 'spa', 'ssr'].indexOf(value.toLowerCase()) !== -1
      }
    },
    theme: {
      default: 'bootstrap',
      type: String
    }
  }
}
</script>
