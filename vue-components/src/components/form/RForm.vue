<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: "RForm",
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object,
  },
  methods: {
    validate(cb) {
      const task = this.$children
        .filter((item) => item.prop)
        .map((element) => element.validate());
      Promise.all(task)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>