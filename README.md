# @dzangolab/locale-switcher

LocaleSwitcher component for Vue. Supports SSR apps.

## Requirements

* vue.js >= 2.6
* vue-router >= 3.0
* bootstrap >= 4.3.1

This component assumes that your app's route follow a naming convention. See [Route naming convention](#routenamingconvention).

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
import '@dzangolab/vue-locale-switcher/dist/localeSwitcher.css' // import stylesheet

Vue.use('LocaleSwitcher', LocaleSwitcher)
```

### Add LocaleSwitcher inside a component

```javascript
# MyComponent.vue

<script>
import LocaleSwitcher from '@dzangolab/vue-locale-switcher'
import '@dzangolab/vue-locale-switcher/dist/localeSwitcher.css' // import stylesheet

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

The locale `code` is whatever your app uses to identify the locale. We recommend the stanard ISO code, eg `en, `en_us`,  etc.

The locale `name` is used to display the locale. We recommend using the localized locale name, eg 'English', 'Français', 'Deutsch', etc.

This setting is **required**.

### `mode`

Determines the behavior of the component when a different locale is selected.


#### `pwa` (default)

When a different locale is selected, the vue-router will load the route associated with the selected locale.

Use this mode if your app has different routes for each page in different locales, such as `/aboutus` (en) vs `/apropos` (fr), or `/home` (en) vs `/de` (de).


#### `spa`

When a different locale is selected, the current route remains unchanged and the page is not reloaded. This assumes that your app will listen to the `locale-switcher:localeChanged` event and updates its locale somehow.

#### `ssr`

Set the mode to `ssr` if your app uses server side rendering.

When a different locale is selected, the url associated with this locale will be loaded.

### `theme`

Specifies the theme to use to style the component. Currently 2 themes are provided:

### `bootstrap` (default)

If this theme is selected, then the appropriate bootstrap classes will be set on the component. It is assumed that the component will be placed inside a bootstrap Navbar.

Custom styling is provided for device width below 992px.


### `custom`

If this theme is selected, then custom BEM classes will be set on the component. Currently these classes are styled to resemble bootstrap, but they can easily be overridden inside your own stylesheet.


## Events

The component fires the following events:

### `locale-switcher:localeChanged`

Fired after a new locale has been set. The event includes the new locale value.

## SCSS

Instead of importing the css file in component or main.js, you can also import scss file into your app scss file.

```
@import '~@dzangolab/vue-locale-switcher/src/assets/scss/locale-switcher.scss';
```
