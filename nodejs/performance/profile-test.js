// 自带的profile工具用于分析性能运行瓶颈

function makeLoad() {
    for (let i = 0; i < 1e10; i++){}
}

function logSomething() {
    console.log('something')
}

setInterval(makeLoad, 2000)
setInterval(logSomething, 0)