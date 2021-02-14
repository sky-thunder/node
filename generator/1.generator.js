let listItem = {
  0: '1111',
  1: '22222',
  2: '333333',
  length: 3
}

// listItem[Symbol.iterator] = function () {
//   let index = 0
//   return {
//     next:() => {
//       return {
//         value: this[index++],
//         done: index > this.length
//       }
//     }
//   }
// }

listItem[Symbol.iterator] = function * () {
  let index = 0

  while(index < this.length){
    yield this[index++]
  }
}

console.log(...listItem, 'fuck')