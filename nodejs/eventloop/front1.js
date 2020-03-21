// 前端eventloop
// 每次eventloop分为宏任务和微任务

console.log(1);
var start = Date.now();

setTimeout(function() {
    console.log(2);
}, 0);

setTimeout(function() {
    console.log(4, Date.now() - start);
}, 400);

// Promise.then就是微任务
Promise.resolve().then(function() {
    var sum = function(a, b) {
        return Number(a) + Number(b);
    };
    var res = [];
    for (var i = 0; i < 5000000; i++) {
        var a = Math.floor(Math.random() * 100);
        var b = Math.floor(Math.random() * 200);
        res.push(sum(a, b));
    }
    res = res.sort();
    console.log(3);
});

// 上边的例子中输出：
// 1
// 3
// 2
// 4 1520

// 首先第一次loop（这是当前的宏任务），然后输出1
// 将setTimeout依次放入宏任务队列
// 直接执行promise
// promise.then 添加微任务到对应的宏任务对应的微任务队列（就是当前的宏任务）
// 执行逻辑，输出3
// 然后再依次按照这种逻辑，执行后面的宏任务
