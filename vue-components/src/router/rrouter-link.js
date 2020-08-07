export default {
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
}