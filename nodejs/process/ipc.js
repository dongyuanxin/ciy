// nodejs种4种IPC方式：http://www.ayqy.net/blog/nodejs%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1/

// 1. 普通流pipe

// 2. nodejs的ipc管道
//  拓展思考：在ipc管道建立前，父子进程怎么通信的？如果没有通信, 那 IPC 是怎么建立的? 
//  https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/process.md#%E8%BF%9B%E7%A8%8B%E9%97%B4%E9%80%9A%E4%BF%A1

// 3. sockets通信
//  可见 process-type.js 中的孤儿进程的例子

// 4. mq/redis等三方工具

// 注意：options.stdio 的含义是子进程的输出目的地。
