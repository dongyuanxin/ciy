// 基于repl的调试：用于正在运行的服务器，更及时，更轻量

// repl启动交互式解释器后，远程连入无法显示颜色、自动补全、查看历史等功能
// 原因：
//  1. s端无法确认是否是在tty终端运行，所以只提供最小化接口
//  2. c端无法像tty，发送合适的编码来代表补全、查看历史等命令

// 将useGlobal设为true，则可以访问变量

const repl = require('repl')
const net = require('net')

net.createServer(socket => {
    const r = repl.start({
        input: socket,
        output: socket,
        terminal: true, // 1. 将c端看作tty
        useGlobal: true // 指定默认的解释函数使用 JavaScript global 作为上下文，而不是为 REPL 实例创建一个新的独立的上下文
    })
    r.on('exit', () => {
        socket.end()
    })
})
.listen(8888)