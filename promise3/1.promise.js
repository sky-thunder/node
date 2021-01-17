const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  resolve(1000)
})

const p2 = p1.then(data => {
  return new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    }))
  })
})

p2.then(data => {
  console.log('成功', data)
}, e => {
  console.log(e)
})
