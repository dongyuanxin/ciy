const assert = require('assert');
const {
    Worker,
    MessageChannel,
    MessagePort,
    isMainThread,
    parentPort,
} = require('worker_threads');
if (isMainThread) {
    const worker = new Worker(__filename);
    // 通信管道，可以进行更灵活的数据传递
    // 不局限于父子线程，直接跨任何线程
    const subChannel = new MessageChannel();
    const uint8Array = new Uint8Array([1, 2, 3, 4]);

    worker.postMessage(
        { hereIsYourPort: subChannel.port1, uint8Arr: uint8Array },
        [subChannel.port1, uint8Array.buffer],
    );
    // transList中的对象在发送端是不可用的
    // 如果想共享内存，那么需要sharedArray，并且不能放入transList（保证可用）
    // 参考5.js https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer

    subChannel.port2.on('message', (value) => {
        subChannel.port1.postMessage('helo');
        console.log('[master] 接收到:', value);
        console.log('[master]', uint8Array);
    });
} else {
    parentPort.once('message', (value) => {
        assert(value.hereIsYourPort instanceof MessagePort);
        value.uint8Arr[1] = 10;
        console.log(value.uint8Arr);
        value.hereIsYourPort.postMessage('工作线程的消息');
        value.hereIsYourPort.close();
    });
}
