// 加深对poll阶段行为的理解

const fs = require('fs');

const rs = fs.createReadStream(
    '/Users/yuanxindong/Desktop/articles/xxoo521/db.json',
);

let offset = 0;
rs.on('data', chunk => {
    console.log('chunk is', offset++);
});

setTimeout(() => {
    console.log('time out');
}, 10);

// 输出：
// chunk is (k次)
// time out
// chunk is (p次)

// 原因：
//  poll阶段io事件触发，当检测到定时器到点时
//  完成当前的回调任务，不再执行poll中剩下的任务
//  进入下次loop的timers，处理定时器回调
//  再进入poll阶段回调任务
