
/**
 * 判断数据类型4种方式
 * typeof 基本类型判断 缺点不能区分object array 自定义类型
 * instanceof 判断对象是谁的实例
 * constructor 可以找到变量是谁构造出来的
 * Object.prototype.call()不能细分谁是谁的实例（只能判断部分对象的类型）
 */

function isType (value, type) {
  console.log(type, value)
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

// // console.log(Object.prototype.toString.call(Array))
// console.log(isType('Array', [1,2]))

// function isType (type) {
//   return function (value) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`
//   }
// }

// const isArray = isType('Array')
// console.log(isArray(123))
// console.log(isArray([]))

// console.log([].constructor)

const currying = function (fn, arr = []) {
  let len = fn.length
  return (...args) => {
    arr = [...args, ...arr]
    if (arr.length < len) {
      return currying(fn, arr)
    } else {
      return fn(...arr)
    }
  }
}



function sum (a, b, c, d, e, f) {
  return a + b + c + d + e + f
}

// console.time('aaaaaaa')

// let r = currying(sum)(1,2)(3,4)(5,6)

// console.log(r)
// console.timeEnd('aaaaaaa')


// function test (fn) {
//   console.log(fn.length)
// }

// function test2 (a, b, c) {

// }

// test(test2)

console.time('aaaaaaa')
const isArray = currying(isType)('Array')

console.log(isArray([]))
console.timeEnd('aaaaaaa')
