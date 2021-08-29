import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { MessageBox } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/layout/index'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/home/index')
      },
      {
        path: '/article',
        name: 'Article',
        component: () => import('../views/article/index')
      },
      {
        path: '/image',
        name: 'Image',
        component: () => import('../views/image/index')
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/publish/index')
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () => import('../views/comment/index')
      },
      {
        path: '/fans',
        name: 'Fans',
        component: () => import('../views/fans/index')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/settings/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../components/404/index')
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  if (store.state.user.token) {
    return next()
  }

  MessageBox('使用该后台管理请先登录', '提示')
    .then(() => {
      next('/login')
    })
    .catch(() => { })
})

export default router
