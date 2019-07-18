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
import mixin from '@/mixins/mixin'

export default {
  mixins: [mixin]
}
</script>
