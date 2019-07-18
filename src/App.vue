<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <div class="container">
        <a class="navbar-brand" href="#">Vue Locale Switcher</a>
        <button
          @click="expanded = !expanded"
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div
          :class="expanded ? 'show' : ''"
          class="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <LocaleSwitcher
                @localeChanged="onLocaleChanged"
                :locale="locale"
                :locales="locales"
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="main">
      <div class="container">
        <p>
          Current app locale:&nbsp;
          <span class="locale">{{locale}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LocaleSwitcher from './components/LocaleSwitcher/Index'

export default {
  name: 'app',
  components: {
    LocaleSwitcher
  },

  data () {
    return {
      expanded: false,
      locale: 'en',
      locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'fr',
          name: 'Français'
        },
        {
          code: 'th',
          name: 'ภาษาไทย'
        }
      ]
    }
  },

  methods: {
    onLocaleChanged (locale) {
      this.locale = locale
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  padding-top: 20px;
  font-size: 20px;

  .locale {
    font-weight: bold;
  }
}
</style>
