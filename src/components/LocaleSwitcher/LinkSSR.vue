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
  mixins: [mixin]
}
</script>
