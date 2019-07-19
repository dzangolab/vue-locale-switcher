<template>
  <li
    @click.prevent="onLocaleChanged"
    :class="active ? 'active' : ''"
  >
    <a
      :class="cls"
      :disabled="active ? 'disabled' : ''"
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
          cls = 'dropdown-item'
          break
      }

      if (this.active) {
        cls = cls + ' active'
      }

      return cls
    },

    href () {
      if (!this.ssr && !this.useLocalizedPath) {
        return '#'
      }

      let route = this.getRouteForLocale()

      return route.href
    }
  },

  methods: {
    getRouteForLocale () {
      let route = '#'

      let name = this.$route.name
      let i = name.lastIndexOf('_')

      route = name.slice(0, i) + '_' + this.locale

      return this.$router.resolve({
        name: route
      })
    },

    onLocaleChanged () {
      if (this.active) {
        return
      }

      this.$emit('beforeLocaleChange')

      if (this.ssr) {
        window.location = this.href
      } else if (this.useLocalizedPath) {
        this.$router.push(this.href)
      }

      this.$emit('afterLocaleChanged', this.locale)
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
    ssr: {
      required: true,
      type: Boolean,
    },
    theme: {
      default: 'bootstrap',
      type: String
    },
    useLocalizedPath: {
      required: true,
      type: Boolean,
    }
  }
}
</script>
