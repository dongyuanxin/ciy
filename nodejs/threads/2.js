const { Worker, isMainThread, parentPort } = require('worker_threads');

// 使用parentPort和worker进行双工通信
if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', (message) => console.log(message));
    worker.postMessage('ping');
} else {
    parentPort.on('message', (message) =>
        parentPort.postMessage({ pong: message }),
    );
}
