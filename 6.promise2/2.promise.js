const Promise = require('./promise')

const p1 = new Promise((resolve, reject) => {
  resolve('1111111')
  // reject('fkkkk')
})

const p2 = p1.then(data=>{
  throw new Error('11111')
}, e => {
  
})
p2.then(data => {
  // console.log(data)
}, error => {
})