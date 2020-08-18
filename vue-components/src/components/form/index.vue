<template>
  <div>
    <p @click="$store.commit('addcounter', 1)">counter : {{$store.state.counter}}</p>
    <p @click="$store.dispatch('addcounter', 2)">counter : {{$store.state.counter}}</p>
    <p>{{$store.getters.doublecounter}}</p>
    <r-form :model="form" :rules="rules" ref="form">
      <r-form-item label="账户" prop="name">
        <r-input v-model="form.name" placeholder="请输入账户" />
      </r-form-item>
      <r-form-item label="密码" prop="password">
        <r-input type="password" v-model="form.password" placeholder="请输入密码" />
      </r-form-item>
      <r-form-item>
        <button @click="validate()">校验</button>
      </r-form-item>
    </r-form>
  </div>
</template>

<script>
import RForm from "./RForm";
import RFormItem from "./RFormItem";
import RInput from "./RInput";
import Notice from "@/components/Notice.vue";
import create from "@/utils/extend";

export default {
  data() {
    return {
      form: {
        name: "randy",
        password: "111",
      },
      rules: {
        name: [{ required: true, message: "必须输入用户名" }],
        password: [{ required: true, message: "必须输入密码" }],
      },
    };
  },
  components: {
    RInput,
    RFormItem,
    RForm,
  },
  methods: {
    validate() {
      this.$refs.form.validate((valid) => {
        create(Notice, {
          title: "randy",
          message: valid ? "请求登录" : "校验失败",
          duration: 5000,
        }).show();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>