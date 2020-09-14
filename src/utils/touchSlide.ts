interface TouchSlideInstance {
  container: HTMLElement
  itemClassName: string
  tipContainer?: HTMLElement
}
interface UserElement {
  [key: string]: any
}

class TouchSlide {
  options: TouchSlideInstance
  letterClassName: string
  timer: number
  listLetters: NodeListOf<HTMLElement>
  constructor (options: TouchSlideInstance) {
    this.options = options
    this.letterClassName = options.itemClassName
    this.timer = -1
    this.listLetters = document.querySelectorAll('.list-letter')
    this.init()
  }
  init () {
    document.addEventListener('touchstart', event => {
      this.timerTick(() => {
        event.stopPropagation()
        const x = event.changedTouches[0].clientX
        const y = event.changedTouches[0].clientY
        const c = document.elementFromPoint(x, y) as UserElement
        if (c?.className === this.letterClassName) {
          const i = c.attributes['data-index'].value
          if (this.listLetters[i]) {
            this.options.container.scrollTop = this.listLetters[i].offsetTop - 44
            if (this.options.tipContainer) {
              this.options.tipContainer.innerHTML = c.innerHTML
              this.options.tipContainer.style.display = 'block'
            }
          }
        }
      }, 30)
    })
    document.addEventListener('touchmove', event => {
      this.timerTick(() => {
        event.stopPropagation()
        const x = event.changedTouches[0].clientX
        const y = event.changedTouches[0].clientY
        const c = document.elementFromPoint(x, y) as UserElement
        if (c?.className === this.letterClassName) {
          const i = +c.attributes['data-index'].value
          if (this.listLetters[i]) {
            this.options.container.scrollTop = this.listLetters[i].offsetTop - 44
            if (this.options.tipContainer) {
              this.options.tipContainer.innerHTML = c.innerHTML
              this.options.tipContainer.style.display = 'block'
            }
          }
        }
      }, 30)
    })
    document.addEventListener('touchend', () => {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.options.tipContainer) {
        this.timerTick(() => {
          this.options.tipContainer!.innerHTML = ''
          this.options.tipContainer!.style.display = ''
        }, 300)
      }
    })
  }
  timerTick (fn: Function, time: number) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(fn, time)
  }
}

export default TouchSlide
