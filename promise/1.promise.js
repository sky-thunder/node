const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1111111')
  })
})

p1.then(data => {
  console.log('成功了', data)
}, (e) => {
  console.log('失败了', e)
})

p1.then(data => {
  console.log('成功了2', data)
}, (e) => {
  console.log('失败了2', e)
})

// console.log(p1)