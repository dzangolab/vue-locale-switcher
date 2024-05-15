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
      <!-- <Link
        @localeChanged="onLocaleChanged"
        :active="locale === l.code"
        :label="l.name"
        :locale="l.code"
        :key="l.code"
        :mode="mode"
        :theme="theme"
        v-for="l in getLocales()"
        role="menuitem"
      /> -->
      <li
        @click.prevent="onLocaleChanged(l)"
        :key="l.code"
        v-for="l in getLocales()"
      >
        <a
          :class="cls"
          :disabled="locale === l.code ? 'disabled' : false"
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
    cls () {
      let cls = ''

      switch (this.theme) {
        case 'bootstrap':
          cls += 'dropdown-item' + (this.active ? ' active' : '')
          break

        case 'custom':
          cls = 'ls__item' + (this.active ? ' ls__item--active' : '')
          break
      }

      return cls
    },

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
      expanded: false
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

      const route = name.slice(0, i) + '_' + this.locale

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
      if (this.locale === locale.code) {
        return
      }

      if (this.ssr) {
        window.location = this.href
      } else {
        this.$emit('locale-switcher:localeChanged', locale.code)

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
