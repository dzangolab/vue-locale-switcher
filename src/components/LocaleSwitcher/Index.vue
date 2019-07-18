<template>
  <div
    class="locale-switcher">
    <a
      @mouseenter="expanded = true"
      @click="expanded = !expanded"
      :class="getClassForLocale()"
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
      :class="getClassForDropdown()"
      tabindex="-1"
      v-if="ssr"
    >
      <LinkSSR
        @localeChanged="onLocaleChanged"
        :active="locale === l.code"
        :label="l.name"
        :locale="l.code"
        :key="l.code"
        v-for="l in locales"
        role="menuitem"
      />
    </ul>
    <ul
      @mouseleave="expanded = false"
      @click="expanded = false"
      :class="getClassForDropdown()"
      tabindex="-1"
      v-else
    >
      <component
        @localeChanged="onLocaleChanged"
        :active="locale === l.code"
        :label="l.name"
        :locale="l.code"
        :key="l.code"
        v-bind:is="linkComponent"
        v-for="l in locales"
        role="menuitem"
      />
    </ul>
  </div>
</template>

<script>
import Link from './Link'
import LinkSSR from './LinkSSR'

export default {
  components: {
    Link,
    LinkSSR
  },

  computed: {
    linkComponent () {
      return this.ssr ? 'LinkSSR' : 'Link'
    }
  },

  data () {
    return {
      expanded: false
    }
  },

  methods: {
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
    },

    onLocaleChanged (locale) {
      this.$emit('localeChanged', locale)
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
