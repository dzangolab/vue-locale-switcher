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
      return this.route.href
    }
  },

  methods: {
    go () {
      if (this.active) {
        return
      }

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
    route: {
      required: true,
      type: [Object, String]
    },
    theme: {
      default: 'bootstrap',
      type: String
    }
  }
}
</script>
