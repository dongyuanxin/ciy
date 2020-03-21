// 如何理解async/await
// await就是是Promise的语法糖
// async函数返回的值会默认包裹上Promise.resolve(...)

// 可以参考：https://juejin.im/post/5cbc0a9cf265da03b11f3505

console.log('script start');

async function async1() {
    await async2();
    console.log('async1 end');
}

// aysnc1Mock就和async1一模一样
// 结合front1.js中的微任务，就很好理解输出了
function aysnc1Mock() {
    Promise.resolve(async2()).then(() => {
        console.log('async1 end'); // 被放在第一次eventloop的微任务队列了
    });
}

async function async2() {
    console.log('async2 end');
}
async1();

setTimeout(function() {
    console.log('setTimeout');
}, 0);

new Promise(resolve => {
    console.log('Promise');
    resolve();
})
    .then(function() {
        console.log('promise1');
    })
    .then(function() {
        console.log('promise2');
    });

// process.nextTick(() => {
//     console.log('I am tick');
// });

console.log('script end');

// 输出：
// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout
