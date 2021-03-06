const fs = require('fs')
const path = require('path')
// const Promise = require('./promise')

// function read () {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.resolve(__dirname, '../name.txt'), 'utf8', (err, data) => {
//       if(err) {
//         return reject(err)
//       }

//       resolve(data)
//     })
//   })
// }

// function read () {
//   const dfd = Promise.defer()

//   fs.readFile(path.resolve(__dirname, '../name.txt'), 'utf8', (err, data) => {
//     if(err) {
//       return dfd.reject(err)
//     }
//     // console.log(dfd)
//     dfd.resolve(data)
//   })

//   return dfd.promise
// }
// const p3 = Promise.resolve(new Promise((resolve, reject)=> {
//   setTimeout(() => {
//     resolve(1111)
//   }, 1000)
// }))
// p3.then(data => {
//   console.log('data', data)
// }, e => {
//   console.log('e', e)
// })

const p4 = Promise.reject(new Promise((resolve, reject)=> {
  setTimeout(() => {
    reject(456)
  }, 1000)
}).catch(e => {
  console.log(e)
}))

p4.then(null, e => {
  console.log(e)
})

// read().then(data => {
//   console.log(data)
//   throw new Error('发生异常')
// }).catch(e => {
//   console.log(e, 'catch')
// })
// console.log()
