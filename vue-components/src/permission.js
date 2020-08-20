import router from './router'
import store from './store'

const whitelist = ['/login'] // 无需令牌白名单

router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否登录
  const hasToken = localStorage.getItem('token')
  // 已经登录
  if (hasToken) {
    if (to.path === '/login') {
      // 若已登录没有必要显示登录页，重定向至首页
      next('/')
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 说明用户已获取过了角色信息
        next()
      } else {
        try {
          // 先请求获取用户信息
          const { roles } = await store.dispatch('user/getInfo')
          console.log(roles)
          // 根据当前用户角色过滤出可访问路由
          const accessedRoutes = await store.dispatch('permission/generateRoutes')
          // 添加至路由器
          router.addRoutes(accessRoutes)

          // 继续路由切换，确保addRoutes完成
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
        }
      }
    }
  } else {
    // 未登录
    if (whitelist.indexOf(to.path) !== -1) {
      next()
    } else {
      // 重定向到路由
      next(`/login?redirect=${to.path}`)
    }
  }

})