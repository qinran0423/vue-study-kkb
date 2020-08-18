
function defineReactive(obj, key, val) {
  observe(val)

  // 管家创建
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newval) {
      if (newval !== val) {
        // 如果newVal是对象，也要做响应式处理
        observe(newval)
        val = newval
        console.log('set', key, newval);

        // 通知更新
        dep.notify()
      }
    }
  })
}
// 遍历指定数据对象每个key，拦截
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  // 每遇到一个对象，就创建一个Observer实例
  // 创建一个Observer实例去做拦截操作
  new Observe(obj)
}

function proxy(vm, key) {
  Object.keys(vm[key]).forEach(k => {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k]
      },
      set(v) {
        vm[key][k] = v
      }
    })
  })
}

class Observe {
  constructor(value) {
    this.value = value

    this.walk(this.value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}


class Rvue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    observe(this.$data)
    proxy(this, '$data')

    new Compile(this.$options.el, this)
  }
}



class Compile {
  constructor(el, vm) {
    this.el = document.querySelector(el)
    this.$vm = vm
    // 解析模板
    if (el) {
      this.compile(this.el)
    }
  }
  compile(el) {
    // el是宿主元素
    // 遍历它，判断当前遍历元素的类型
    el.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log('编译文本', node.textContent, RegExp.$1);
        this.update(node, RegExp.$1, 'text')
      }

      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  // 编译元素：分析指令、@事件
  compileElement(node) {
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value

      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2)

        this[dir] && this[dir](node, exp)
      }
    })
  }

  isDirective(attr) {
    return attr.indexOf('r-') === 0
  }
  text(node, exp) {
    this.update(node, exp, 'text')
  }

  textUpdater(node, val) {
    node.textContent = val
  }
  // 提取update, 初始化和更新函数创建
  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    // 初始化
    fn && fn(node, this.$vm[exp])

    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }
}
// Watcher: 小秘书，跟视图中依赖1：1
class Watcher {
  constructor(vm, key, updaterFn) {
    this.vm = vm
    this.key = key
    this.updaterFn = updaterFn
    // 依赖收集触发
    Dep.target = this
    this.vm[this.key] // 触发上面的get
  }


  update() {
    this.updaterFn(this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}