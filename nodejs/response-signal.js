// 响应进程信号量
// 大多数操作系统通过信号量将消息发送给一个程序
// process.kill(pid, [signal]) 如果哟signal，那么不是杀死进程，而是向进程传递信号量

process.stdin.resume() // 必须加，要不然程序会退出，因为没监听data时间，所以是可读流的暂停模式
process.on('SIGHUP', function () {
    console.log('重新加载配置')
})

console.log(`本进程的id是: ${process.pid}`) // 进程id，方便外界 kill