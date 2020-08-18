<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{union}}
    <input type="text" @keyup.enter="addFeature"/>
    <ul>
      <li v-for="feature in features" :key="feature.id" :class="{'selected': feature.selected}" >{{feature.name}}</li>
    </ul>
    {{count}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {  FeatureSelect, Person,  Result} from '@/type'

// 函数重载
// 重载1
function watch(cb1: () => void): void;
// 重载2
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;

function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void ) {
  if(cb1 && cb2) {
    console.log('执行重载1')
  } else {
    console.log('执行重载2')
  }
}
// 执行
watch(() => {
  console.log(222)
})
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  // features: string[] = ["类型注解", "编译型语言"];
  features: FeatureSelect[] = [
    {id: 1, name: '类型注解', selected: true},
    {id: 2, name: '编译型语言', selected: false}
  ]


  // 定义getter 为计算属性
  get count() {
    return this.features.length
  }
  // 联合类型
  union: string | number = 2
  addFeature(e: KeyboardEvent) {
    // e.target 是 EventTarget类型， 需要断言为HTMLInputElement
    const inp = e.target as HTMLInputElement
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false
    }
    this.features.push(feature);
    inp.value = ''
  }

  greeting(person: Person): string {
    return `Hello, ${person.firstName}   ${person.lastName}`
  }

  getResult<T>(data: T): Promise<Result<T>> {
    return Promise.resolve({
      ok: 1,
      data
    })
  }

  async created() {
    console.log(this.greeting({
       firstName: 'randy',
       lastName: '秦'
     }))
    //  const result = await this.$axios.get<FeatureSelect[]>('/api/list')
    //  console.log(result.data)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}

.selected{
  background: #42b983;
}
</style>
