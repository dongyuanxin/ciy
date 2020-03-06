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

// 守护进程： 在「后台运行」不受「终端控制」的进程（如输入、输出等）：https://www.zhihu.com/question/38609004/answer/77190522
// 实现参考：https://juejin.im/post/5d082214f265da1bb564f97b
function createDaemon() {
    const daemon = spawn('node', ['daemon.js'], {
        cwd: '/usr', // 更改目录
        detached : true, // 使其成为进程组的头
        stdio: 'ignore', // 中断父子进程之间的IO
    });

    console.log('守护进程开启 父进程 pid: %s, 守护进程 pid: %s', process.pid, daemon.pid);
    daemon.unref(); // 去除父进程中对子进程的引用
}

// zombie()
// orphan()