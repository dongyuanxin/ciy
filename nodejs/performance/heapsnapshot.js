// heapdump用于生成内存快照，定位内存泄漏类问题

const heapdump = require('heapdump')

const string = '1 string to rule them all'
const leakyArr = []
let count = 2

setInterval(function() {
    leakyArr.push(string.replace(/1/g, count++))
}, 5)

setInterval(() => {
    // 捕获内存快照
    heapdump.writeSnapshot(`${Date.now()}.heapsnapshot`, (err, filename) => {
        if (err) {
            console.log('写入失败: ', err.message)
            return
        }
        console.log('写入成功: ', filename)
    })
}, 10000)