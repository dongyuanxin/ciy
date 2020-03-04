// tcp：面向连接，使用net模块
// 它是全双工，两端都可以发送数据
// node可以在同一个进程中同时运行c/s端

// Nagle算法：https://baike.baidu.com/item/Nagle%E7%AE%97%E6%B3%95
// 理解Sockets（图解）：https://www.cnblogs.com/dolphinx/p/3460545.html
const net = require('net')
const assert = require('assert')

let clients = 0

const server = net.createServer()

server.on('connection', (socket) => {
    socket.setNoDelay(true) // 禁用Nagle算法
    const clientId = ++clients
    console.log('客户端连入，它的id为：' + clientId)

    socket.on('data', (data) => {
        console.log('来自客户端的消息：', data.toString())
        socket.write('Your id is ' + clientId)
    })

    socket.on('end', function () {
        console.log('连接断开，它的id为：' + clientId)
    })
})

// 连接成功后，开启测试
server.listen(8000, () => {
    runTest(1, () => {
        server.close()
    })
})

// net客户端测试服务端回复的消息
function runTest(expectedId, done) {
    const socket = net.createConnection(8000, 'localhost')
    // 先发送给s
    socket.write('测试消息')
    // 然后s接受后，会回复msg给c
    socket.on('data', (data) => {
        const expected = `Your id is ${expectedId}`
        const actual = data.toString()
        assert.strictEqual(actual, expected)
        socket.end()
    })

    socket.on('end', () => {
        typeof done === 'function' && done()
    })
}