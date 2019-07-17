# @dzango/locale-switcher

component for Vue, SPA and SSR.

# Install
#### NPM

``` bash
npm install @dzango/locale-switcher --save
```
**OR**

#### YARN

``` bash
yarn add @dzango/locale-switcher
```

### Mount SPA

#### mount with global

``` javascript
import Vue from 'vue'
import {LocaleSwitcher} from '@dzango/locale-switcher'

// require style
import '@dzango/locale-switcher/dist/localeSwitcher.css'

Vue.use('LocaleSwitcher', LocaleSwitcher)
```

#### mount with component

```javascript
// require styles
import '@dzango/locale-switcher/dist/localeSwitcher.css'

import {LocaleSwitcher} from '@dzango/locale-switcher'

export default {
  components: {
    LocaleSwitcher
  }
}
```
#### Events:
`changeLocale`: Whenever the `locale` changes, this event is fired with the new value of locale as a parameter.

#### Props:
`locale`: Initial state of the `locale`.

`locales`: Array of locales. Every `locale` needs to be in the `{ code: 'code of locale', name: 'label of locale' }` format.

#### Usage
``` html
<template>
    <LocaleSwitcher
      @changeLocale="updateLocale"
      :locale="locale"
      :locales="locales"
    />
</template>
```

#### mount with ssr

#### mount with global

``` javascript
import Vue from 'vue'
import {LocaleSwitcherSSR} from '@dzango/locale-switcher'

// require style
import '@dzango/locale-switcher/dist/localeSwitcher.css'

Vue.use('LocaleSwitcherSSR', LocaleSwitcherSSR)
```


#### mount with component

```javascript
// require styles
import '@dzango/locale-switcher/dist/localeSwitcher.css'

import {LocaleSwitcherSSR} from '@dzango/locale-switcher'

export default {
  components: {
    LocaleSwitcherSSR
  }
}
```

#### Props:
`locale`: Initial state of the `locale`.

`locales`: Array of locales. Every `locale` needs to be in the `{ code: 'code of locale', name: 'label of locale' }` format.

#### Usage
``` html
<template>
    <LocaleSwitcherSSR
      :locale="locale"
      :locales="locales"
    />
</template>
```