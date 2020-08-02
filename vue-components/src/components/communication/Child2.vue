<template>
  <div>
    <h2>Child2</h2>
    <button @click="action">click</button>
  </div>
</template>

<script>
export default {
  methods: {
    action() {
      this.$bus.$emit("event-bus", "aaaa");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>