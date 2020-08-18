

let _Vue
class Store {
  constructor(options) {

    this._mutations = options.mutations
    this._actions = options.actions

    let computed = {}

    this._getters = options.getters
    this.getters = {}
    let store = this
    Object.keys(this._getters).forEach(item => {
      const fn = store._getters[item]
      computed[item] = function () {
        return fn(store.state)
      }
      Object.defineProperty(store.getters, item, {
        get: () => store._vm[item]
      })

    })



    // 实现响应式
    this._vm = new _Vue({
      data() {
        return {
          //  加了$ 不代理到_vm实例
          $$store: options.state
        }
      },
      computed
    })
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }


  get state() {
    return this._vm._data.$$store
  }
  // 不能直接修改state
  set state(v) {
    console.error('xxxx')
  }


  commit(type, payload) {
    let entry = this._mutations[type]

    if (!entry) {
      console.error('xxxxx')
    }

    entry(this.state, payload)
  }


  dispatch(type, payload) {
    let entry = this._actions[type]

    if (!entry) {
      console.error('xxxxx')
    }

    return entry(this, payload)
  }
}



function install(Vue) {
  _Vue = Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}


export default {
  Store,
  install
}



