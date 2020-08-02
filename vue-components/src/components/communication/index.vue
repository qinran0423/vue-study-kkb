<template>
  <div>
    <h2>组件通信</h2>
    <Child1 msg="大家好" />
    <!-- 总线 -->
    <Child2 />
  </div>
</template>

<script>
import Child1 from "./Child1.vue";

import Child2 from "./Child2.vue";
export default {
  components: {
    Child2,
    Child1,
  },

  created() {
    this.$bus.$on("event-bus", (content) => {
      console.log(content);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>