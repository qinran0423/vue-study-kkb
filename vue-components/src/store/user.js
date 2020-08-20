const state = {
  token: localStorage.getItem('token'), // 获取令牌
  // 其他用户信息
  roles: []
}

const mutations = {
  // 设置令牌
  setToken: (state, token) => {
    state.token = token
  },
  setRoles: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 模拟用户登录
  login({ commit }, userInfo) {
    const { username } = userInfo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' || username === 'randy') {
          commit('setToken', username)
          localStorage.setItem('token', username)
          resolve()
        } else {
          reject('用户名密码错误')
        }
      }, 1000);
    })
  },
  getInfo({ commit, state }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const roles = state.token === 'admin' ? ['admin'] : ['editor']

        commit('setRoles', roles)
        resolve({ roles })
      }, 1000);
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}