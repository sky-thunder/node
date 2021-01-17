const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  // resolve(1000)
  reject('你大爷的')
})

p1.then().then().then().then(data => {
  console.log('成功了', data)
}, e => {
  console.log('失败了', e)
})
