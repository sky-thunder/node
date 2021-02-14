const { program } = require('commander');

function init() {
  program.version('1.0.0')
  program
    .option('-d, --debug', 'output extra debugging')
  
  program.parse(process.argv)
}

module.exports = {
  init
}
