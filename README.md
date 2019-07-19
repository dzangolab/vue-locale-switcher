# @dzangolab/locale-switcher

component for Vue, SPA and SSR.

# Install
#### NPM

``` bash
npm install @dzangolab/vue-locale-switcher --save
```
**OR**

#### YARN

``` bash
yarn add @dzangolab/vue-locale-switcher
```

### Mount

#### mount with global

``` javascript
import Vue from 'vue'
import LocaleSwitcher from '@dzangolab/vue-locale-switcher'

// require style
import '@dzango/locale-switcher/dist/localeSwitcher.css'

Vue.use('LocaleSwitcher', LocaleSwitcher)
```

#### mount with component

```javascript
// require styles
import '@dzango/locale-switcher/dist/localeSwitcher.css'

import LocaleSwitcher from '@dzangolab/vue-locale-switcher'

export default {
  components: {
    LocaleSwitcher
  }
}
```
#### Events:
`afterLocaleChanged`: Whenever the `locale` changed, this event is fired with the new value of locale as a parameter.
`beforeLocaleChange`: Whenever the `locale` changes, this event is fired. it will be useful if dev wants to add extra behaviour just before locale changes.

#### Props:
`locale`: Initial state of the `locale`.

`locales`: Array of locales. Every `locale` needs to be in the `{ code: 'code of locale', name: 'label of locale' }` format.

`ssr`: true for server side rendering app. default value is false(i.e. for SPA app use)

`localizePath`: Default false, This prop is only for SPA apps, used when app has locale based routes.

#### Usage SPA
``` html
<template>
    <LocaleSwitcher
      @afterLocaleChanged="onLocaleChanged"
      :locale="locale"
      :locales="locales"
    />
</template>
```

#### Usage SSR
``` html
<template>
    <LocaleSwitcher
      :locale="locale"
      :locales="locales"
      :ssr="true"
    />
</template>
```
*** Note: This package only supports the route name in `name_{locale}` pattern.
