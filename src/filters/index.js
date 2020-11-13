import Vue from 'vue'
import { CommonUtil } from 'sn-js-utils'

// 定义所有的过滤器
const filters = {
  maskPhone: function(phone) {
    return CommonUtil.maskPhone(phone)
  },
  formatPrice: function(price) {
    return '￥' + price.toFixed(2)
  },
}

for (const key in filters) {
  Vue.filter(key, filters[key])
}
