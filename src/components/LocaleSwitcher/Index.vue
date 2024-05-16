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
      <li
        @click.prevent="onLocaleChanged(l.code)"
        :key="l.code"
        v-for="l in getLocales()"
      >
        <a
          :class="{
            'dropdown-item': theme === 'bootstrap',
            'ls__item': theme === 'custom',
            'dropdown-item active': l.code === locale && theme === 'bootstrap',
            'ls_item ls__item--active': l.code === locale && theme === 'custom'
          }"
          :disabled="locale === l.code ? 'disabled' : false"
          :href="href"
          data-test-id="locale"
          role="menuitem"
          target="_self"
        >
          {{ l.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import '@/assets/scss/locale-switcher.scss'

export default {
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
    },

    href () {
      if (this.spa) {
        return 'javascript:'
      }

      const route = this.getRouteForLocale()

      return route.href
    },

    pwa () {
      return this.mode === 'pwa'
    },

    spa () {
      return this.mode === 'spa'
    },

    ssr () {
      return this.mode === 'ssr'
    }
  },

  data () {
    return {
      expanded: false,
      selectedLocale: this.locale
    }
  },

  methods: {
    getCurrentRoute () {
      return this.$router.options.routes.find(route => {
        return this.$route.path === route.path
      })
    },

    getRouteForLocale () {
      const name = this.getCurrentRoute().name

      const i = name.lastIndexOf('_')

      const route = name.slice(0, i) + '_' + this.selectedLocale

      return this.$router.resolve({
        name: route
      })
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
    },

    onLocaleChanged (locale) {
      this.selectedLocale = locale

      if (this.locale === this.selectedLocale) {
        return
      }

      if (this.ssr) {
        window.location = this.href
      } else {
        this.$emit('locale-switcher:localeChanged', this.selectedLocale)

        if (this.pwa) {
          this.$router.push(this.href).catch(() => {})
        }
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
