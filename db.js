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
        if (err) return reject(err)
        let taskList
        try {
          taskList = JSON.parse(data.toString())
        } catch (e) {
          taskList = []
        }
        resolve(taskList)
        // 写新的任务到文件

      })
    })
  },
  write(taskLIst,path = dnPath) {
    return new Promise((resolve,reject) => {
      fs.writeFile(dnPath,JSON.stringify(taskLIst),(err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}

module.exports = db
