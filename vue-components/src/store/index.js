import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import permission from './permission'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    addcounter(state, value) {
      state.counter += value
    },

  },
  actions: {
    addcounter({ commit }, value) {
      setTimeout(() => {
        commit('addcounter', value)
      }, 1000)
    }
  },
  getters: {
    doublecounter(state) {
      return state.counter * 2
    },
    roles: state => state.user.roles,
    hasRoles: state => state.user.roles && state.user.roles.length > 0
  },
  modules: {
    user,
    permission
  }
})
