function render (obj) {
  let str = ''
  with(obj) {
str += `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  ${name}${age}
  `
list.forEach(item => {
str += `
    ${item}
  `
})
str += `
</body>
</html>`
  }
  console.log(str)
  return str
}

console.log(render({name:'zhufeng', age: 12, list: [1,2,3]}))