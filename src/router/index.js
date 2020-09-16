import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('@views/home/home')
const Test = () => import('@views/test/test')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '入口',
      keepAlive: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: {
      title: '组件测试',
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'favour',
  routes
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
