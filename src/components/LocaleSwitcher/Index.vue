<template>
  <div
    class="locale-switcher">
    <a
      @mouseenter="expanded = true"
      @click="expanded = !expanded"
      :class="currentLocaleClass"
      aria-expanded="false"
      aria-haspopup="true"
      class="locale"
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
        @afterLocaleChanged="afterLocaleChanged"
        @beforeLocaleChange="beforeLocaleChange"
        :active="locale === l.code"
        :label="l.name"
        :locale="l.code"
        :key="l.code"
        :useLocalizePath="useLocalizePath"
        :ssr="ssr"
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

      if (this.theme === 'bootstrap') {
        cls = 'nav-link'
      }

      return cls + (this.expanded ? ' hover' : '')
    },

    dropdownClass () {
      let cls = ''

      if (this.theme === 'bootstrap') {
        cls = 'dropdown-menu dropdown-menu-right'
        cls = cls + (this.expanded ? ' show' : '')
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
    afterLocaleChanged (locale) {
      this.$emit('afterLocaleChanged', locale)
    },

    beforeLocaleChange () {
      this.$emit('beforeLocaleChange')
    },

    getClassForDropdown () {
      let cls = ''

      if (this.theme === 'bootstrap') {
        cls = 'dropdown-menu dropdown-menu-right'
        cls = cls + (this.expanded ? ' show' : '')
      }

      return cls
    },

    getClassForLocale () {
      let cls = ''

      if (this.theme === 'bootstrap') {
        cls = 'nav-link'
      }

      return cls + (this.expanded ? ' hover' : '')
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
    ssr: {
      required: false,
      type: Boolean,
      default: false
    },
    theme: {
      default: 'bootstrap',
      type: String
    },
    useLocalizePath: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
div.locale-switcher {
  position: relative;

  a {
    &.locale {
      border-radius: 50%;
      display: none;
      height: 3rem;
      line-height: 2rem;
      text-align: center;
      width: 3rem;

      @media (min-width: 968px) {
        display: block;
      }
    }
  }

  .dropdown-menu {
    top: 110%;

    @media (max-width: 967px) {
      border: none;
      border-top: 1px solid #edf5ff;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
