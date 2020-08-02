export default {
  methods: {
    dispatch(componentName) {
      //获取当前实例的父级
      let parent = this.$parent || this.$root;
      // 获取当前实例的父级componentName
      let name = parent.$options.componentName;
      console.log(parent)
      // 遍历 寻找父级的componentName和传入的组件名相同
      while (parent && (!name || name != componentName)) {

        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
        console.log(parent, parent.$options.componentName)
      }
      if (parent) {
        parent.$emit('validate')
      }
    }
  },
}