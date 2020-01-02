const path = require('path')
const fs = require('fs')
const homedir = process.env.HOME || require('os').homedir()
const dnPath = path.join(homedir,'.todo')
const db = {
  read(path = dnPath) {
    // 读之前文件
    return new Promise((resolve,reject) => {
      fs.readFile(path,{ flag: 'a+' },(err,data) => {
        // 添加一个任务
        if (err) {
          reject(err)
        } else {
          let taskList
          try {
            taskList = JSON.parse(data.toString())
          } catch (e) {
            taskList = []
          }
          resolve(taskList)
          // 写新的任务到文件
        }
      })
    })
  },
  write(stringfyTaskList) {
    fs.writeFile(dnPath,stringfyTaskList,(err) => {
    })
  }
}

module.exports = db
