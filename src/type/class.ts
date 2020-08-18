class Parent {
  private _foo = 'foo' // 私有属性，不能在类的外部访问
  protected bar = 'bar' // 保护属性， 可以在子类中访问

  // 参数属性： 构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = 'tua'){}

  // 方法修饰符
  private met() {
    
  }

  // 存取器： 属性方式访问，可添加额外逻辑，控制读写性
  get foo() {
    return this._foo
  }
  set foo(val) {
    this._foo = val
  }
}