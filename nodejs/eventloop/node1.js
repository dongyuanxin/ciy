// 参考：
// 1. nodejs官方文档 https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
// 2. 深入理解nodejs机制（配图）：http://lynnelv.github.io/js-event-loop-nodejs

// 在nodejs中，事件循环是分为不同阶段的
// 每个阶段有对应的队列
// 而microtask队列会在各个阶段之间执行

// 对比 process.nextTick()
// 它就是微任务
// 并且具有特殊性，将微任务插入到和下一阶段之间的micro队列
// 所以你可以无限自调用它来吃空资源

function nextTickUnStop() {
    process.nextTick(nextTickUnStop);
}

// 推荐使用setImmediate，它会在check阶段被执行

// 常用的3个阶段：timers、poll(轮询)、check
// poll比较难理解，它的职责是检索IO，并执行回调
// 1、它会先执行poll队列，直到为空或者到内置上限
// 2、检查是否有setImmediate或者定时器没执行，若有，则进入下面阶段
//    否则，阻塞在这

var fs = require('fs');
var index = 0;
function nextTick() {
    if (index >= 100000) {
        console.log('nextTick', index);
        return;
    }
    index++;
    process.nextTick(nextTick);
}

fs.readFile(__dirname, () => {
    console.log('finish reading file');
});

setImmediate(() => {
    console.log('finish');
});

nextTick();

// 输出：
// nextTick 1000
// finish
// finish reading file

// 解释：
// 1. timers无定时器回调，进入poll
// 2. 里面有IO，但是没触发回调，因为后面有setImmediate，所以向check阶段进入
// 3. 但nextTick横插一脚，输出nextTick
// 4. 正式进入check阶段，输出finish
// 5. 再进入下次loop，在poll这里等待
