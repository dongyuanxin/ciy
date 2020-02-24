// 使用计算机的“计算机时钟”来计算微秒
// 1s = 1,000,000 us
// 1ms = 1000 us
const microtime = require('microtime')

console.log(microtime.now())
console.log(microtime.nowDouble())
console.log(microtime.nowStruct())
console.log(Date.now())