var fs = require('fs');
var starttime = Date.now();
var endtime = 0;

fs.readFile(__filename, () => {
    endtime = Date.now();
    console.log('finish reading time:', endtime - starttime);
});

var index = 0;

// 这里好像是统一放在了check阶段之后
// 而不是poll阶段后面
Promise.resolve().then(() => console.log('mico'));

function nextImme() {
    if (index >= 10) {
        console.log('nextTick', index);
        return;
    }
    index++;
    console.log(index);
    // Promise.resolve().then(() => console.log('mico'));
    // 这里的micro任务就是放在了check阶段后面的micro队列中
    setImmediate(nextImme);
}

nextImme();

// 输出
//  先输出 1，在输出 mico
