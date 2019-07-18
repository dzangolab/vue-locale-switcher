<template>
  <li
    @click.prevent="onLocaleChanged"
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
    onLocaleChanged () {
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
    theme: {
      default: 'bootstrap',
      type: String
    }
  }
}
</script>
