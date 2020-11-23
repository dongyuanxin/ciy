const { Worker, isMainThread } = require('worker_threads');
// 在工作原理上，它没有改变nodejs的开发模型
// 它是针对每个线程，开启了一个新的eventloop和node实例
// 而不是在一个eventloop和node例中开启多个线程（这洋会有锁的问题）
// 请看 Understanding Worker Threads in Node.js：https://nodesource.com/blog/worker-threads-nodejs/

// 而对于nodejs的异步事件模型，它更像是纤程的实现，它不是真正的并行。
// 而多线程可以并行（也可能并发），这取决于os的调度：https://blog.csdn.net/qq_33290787/article/details/51790605

// 它的作用是用来解决cpu密集问题。配合pool，进一步降低开销（参考之前我写的进程池模型）
// 参考：https://cnodejs.org/topic/518b679763e9f8a5424406e9

// 关于通信，它参考了浏览器的通信机制。你可以在2.js中找到简单的使用
// 也可以在4。js和5.js中发现更

if (isMainThread) {
    // 这会在工作线程实例中重新加载当前文件。
    new Worker(__filename);
    console.log('在主进程中');
    console.log('isMainThread is', isMainThread);
    // Worker可以启动指定文件，也可以配合eval参数，直接启动代码
    // 由于在子线程中没有process.env，所以这里可以配合workerData选项
    // 那么在子线程中，workerData会按照HTML结构化克隆算法
    // 将workerData克隆到 require('worker_thread')中
} else {
    console.log('在工作线程中');
    console.log('isMainThread is', isMainThread); // 打印 'false'。
}
