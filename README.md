# @dzangolab/locale-switcher

LocaleSwitcher component for Vue. Supports SSR apps.

## Requirements

* vue.js >= 2.6
* vue-router >= 3.0
* bootstrap >= 4.3.1

This component asssumes that your app's route follow a namingconvention. See [Route namning convention](#routenamingconvention).

## Usage

Add the package to your app via npm:

``` bash
npm install @dzangolab/vue-locale-switcher --save
```

or yarn:

``` bash
yarn add @dzangolab/vue-locale-switcher
```

### Add LocaleSwitcher globally

``` javascript
# main.js

import Vue from 'vue'
import LocaleSwitcher from '@dzangolab/vue-locale-switcher'
import '@dzangolab/locale-switcher/dist/localeSwitcher.css' // import stylesheet

Vue.use('LocaleSwitcher', LocaleSwitcher)
```

### Add LocaleSwitcher inside a component

```javascript
# MyComponent.vue

<script>
import LocaleSwitcher from '@dzangolab/vue-locale-switcher'
import '@dzangolab/locale-switcher/dist/localeSwitcher.css' // import stylesheet

export default {
  components: {
    LocaleSwitcher
  }
}
</script>
```

### PWA/SPA

```
<template>
  <LocaleSwitcher
    :locale="locale"
    :locales="locales" />
</template>
```

### SSR mode


```
<template>
  <LocaleSwitcher
    :locale="locale"
    :locales="locales"
    :mode="ssr" />
</template>
```

## Route naming convention

This component assumes that your app's route follow a specific naming convention, whereby each route name is defined as `<basename>_<locale_code>`.

For example your home page routes are defined as `home_en` for the `en` locale, `home_fr` for the `fr` locale, etc.

## Props

### `locale`

The current locale.


This setting is **required**.

### `locales`

The available locales. An array of locales, in the following format:

```javascript
[
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'fr',
    name: 'Français'
  },
  {
    code: '<locale identifyer>',
    name: '<locale name>'
  }
]
```

The locale `code ` is whatever your app uses to identify the locale. We recommend the stanard ISO code, eg `en, `en_us`,  etc.

The locale `name` is used to display the locale. We recommend using the localized locale name, eg 'English', 'Français', 'Deutsch', etc.

This setting is **required**.

### `mode`

Determines the behavior of the component when a different locale is selected.


#### `pwa` (default)

When a different locale is selected, the vue-router will load the route associated with the selected locale.

Use this mode if your app has different routes for each page in different locales, such as `/aboutus` (en) vs `/apropos` (fr), or `/home` (en) vs `/de` (de).

If your app uses vue-i18n, then the i18n locale will be updated.


#### `spa`

When a different locale is selected, the current route remains unchagnged and the page is not reloaded.

If your app uses vue-i18n, then the i18n locale will be updated.

#### `ssr`

Set the mode to `ssr` if your app uses server side rendering.

When a different locale is selected, the url associated with this locale will be loaded.


## Events

The component fires the following events:

### `locale-switcher:localeChanged`

Fired after a new locale has been set. The event includes the new locale value.

## Support for vue-i18n

This component has built-in support for vue-i18n. When the locale is changed via the LocaleSwitcher component, the vue-i18n locale will be changed automatically.

This only applies if the `mode` property is set to `spa`.
