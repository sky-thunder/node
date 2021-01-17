const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  resolve('1111111')
})

const p2 = p1.then(data => {
  return 'data'
}, (e) => {
  console.log('失败了', e)
})

p2.then(data => {
  console.log(`p2===========>${data}`)
}, err => {
  console.log(err)
})
