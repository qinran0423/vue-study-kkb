<template>
  <div>
    <h2>Child1</h2>
    <div>{{$attrs.msg}}</div>
    <Grandson v-bind="$attrs" />
  </div>
</template>

<script>
import Grandson from "./Grandson.vue";
export default {
  components: {
    Grandson,
  },
};
</script>

<style lang="scss" scoped>
</style>