// 有关安全性的问题
// 因为execFile不会衍生shell，所以不会用到shell的解析功能
// 这对于拼接用户传来的命令来说很重要

const cp = require('child_process')

cp.execFile('cat', ['pipe-process.txt', '; cat pipe-process.txt'], (err, stdout, stderr) => {
    if (err) throw err
    console.log(stdout)
})