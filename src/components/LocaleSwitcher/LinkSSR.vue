<template>
  <router-link
    @click.native="go"
    :exact="true"
    :to="href"
    active-class=""
    exact-active-class="active"
    tag="li"
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
  </router-link>
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

    go () {
      if (this.active) {
        return
      }

      this.$emit('localeChanged', this.locale)

      window.location = this.href
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
    theme: {
      default: 'bootstrap',
      type: String
    }
  }
}
</script>
