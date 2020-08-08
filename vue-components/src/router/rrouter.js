import link from './rrouter-link'
import view from './rrouter-view'
let _Vue

class Router {
  constructor(options) {
    this.$options = options

    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
    // 定义一个响应式的current属性
    this.current = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'matched', [])
    this.match()
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
  }

  match(routes) { 
    routes = routes || this.$options.routes

    for (const route of routes) {
      if(route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }

      if(route.path !== '/' && this.current.indexOf(route.path) != -1 ) {
        this.matched.push(route)
        if(route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}


Router.install = function(Vue) {
  _Vue = Vue
  Vue.mixin({
    beforeCreate() {
      if(this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  Vue.component('router-link', link)

  Vue.component('router-view', view)
}


export default Router 


