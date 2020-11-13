import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
// 注册全局过滤器
import './filters'
// 注册实例方法
import './instance'
import baiDuTj from '@utils/baiDuTJ'
// eslint-disable-next-line import/no-duplicates
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.less'

Vue.use(Vant)

Vue.use(Lazyload) // 图片懒加载

Vue.config.productionTip = false

Vue.prototype.$baiDuTj = baiDuTj

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
