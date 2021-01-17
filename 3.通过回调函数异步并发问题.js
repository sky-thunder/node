const fs = require('fs')

const student = {}

// let index = 0
const cb = after(4, () => {
  console.log(student)
})

function after (num, callback) {
  return () => {
    num --
    if (num === 0) {
      callback()
    }
  }
}

fs.readFile('./name.txt', (error, data) => {
  if (error) return
  console.log(data.toString())
  student.name = data.toString()
  cb()
})

fs.readFile('./age.txt', (error, data) => {
  if (error) return
  console.log(data.toString())
  student.age = data.toString()
  cb()
})

fs.readFile('./age.txt', (error, data) => {
  if (error) return
  console.log(data.toString())
  student.age1 = data.toString()
  cb()
})

fs.readFile('./age.txt', (error, data) => {
  if (error) return
  console.log(data.toString())
  student.age2 = data.toString()
  cb()
})
