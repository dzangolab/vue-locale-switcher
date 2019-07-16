<template>
  <li
    @click="selectLocale(locale)"
    :exact="true"
    :class="active ? 'active' : ''"
  >
    <a
      :class="cls"
      :disabled="active ? 'disabled' : ''"
      href="#"
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
    }
  },

  methods: {
    selectLocale (locale) {
      this.$emit('selectLocale', locale)
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
