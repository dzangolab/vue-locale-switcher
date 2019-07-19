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
import mixin from '@/mixins/mixin'

export default {
  methods: {
    go () {
      if (this.active) {
        return
      }

      this.$emit('localeChanged', this.locale)

      window.location = this.href
    }
  },

  mixins: [mixin]
}
</script>
