import router from './router'
import store from './store'

const whitelist = ['/login'] // 无需令牌白名单

router.beforeEach((to, from, next) => {
  // 获取令牌判断用户是否登录
  const hasToken = localStorage.getItem('token')

  // 已经登录
  if(hasToken) {
    if(to.path === '/login') {
      // 若已登录没有必要显示登录页，重定向至首页
      next('/')
    } else {
      
    }
  } else {
    // 未登录
    if(whitelist.indexOf(to.path) !== -1) {
      //
      next()
    } else {
      // 重定向到路由
      next(`/login?redirect=${to.path}`)
    }
  }
  
})