# drawer

**English** | **[简体中文](https://github.com/hylurk/drawer/blob/master/README_CHINESE.md)**

A cascaded drawer UI component for mobile.

## Installation

```shell
npm install @lurk/drawer
```

or

```shell
yarn add @lurk/drawer
```

## Demo

You can use it like this :

**html**

```html
<body>
  <div id="wrapper"></div>
  <button id="btn">
    Click Me
  </button>
</body>
```

**js**

```js
import '@lurk/drawer/dist/css/drawer.min.css'
import Drawer from '@lurk/drawer'

const drawer = new Drawer({
  wrapper: '#wrapper',
  levels: [
    {
      title: 'Choose Province',
    },
    {
      title: 'Choose City',
    },
    {
      title: 'Choose County',
    }
  ]
})

document.querySelector('#btn').addEventListener('click', function () {
  drawer.show()
})
```

## License

[MIT](https://github.com/hylurk/drawer/blob/master/LICENSE)

