import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('@views/home/home')
const Love = () => import('@views/love/love')
const TestLuckCard = () => import('@views/testCard/testCard')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '入口',
      keepAlive: true,
    },
  },
  {
    path: '/love',
    name: 'love',
    component: Love,
    meta: {
      title: '爱你哟！',
      keepAlive: true,
    },
  },
  {
    path: '/testLuckCard',
    name: 'testLuckCard',
    component: TestLuckCard,
    meta: {
      title: '测试刮刮卡',
      keepAlive: true,
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: 'favour',
  routes,
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
