/**
 * 1.require function 调用Module.prototype.require
 * 2.Module._load
 * 3.Module._cache
 * 4.new Module
 * 5.module.load(filename);
 * 6.找到this.paths，获取extname
 * 7.Module._extensions策略模式加载不同代码
 * 8.module._compile
 * 9.Module.wrap
 * 10.vm.runInThisContext()
 */
const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(id) {
  this.exports = {}
  this.id = id
}

Module.prototype.load = function (filename) {
  let extname = path.extname(filename)

  if (!extname) {
    const exts = Object.keys(Module._extensions)

    for (var i = 0; i < exts.length; i++) {
      const filepath = filename + exts[i]
      if (fs.existsSync(filepath)) {
        filename = filepath
        extname = exts[i]
      }
    }
  }
  Module._extensions[extname](this, filename)
}

Module._load = function (file) {
  const filename = path.resolve(__dirname, file)
  if (Module._cache[filename]) {
    return Module._cache[filename].exports
  }
  const module = new Module(filename)

  module.load(filename)

  Module._cache[filename] = module
  return module.exports;
}

Module.wrap = function (scripts) {
  const template = [
    '(function (exports, require, module, __filename, __dirname) {',
    scripts,
    '})'
  ]

  return template.join('')
}

Module._extensions = {
  ".js": function (module, filename) {
    const content = fs.readFileSync(filename, 'utf8')
    const wrap = Module.wrap(content)
    const moduleFunction = vm.runInThisContext(wrap)

    const exports = module.exports
    const require = myRequire
    const __filename = filename
    const __dirname = path.dirname(__filename)
    moduleFunction.call(exports, exports, require, module, __filename, __dirname)
  },
  ".json": function (module, filename) {
    const content = fs.readFileSync(filename, 'utf8')
    module.exports = JSON.parse(content)
  }
}
Module._cache = Object.create(null)

function myRequire(filename) {
  return Module._load(filename)
}

const r = myRequire('./a.js')
console.log(myRequire('./a.js'))
const b = myRequire('./b')
myRequire('./a.json')
console.log(myRequire('./a.js'))
console.log(r, b)