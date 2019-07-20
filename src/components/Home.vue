<template>
  <div class="home">
    <header>
      <nav class="navbar sticky-top navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
        <div class="container">
          <a class="navbar-brand" href="#">Dzangolab - Vue Locale Switcher</a>
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
                  @afterLocaleChanged="onLocaleChanged"
                  :locale="locale"
                  :locales="locales"
                  mode="pwa"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main class="container">
      <h1>Dzangolab - Vue Locale Switcher</h1>

      <p>A LocaleSwitcher component for vue.js.</p>

      <section class="spa">
        <h2>SPA mode (with vue-i18n)</h2>

        <p>In SPA mode, when a different locale is selected, the locale is changed inside the existing page. IN this case, we use vue-i18n, for which support is built-in. The route does not change. The page is re-rendered, but not reloaded. The path in the browser address bar remains unchanged.</p>

        <div class="switcher">
          <div class="comment">
            <p>
              {{ $t('current_locale', { locale: locale }) }}
              <span class="locale">{{ locale }}</span>
            </p>
          </div>

          <LocaleSwitcher
            @locale-switcher:localeChanged="onLocaleChanged"
            :locale="locale"
            :locales="locales"
            mode="spa"
          />
        </div>
      </section>

      <section class="pwa">
        <h2>PWA mode</h2>

        <p>The home page in French is a defined as a separate route than the home page in English. When the locale is changed, the app switches to the appropriate route. This is reflectedin the url in the browser address bar, which displays the path the appropriate path.</p>

        <div class="switcher">
          <div class="comment">
            <p>
              {{ $t('current_locale', { locale: locale }) }}
              <span class="locale">{{ locale }}</span>
            </p>
          </div>

          <LocaleSwitcher
            @locale-switcher:localeChanged="onLocaleChanged"
            :locale="locale"
            :locales="locales"
          />
        </div>
      </section>

      <section>
        <h2>LocaleSwitcher in bootstrap navbar</h2>

        <p>See navbar at the top of the page, which includes an instance of this component (in `pwa` mode).</p>
      </section>
    </main>

  </div>
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher/Index'

export default {
  name: 'Home',

  components: {
    LocaleSwitcher
  },

  computed: {
    // Return locale from vue-i18n
    locale () {
      return this.$i18n.locale
    }
  },

  // Because a  route has a different path for each localeh, determine locale based on route
  created () {
    let name = this.$route.name,
        i = name.lastIndexOf('_')

    this.$i18n.locale = name.slice(i + 1)
  },

  data () {
    return {
      expanded: false,
      locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'fr',
          name: 'Français'
        }
      ]
    }
  },

  methods: {
    onLocaleChanged (locale) {
      let old = this.locale
      console.log('locale changed from ' + old + ' to ' + this.locale + '.')
    }
  }
}
</script>

<style lang="scss">
main {
  padding-top: 20px;
  font-size: 20px;

  .locale {
    font-weight: bold;
  }

  section {
    margin-top: 2rem;

    .switcher {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .comment {
        flex: 1;
      }

      .locale-switcher {
        display: block;
        flex: 0;
        width: 100%;

        ul.dropdown-menu {
          border-top: none;
          position: static;
          width: 100%;
        }
      }

      @media (min-width: 767px) {
        flex-direction: row;
        justify-content: space-between;

        .locale-switcher {
          ul.dropdown-menu {
            position: absolute;
            width: auto;
          }
        }
      }
    }
  }
}
</style>

