import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 通用页面：  不需要首尾，可直接访问
export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  }
]


export const asyncRoutes = [
  {
    path: '/about',
    component: () => import('@/views/About.vue'),
    meta: {
      roles: ['admin']
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
