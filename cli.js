const program = require('commander')
const api = require('./index')

program
.command('add')
.description('add a task')
.action((...args) => {
  const task = args.slice(0 - 1).join('')
  api.add(task)
})

program.command('clear').description('add all task').action(() => {
  api.clear()
})

program.parse(process.argv)
