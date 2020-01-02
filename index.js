const db = require('./db')
module.exports.add = async (taskName) => {
  const taskList = await db.read()
  taskList.push({ taskName,done: false })
  db.write(JSON.stringify(taskList))
}

module.exports.clear = () => {
  db.write([])
}

