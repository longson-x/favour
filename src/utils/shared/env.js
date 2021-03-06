// 参考https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
export let supportsPassive = false

try {
  const opts = Object.defineProperty({}, 'passive', ({
    get() {
      supportsPassive = true
    },
  }))
  window.addEventListener('testPassive', null, opts)
  window.removeEventListener('testPassive', null, opts)
} catch (e) {
}
