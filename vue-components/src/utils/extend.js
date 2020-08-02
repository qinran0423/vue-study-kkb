import Vue from 'vue'
//暗号：老杨喊你来搬砖
function create(Component, props) {
  // 创建构造器
  const Vm = Vue.extend(Component)
  // 创建实例，并挂载到body上
  const extendComponent = new Vm({
    propsData: { ...props }
  }).$mount()
  document.body.appendChild(extendComponent.$el);
  // 给实例添加remove方法，触发时从body移除并执行实力的destory
  extendComponent.remove = () => {
    document.body.removeChild(extendComponent.$el);
    extendComponent.$destroy()
  }
  return extendComponent
}
export default create