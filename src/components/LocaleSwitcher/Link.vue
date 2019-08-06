<template>
  <li
    @click.prevent="onLocaleChanged"
  >
    <a
      :class="cls"
      :disabled="active ? 'disabled' : false"
      :href="href"
      role="menuitem"
      target="_self"
    >
     {{ label }}
    </a>
  </li>
</template>

<script>
export default {
  computed: {
    cls () {
      let cls = ''

      switch (this.theme) {
        case 'bootstrap':
          cls += 'dropdown-item' + (this.active ? ' active' : '')
          break

        case 'custom':
          cls = 'locale-switcher__item' + (this.active ? ' locale-switcher__item--active' : '')
          break
      }

      return cls
    },

    href () {
      if (this.spa) {
        return 'javascript:'
      }

      let route = this.getRouteForLocale()

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

  methods: {
    getRouteForLocale () {
      let name = this.$route.name

      let i = name.lastIndexOf('_')

      let route = name.slice(0, i) + '_' + this.locale

      return this.$router.resolve({
        name: route
      })
    },

    onLocaleChanged () {
      if (this.active) {
        return
      }

      if (this.ssr) {
        window.location = this.href
      } else {
        // Built-in support for vue-i18n
        if ((typeof this.$i18n) !== 'undefined') {
          this.$i18n.locale = this.locale
        }

        if (this.pwa) {
          this.$router.push(this.href)
        }
      }

      this.$emit('localeChanged', this.locale)
    }
  },

  props: {
    active: {
      default: false,
      type: Boolean
    },
    label: {
      required: true,
      type: String
    },
    locale: {
      required: true,
      type: String
    },
    mode: {
      default: 'pwa',
      required: false,
      type: String,
      validator: function (value) {
        return ['pwa', 'spa', 'ssr'].indexOf(value) !== -1
      }
    },
    theme: {
      default: 'bootstrap',
      type: String
    }
  }
}
</script>
