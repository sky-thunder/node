const fs = require('fs')
const path = require('path')
const Promise = require('./promise')

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

function read () {
  const dfd = Promise.defer()

  fs.readFile(path.resolve(__dirname, '../name.txt'), 'utf8', (err, data) => {
    if(err) {
      return dfd.reject(err)
    }
    // console.log(dfd)
    dfd.resolve(data)
  })

  return dfd.promise
}


read().then(data => {
  console.log(data)
}, e => {
  console.log(e)
})
// console.log()
