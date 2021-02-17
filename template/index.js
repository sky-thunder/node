const vm = require('vm')
const a = 'fuck'
const codeStr = 'console.log(`22222222222222222`, a)'
// eval(codeStr)
// vm.runInThisContext(codeStr)
const tempFn = new Function(codeStr)
tempFn()
