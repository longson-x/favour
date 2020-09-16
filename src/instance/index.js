import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

Vue.prototype.$toast = function toast (message) {
  Toast(message)
}

Vue.prototype.$toastSuccess = function toastSuccess (message) {
  Toast.success(message)
}

Vue.prototype.$toastFail = function toastFail (message) {
  Toast.fail(message)
}

Vue.prototype.$showLoading = function showLoading (message) {
  Toast.loading({
    message: message,
    forbidClick: true,
    duration: 0
  })
}

Vue.prototype.$hideLoading = function hideLoading () {
  Toast.clear()
}

Vue.prototype.$px2vw = function (px) {
  return 100 * px / 750 + 'vw'
}

Vue.prototype.$makePhoneCall = function ({ phoneNumber }) {
  window.location.href = `tel:${phoneNumber}`
}
