
//类型别名
export type Feature = {
  id: number,
  name: string
}

// 交叉类型
type Select = {
  selected: boolean
}

export type FeatureSelect = Feature & Select



// 接口
export interface Person {
  firstName: string,
  lastName: string
}


// 泛型
export interface Result<T> {
  ok: 0|1,
  data: T
}