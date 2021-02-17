const fs = require('fs').promises

function * read() {
  let name = yield fs.readFile('name.txt', 'utf-8')
  console.log('name', name)
  let age = yield fs.readFile('age.txt', 'utf-8')
  console.log('age', age)
  return {age, name}
}

const it = read()
// const { value, done } = it.next()
// value.then(data => {
//   const { value, done } = it.next()
//   value.then(data => {
//     console.log(data)
//   })
// })

const co = it => {
  return new Promise((resolve, reject) => {
    function next (data) {
      const { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(next, reject)
      } else {
        resolve(value)
      }
    }
  
    next()
  })
}

co(it).then(data => {
  console.log(data)
}).catch(e => {
  console.log(e)
})
