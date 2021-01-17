const fs = require('fs')

const event = {
  data: [],
  on: function (callback) {
    this.data.push(callback)
  },
  emit: function () {
    this.data.forEach(function(callback) {
      callback()
    })
  }
}

event.on(function(){
  if (Object.keys(student).length === 2) {
    console.log(student)
  }
})
const student = {}
fs.readFile('./name.txt', (error, data) => {
  if (error) return
  student.name = data.toString()
  event.emit()
})

fs.readFile('./age.txt', (error, data) => {
  if (error) return
  student.age = data.toString()
  event.emit()
})
