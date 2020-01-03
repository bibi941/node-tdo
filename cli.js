const program = require('commander')
const api = require('./index')

program
.command('add')
.description('add a task')
.action((...args) => {
  const task = args.slice(0 - 1).join('')
  api.add(task).then(() => console.log(('添加成功'))).catch(() => console.log('添加失败'))
})

program.command('clear').description('add all task').action(() => {
  api.clear().then(() => console.log('删除成功')).catch(() => console.log('删除失败'))
})

if (process.argv.length === 2) {
  // 用户直接输入 node cli 且没有任何参数
  void api.showAll()
}

program.parse(process.argv)
