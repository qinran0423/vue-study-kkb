import { asyncRoutes, constRoutes } from "@/router";

const state = {
  routes: [], // 完整路由表
  addRoutes: [] //用户可访问路由表
}

const mutations = {
  setRoutes: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constRoutes.concat(routes);
  }
}


const actions = {
  // 路由生成： 在得到用户角色后第一时间调用
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 根据角色做过滤处理

      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      commit("setRoutes", accessedRoutes);
      resolve(accessedRoutes);
    })
  }
}


export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // 如果用户有访问权限则加入结果路由表
    if (hasPermission(roles, tmp)) {
      //如果存在子路由则递归过滤
      if (tmp) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp)
    }

  })
  return res;
}


/**
 * 根据路由meta.role确定是否当前用户拥有访问权限
 * @param {*} roles 用户拥有角色
 * @param {*} route 带判定的路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return false
  }
}


export default {
  state,
  mutations,
  actions
}