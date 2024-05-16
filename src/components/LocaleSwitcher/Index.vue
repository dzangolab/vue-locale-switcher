<template>
  <div
    class="ls"
    data-id="dzangolab-locale-switcher"
  >
    <a
      :class="currentLocaleClass"
      aria-expanded="false"
      aria-haspopup="true"
      href="javascript:"
      role="button"
      @mouseover="expanded = true"
      @click="expanded = !expanded"
    >
      {{ locale }}
    </a>
    <ul
      :class="dropdownClass"
      tabindex="-1"
      @mouseleave="expanded = false"
      @click="expanded = false"
    >
      <Link
        v-for="l in getLocales()"
        :key="l.code"
        :active="locale === l.code"
        :label="l.name"
        :locale="l.code"
        :mode="mode"
        :theme="theme"
        role="menuitem"
        @locale-changed="onLocaleChanged"
      />
    </ul>
  </div>
</template>

<script>
import Link from './Link'

import '@/assets/scss/locale-switcher.scss'

export default {
  name: 'LocaleSwitcher',

  components: {
    Link
  },

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
  },

  emits: ['locale-switcher:localeChanged'],

  data () {
    return {
      expanded: false
    }
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
  }
}
</script>
