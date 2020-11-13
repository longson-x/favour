export default {
  isWeiXin() {
    const ua = navigator.userAgent.toLowerCase()
    return !!ua.match(/MicroMessenger/i)
  },

  isH5() {
    return window && !this.isWeiXin()
  },

  isIOS() {
    const ua = navigator.userAgent
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  },

  isAndroid() {
    const ua = navigator.userAgent
    return !!ua.match(/(Android)/i) // android终端
  },
}
