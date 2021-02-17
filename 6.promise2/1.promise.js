const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1111111')
  }, 5000)
})

const p2 = p1.then(data => {
  console.log(`p2===========>${data}`)
}, (e) => {
  console.log('失败了', e)
})

p2.then(data => {
  console.log(`p2===========>${data}`)
}, err => {
  console.log(err)
})

p1.then(data => {
  console.log('1111', data)
})