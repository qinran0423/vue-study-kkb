<template>
  <div>
    <input :type="type" :value="value" @input="inputEvent" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["type", "value"],
  methods: {
    inputEvent(e) {
      this.$emit("input", e.target.value);
      this.$parent.$emit("validate");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>