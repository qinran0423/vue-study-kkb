



let _Vue

class Router {
  constructor(options) {
    this.$options = options

    // 定义一个响应式的current属性
    const initial = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'current', initial)


    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.current = window.location.hash.slice(1)
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

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true
      }
    },
    render(h) {
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })

  Vue.component('router-view', {
    render(h) {
      let component = null
      const route = this.$router.$options.routes.find(item => item.path === this.$router.current)
      if(route) {
        component = route.component
      }
      return h(component)
    }
  })
}


export default Router 


