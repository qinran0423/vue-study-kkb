<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <div class="error" v-if="error">{{error}}</div>
  </div>
</template>

<script>
import Validator from "async-validator";
export default {
  componentName: "RFormItem",
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: String,
  },
  data() {
    return {
      error: "",
    };
  },
  created() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const validator = new Validator({ [this.prop]: rules });
      return validator.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>