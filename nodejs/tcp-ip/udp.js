// udp: 面向数据包。数据包大小不能过大（64kb），否则会被丢弃。它的值依赖于网络的MTU
// 由于不像tcp那样面向连接，所以它的s端，直接listen一个接口，而不是针对特定的socket
// 它的c端直接向地址send数据，而不是在创建连接的回调中write
// 这就是原理不同导致的udp和tcp在编程上的差别

const dgram = require('dgram')
const readline = require('readline')

function Client(address, port) {
    const socket = dgram.createSocket('udp4')
        .on('message', (msg, rinfo) => {
            console.log(`\n<${rinfo.address}> ${msg.toString()}`)
            rl.prompt()
        })

    const rl = readline.createInterface(process.stdin, process.stdout)
        .on('line', sendData) // 检测到新行输入的时候，不输出到控制台，而是发送给服务端
        .on('close', () => {
            socket.close()
            process.exit()
        })
    rl.setPrompt('>>> ')

    socket.send(Buffer.from('<JOIN>'), port, address)
    rl.prompt()

    function sendData(msg) {
        socket.send(Buffer.from(msg), port, address, (err, bytes) => {
            rl.prompt()
        })
    }
}

function Server(port) {
    const clients = []
    const socket = dgram.createSocket('udp4')

    socket.on('message', (msg, rinfo) => {
        const clientId = `${rinfo.address}:${rinfo.port}`
        msg = msg.toString()
        
        // 这信息会保留，之后给c发消息会用到
        // 这是因为c发送消息给s时，c本身会打开一个端口发过来，
        // 而这个端口，在没有被close之前，可以用来接受任何发到c的消息
        // 即使c调close关闭了，s的send也不会报错。因为：udp只管发，不确保接收
        if (!clients[clientId]) {
            clients[clientId] = rinfo
        }

        if (/^</.test(msg)) {
            console.log('Control msg:', msg)
            return
        }

        for (let id in clients) {
            if (id === clientId) {
                continue
            }

            const client = clients[id]
            socket.send(
                Buffer.from(msg), client.port, client.address, (err, bytes) => {
                    if (err) console.error(err)
                    console.log('Bytes send:', bytes)
                }
            )
        }
    })

    socket.bind(port, () => {
        console.log('listen port:', port)
    })
}

if (!module.parent) {
    switch (process.argv[2]) {
        case 'client':
            new Client(process.argv[3], process.argv[4])
            break
        case 'server':
            new Server(process.argv[3])
            break
        default:
            console.warn('Unkonw option')
    }
}