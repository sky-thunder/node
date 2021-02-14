const fs = require('fs')
const path = require('path')

function renderTemplate(templatePath, data, cb) {
  fs.readFile(templatePath, 'utf-8', (err, template) => {
    if (err) {
      return cb(err, template)
    }
    let head = "let str = ''\r\n with(data){"
    head += 'str += `'
    template = template.replace(/\{\{(([^}]+))\}\}/g, function() {
      return '${' + arguments[1] + '}'
    })
    template = template.replace(/\{%([^%]+)%\}/g, function(){
      return '`\r\n' + arguments[1] + '\r\n str += `'
    })
    template += '`\r\n } \r\n return str'
    
    // console.log(head + template)
    const html = new Function('data', head + template)
    cb && cb(err, html(data))
  })
}

renderTemplate(path.resolve(__dirname, './my-template.html'), {name: 'zhufeng', age: '18', list: [1, 2, 3]}, (err, html) => {
  if (!err) {
    console.log(html)
  }
})