#!/usr/bin/env node

// 打造自己的cli工具: https://zhuanlan.zhihu.com/p/84397064
// 1. 文件开头添加 #!: 告诉编译器用什么命令执行文件
// 2. 添加x权限：chmod +x ip-sh.js
// 3. 查看$PATH，用户自定义目录放入/usr/local/bin/中：ln ip-sh.js /usr/local/bin/ipv4
// 4. 输入ipv4即可

const os = require('os')
const options = process.argv.slice(2)
if (options[0] === '-v') {
    console.log('v1.0.0')
} else {
    // ipv4地址
    console.log(os.networkInterfaces().en0[1].address) 
}