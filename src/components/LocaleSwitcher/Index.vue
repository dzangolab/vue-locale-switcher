<template>
  <div
    class="locale-switcher">
    <a
      @mouseover="expanded = true"
      @click="expanded = !expanded"
      :class="currentLocaleClass"
      aria-expanded="false"
      aria-haspopup="true"
      href="#"
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
      <Link
        @localeChanged="onLocaleChanged"
        :active="locale === l.code"
        :label="l.name"
        :locale="l.code"
        :key="l.code"
        :mode="mode"
        :theme="theme"
        v-for="l in locales"
        role="menuitem"
      />
    </ul>
  </div>
</template>

<script>
import Link from './Link'

export default {
  components: {
    Link
  },

  computed: {
    currentLocaleClass () {
      let cls = ''

      switch (this.theme) {
        case 'bootstrap':
          cls = 'nav-link' + (this.expanded ? ' hover' : '')
          break

        case 'custom':
          cls = 'locale-switcher__locale' + (this.expanded ? ' localswitcher__locale--hover' : '')
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
          cls = 'locale-switcher__dropdown' + (this.expanded ? ' locale-switcher__dropdown--show' : '')
          break
      }

      return cls
    }
  },

  data () {
    return {
      expanded: false
    }
  },

  methods: {
    onLocaleChanged (locale) {
      this.$emit('locale-switcher:localeChanged', locale)
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
      type: Array
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

<style lang="scss">
.locale-switcher {
  position: relative;

  &__locale {
    border-radius: 50%;
    display: none;
    height: 3rem;
    line-height: 2rem;
    text-align: center;
    width: 3rem;

    @media (min-width: 992px) {
      display: block;
    }
  }

  &__dropdown {
    background-clip: padding-box;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    display: none;
    left: auto;
    list-style: none;
    margin: 0.125rem 0 0;
    min-width: 10rem;
    padding: .5rem 0;
    position: absolute;
    right: 0;
    text-align: left;
    top: 100%;
    width: 100%;
    z-index: 1000;

    @media (max-width: 991.99px) {
      border: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    &--show {
      display: block;
    }
  }

  &__item {
    background-color: transparent;
    border: 0;
    clear: both;
    color: inherit;
    display: block;
    font-weight: normal;
    padding: .25rem 1.5rem;
    text-align: inherit;
    white-space: nowrap;
    width: 100%;

    &--active {
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
    }
  }

  // bootstrap overrides for small devices
  @media (max-width: 991.99px) {
    .nav-link {
      display: none;
    }

    .dropdown-menu {
      background: transparent;
      border: none;
      border-top: 1px solid #edf5ff;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
