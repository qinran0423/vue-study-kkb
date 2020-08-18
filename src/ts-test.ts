// 装饰器原理
function log(target: any) {
  target.prototype.log = function() {
    console.log(this.bar);
  }
}


@log
class Foo{
  bar = 'bar'
}

const foo = new Foo()

foo.log()