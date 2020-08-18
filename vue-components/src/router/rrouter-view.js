export default {
  render(h) {
    //标记当前组件的深度
    this.$vnode.data.routerView = true
    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      console.log(vnodeData);
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++
        }
      }
      parent = parent.$parent
      console.log(parent)
    }

    let component = null
    const route = this.$router.matched[depth]
    if (route) {
      component = route.component
    }

    return h(component)
  }
}