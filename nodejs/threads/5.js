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
    const subChannel = new MessageChannel();
    // 共享内存
    const sharedArray = new SharedArrayBuffer(4);
    const uint8Arr = new Uint8Array(sharedArray);

    worker.postMessage({ hereIsYourPort: subChannel.port1, uint8Arr }, [
        subChannel.port1,
    ]);

    subChannel.port2.on('message', value => {
        subChannel.port1.postMessage('helo');
        console.log('接收到:', value);
        console.log(uint8Arr);
    });
} else {
    parentPort.once('message', value => {
        assert(value.hereIsYourPort instanceof MessagePort);
        value.uint8Arr[1] = 10;
        console.log(value.uint8Arr);
        value.hereIsYourPort.postMessage('工作线程正在发送此消息');
        value.hereIsYourPort.close();
    });
}

// output：
// Uint8Array [ 0, 10, 0, 0 ]
// 接收到: 工作线程正在发送此消息
// Uint8Array [ 0, 10, 0, 0 ]
