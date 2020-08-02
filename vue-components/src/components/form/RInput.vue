<template>
  <div>
    <input :type="type" :value="value" @input="inputEvent" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixin/index.js";
export default {
  inheritAttrs: false,
  props: ["type", "value"],
  mixins: [emitter],
  methods: {
    inputEvent(e) {
      this.$emit("input", e.target.value);
      this.dispatch("RFormItem");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>