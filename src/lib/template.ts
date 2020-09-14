import TouchSlide from '../utils/touchSlide'
import {
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
  wrapper: HTMLElement | string,
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
  wrapper: HTMLElement,
  dqsf: Function
}

class Template {
  drawer: DrawerSelf
  wrapper: HTMLElement
  options: DrawerInstance
  dqsf: Function
  constructor (drawer: DrawerSelf) {
    this.drawer = drawer
    this.options = drawer._options
    this.wrapper = drawer.wrapper
    this.dqsf = drawer.dqsf
    this.init()
  }
  init() {
    let contentInnerHTML = ''
    this.options.levels.forEach((item, index) => {
      // merge every item's
      item = Object.assign({}, {
        backIconVisible: true,
        backIconCallback: () => {},
        title: '',
        letterVisible: false,
        letters: [],
      }, item)
      const headerHTML =
      `<header class="drawer-header">
        ${item.backIconVisible ? '<i class="drawer-header__back"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1080" width="200" height="200"><path d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z" p-id="1081"></path></svg></i>' : ''}
        ${item.title? `<h3 class="drawer-header__title">${item.title}</h3>` : ''}
      </header>`
      // all html
      contentInnerHTML +=
      `<div class="drawer-box drawer-box-${index}" ${index > 0 ? 'style="display: none;"' : ''}>
        ${headerHTML}
        <div class="drawer-list"></div>
      </div>`
    })
    // wrapper
    this.wrapper.innerHTML =
    `<div class="drawer-container">
      ${this.options.mask ? '<div class="drawer-mask"></div>' : ''}
      ${`<div class="drawer-content" style="width: ${this.options.width};">
        ${contentInnerHTML}
      </div>`}
    </div>`
    // add event listener
    // click mask
    this.dqsf('.drawer-container .drawer-mask')?.addEventListener('click', () => {
      this.drawer.close()
    })
    // click back icon
    this.options.levels.forEach((item, index) => {
      const _this = this
      // add back icon event listener
      this.dqsf(`.drawer-box-${index} .drawer-header__back`)!.addEventListener('click', function() {
        if (index === 0) {
          _this.drawer.close()
        } else {
          this.parentNode.parentNode.style.display = 'none'
        }
      })
    })
  }
  // 字母滑动事件
  listenLetter(idx: number, letters: string[]) {
    let lettersHTML = ''
    // if show letter
    if (letters.length) {
      let lettersListHTML = ''
      letters.sort().forEach((item, index) => {
        lettersListHTML += `<li class="letters-item" data-index="${index}">${item}</li>`
      })
      lettersHTML =
      `<ul>
          ${lettersListHTML}
        </ul>
      `
      const divEl = document.createElement('div')
      divEl.className = 'drawer-letters-box'
      divEl.innerHTML = lettersHTML
      const tipEl = document.createElement('div')
      tipEl.className = 'drawer-letters-tips'
      this.dqsf(`.drawer-box-${idx}`)?.append(divEl, tipEl)
    }
    new TouchSlide({
      container: this.dqsf(`.drawer-box-${idx} .drawer-list`) as HTMLElement,
      itemClassName: 'letters-item',
      tipContainer: this.dqsf('.drawer-letters-tips') as HTMLElement,
    })
  }
}

export default Template
