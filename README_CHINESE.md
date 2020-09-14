# drawer

**[English](https://github.com/hylurk/drawer/blob/master/README.md)** | **简体中文**

一款适用于 M 端的级联抽屉 UI 组件。

## 安装

```shell
npm install @lurk/drawer
```

或

```shell
yarn add @lurk/drawer
```

## 示例

你可以像下面这样使用它:

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



