import Vue from 'vue'

function create(Component, props) {
  const vm = new Vue({
    render(h) {
      return h(Component, { props })
    }
  }).$mount();
  document.body.appendChild(vm.$el);
  const Comp = vm.$children[0];
  Comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy()
  }

  return Comp
}


export default create