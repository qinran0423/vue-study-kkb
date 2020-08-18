
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

