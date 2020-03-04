// http: 基于tcp的无状态应用层协议
// 每次使用后都要释放tcp sockets

// http代理：
//  1. 代理获取请求信息
//  2. 利用请求信息发起请求。请求返回的数据，返回给res
//  3. res传入的数据传给代理

// https代理：
//  会多出一个connect事件（和协议有关）
//  坑：https.createServer() 中没有事件，无法响应connect事件

const http = require('http')
const net = require('net')
const url = require('url')

http.createServer()
.on('request', (req, res) => {
    console.log('start request:', req.url)
    const options = url.parse(req.url)
    
    const proxyReq = http.request(options, (proxyRes) => {
        proxyRes.on('data', (chunk) => {
            res.write(chunk, 'binary')
        })

        proxyRes.on('end', () => {
            res.end()
        })

        res.writeHead(proxyRes.statusCode, proxyRes.headers)
    })
    
    req.on('data', (chunk) => {
        proxyReq.write(chunk, 'binary')
    })

    req.on('end', () => {
        proxyReq.end()
    })
})
.on('connect', (req, socket, head) => {
    console.log('start connect:', req.url)
    const fullUrl = /^http/.test(req.url) ? req.url : `https://${req.url}`
    const options = url.parse(fullUrl)
    // console.log(options['port'], options['host'], options)

    const targetSocket = net.createConnection(options['port'], options['hostname'], () => {
        targetSocket.on('end', () => {
            socket.end()
        })

        socket.write(
            'HTTP/1.1 200 Connection Established\r\n'
                + 'Proxy-agent: MITM-proxy\r\n'
                + '\r\n',
        )

        targetSocket.write(head)
        socket.pipe(targetSocket).pipe(socket)
    })

    socket.on('end', () => {
        targetSocket.end()
    })
})
.on('error', (err) => console.log(err))
.listen(8080)

process.on('uncaughtException', (error) => {
    console.log(error)
})