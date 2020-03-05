const net = require('net')

const socket = net.createConnection({
    port: 8888,
    host: 'localhost'
})

process.stdin.setRawMode(true) // 2. 回到原始模式，终端对字符的所有特殊处理都被禁用
process.stdin.pipe(socket)
socket.pipe(process.stdout)

socket.once('close', () => {
    process.stdin.destroy() // 销毁流，退出进程
})