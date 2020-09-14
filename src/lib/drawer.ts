import Template from './template'
import {
  fixBody,
  freeBody,
  dqs,
  dqsa,
  dqsf,
} from '../utils/index'

type LevelItem = {
  title?: string,
  backIconVisible?: boolean,
  backIconCallback?: Function,
  letterVisible?: boolean,
  letters?: Array<string>,
}
type DrawerInstance = {
  wrapper: string,
  levels: Array<LevelItem>,
  mask?: boolean,
  width?: string,
}
type TemplateInstance = {
  wrapper: HTMLElement,
  options: DrawerInstance,
}
type DrawerSelf = {
  $options: DrawerInstance
  _options: DrawerInstance
  template: TemplateInstance
  close: Function,
  skipLevel: Function,
}

const defaultOptions = {
  mask: true,
  width: '66.66%',
}

class Drawer {
  visible: boolean
  $options: DrawerInstance
  _options: DrawerInstance
  template: Template
  wrapper: HTMLElement
  dqsf: Function
  constructor (options: DrawerInstance) {
    this.visible = false
    // 缓存用户传入的参数
    const tempJsf = JSON.stringify(options)
    this.$options = JSON.parse(tempJsf)
    this.wrapper = dqs(options.wrapper)
    this.dqsf = dqsf(options.wrapper)
    this._options = Object.assign({}, defaultOptions, options)
    this.template = new Template(this)
  }
  show(fn = () => {}) {
    if (!this.visible) {
      const container = this.dqsf('.drawer-container')
      container.style.display = 'block'
      this.skipLevel(0)
      this.visible = true
      fixBody()
      fn()
    }
  }
  close(fn = () => {}) {
    if (this.visible) {
      const container = this.dqsf('.drawer-container')
      container.style.display = 'none'
      const boxEl = dqsa('.drawer-box')
      boxEl.forEach(item => {
        const _item = item as HTMLElement
        _item.scrollTop = 0
        _item.style.display = 'none'
      })
      this.visible = false
      freeBody()
      fn()
    }
  }
  skipLevel(num: number) {
    const container = this.dqsf(`.drawer-box-${num}`)
    container.style.display = 'block'
  }
  listenLetter(idx: number, letters: string[]) {
    this.template.listenLetter(idx, letters)
  }
}

export default Drawer
