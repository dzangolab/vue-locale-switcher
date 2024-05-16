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
  },
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

    onLocaleChanged () {
      if (this.active) {
        return
      }

      if (this.ssr) {
        window.location = this.href
      } else {
        this.$emit('localeChanged', this.locale)

        if (this.pwa) {
          this.$router.push(this.href).catch(() => {})
        }
      }
    }
  }
}
</script>
