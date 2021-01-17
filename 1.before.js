
/**
 * 高阶函数
 * 1.函数的参数是一个函数
 * 2.函数的返回值是一个函数
 */

function say (...args) {
  console.log(`hello world!!!${args}`)

}

Function.prototype.before = function (callback) {
  return (...args) => {
    callback()
    this(...args)
  }
}

const beforeSay = say.before(function () {
  console.log('before')
})

beforeSay('tom', 'sdf')
