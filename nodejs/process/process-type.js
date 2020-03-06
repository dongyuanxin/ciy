// 参考链接：https://www.cnblogs.com/Anker/p/3271773.html
//  1. 定义
//  2. 孤儿进程无危害
//  3. 僵尸进程的危害和处理过程

const cp = require('child_process')
const http = require('http')
const net = require('net')

// 创建僵尸进程：一个进程使用fork创建子进程，如果子进程退出，而父进程并没有调用wait或waitpid获取子进程的状态信息，那么子进程的进程描述符仍然保存在系统中。这种进程称之为僵死进程。
function zombie() {
    if (process.send) { // 如果在子进程
        process.exit()
    }

    cp.fork(__filename)
        .on('exit', () => {
            console.log('exit')
        })

    while(1) {} // 主进程永久阻塞
}

// 孤儿进程：主进程先退出，ppid变为1
function orphan() {
    if (!process.send) { // 主进程中
        const server = net.createServer()
        server.listen(8888)

        const worker = cp.fork(__filename)
        worker.send('server', server) // 把net.Server/net.Socket传递给子进程
        console.log('worker process created, pid: %s ppid: %s', worker.pid, process.pid)

        process.exit()
    } else {
        const server = http.createServer((req, res) => {
            res.end('I am worker, pid: ' + process.pid + ', ppid: ' + process.ppid); // 记录当前工作进程 pid 及父进程 ppid
        })

        let worker
        process.on('message', (msg, sendHandle) => {
            if (msg === 'server') {
                worker = sendHandle
                worker.on('connection', socket => {
                    server.emit('connection', socket)
                })
            }
        })
    }
}

// 守护进程
function daemon() {

}

// zombie()
// orphan()