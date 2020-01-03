const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (taskName) => {
  const taskList = await db.read()
  taskList.push({ taskName,done: false })
  await db.write(taskList)
}

module.exports.clear = async () => {
  await db.write([])
}

module.exports.showAll = async () => {
  const taskList = await db.read()
  printTask(taskList)
}

const printTask = (taskList) => {
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择任务',
    choices: [
      { name: '退出',value: '-1' },
      ...taskList.map((list,index) => {
        return { name: `${list.done ? '[x]' : '[_]'} ${index + 1}-${list.taskName}`,value: index }
      }),
      { name: '+ 创建任务',value: '-2' }
    ]
  }).then(answers => {
      const index = +answers.index
      if (index >= 0) {
        askForAction(taskList,index)
      } else if (index === -2) { // 创建任务
        createTask(taskList)
      }
    }
  )
}

const askForAction = (taskList,index) => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '请选择操作',
    choices: [
      { name: '退出',value: 'quite' },
      { name: '已完成',value: 'markAsDone' },
      { name: '未完成',value: 'markAsUnDone' },
      { name: '删除',value: 'deleteTask' },
      { name: '改标题',value: 'updateTaskName' }
    ]
  }).then(answers2 => {
    const actionsMap = { quite,markAsDone,markAsUnDone,deleteTask,updateTaskName }
    const action = actionsMap[answers2.action]
    action && typeof action === 'function' && action(taskList,index)
  })
}
const createTask = (taskList) => {
  inquirer.prompt({ type: 'input',name: 'taskName',message: '请输入新的任务名字' }).then(answers => {
    taskList.push({ taskName: answers.taskName,done: false })
    db.write(taskList)
  })
}
const quite = () => {}
const markAsDone = (taskList,index) => {
  taskList[index].done = true
  db.write(taskList)
}
const markAsUnDone = (taskList,index) => {
  taskList[index].done = false
  db.write(taskList)
}
const deleteTask = (taskList,index) => {
  taskList.splice(index,1)
  db.write(taskList)
}
const updateTaskName = (taskList,index) => {
  inquirer.prompt({ type: 'input',name: 'taskName',message: '请输入新的任务名字',default: taskList[index].taskName }).then(answers => {
    taskList[index].taskName = answers.taskName
    db.write(taskList)
  })
}
