const ejs = require('ejs')
const path = require('path')

ejs.renderFile(path.resolve(__dirname, './index.html'), {name: 'zhufeng', age: '18', list: [1, 2, 3]}, (err, html) => {
  console.log(err, html)
})