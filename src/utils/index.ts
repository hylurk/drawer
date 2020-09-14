declare global {
  interface Window {
    __currentTop: number
    __styleOverflow: string
    __stylePosition: string
    __styleWidth: string
  }
}
/**
 * 显示遮罩时禁止 body 滚动
 * @date 2020-09-13
 */
window.__currentTop = 0
window.__styleOverflow = ''
window.__stylePosition = ''
window.__styleWidth = ''
export function fixBody() {
  window.__currentTop = window.scrollY
  document.body.style.top = -window.scrollY + 'px'
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
}
/**
 * 隐藏遮罩时允许 body 滚动
 * @date 2020-09-13
 */
export function freeBody() {
  document.body.style.overflow = window.__styleOverflow
  document.body.style.position = window.__stylePosition
  document.body.style.width = window.__styleWidth
  window.scrollTo(0, window.__currentTop)
}
/**
 * 获取特定元素
 * @date 2020-09-13
 * @param {string} ns 元素 id 或者 class
 * @returns {HTMLElement} 特定元素
 */
export function dqs(ns: string) {
  return <HTMLElement>document.querySelector(ns)
}
/**
 * 获取特定元素集合
 * @date 2020-09-13
 * @param {string} ns 元素 class
 * @returns {NodeListOf} 特定元素集合
 */
export function dqsa(ns: string) {
  return document.querySelectorAll(ns)
}
/**
 * 获取特定元素下的特定子元素
 * @date 2020-09-13
 * @param {string} fs 父元素 id 或者 class
 * @param {string} cs 子元素 id 或者 class
 * @returns {Function} 特定父元素获取给定子元素的函数
 */
export function dqsf(fs: string) {
  return (cs: string) => {
    return document.querySelector(fs)?.querySelector(cs)
  }
}