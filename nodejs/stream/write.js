// 可写流：使用流API底层的I/O输出数据

const { Writable } = require('stream')

class RedOutput extends Writable {
    constructor(options) {
        super(options)
    }

    // 所有的_write方法的作用就是：
    // 将数据被写入底层I/O，并调用提供的回调
    _write(chunk, encoding, callback) {
        const line = chunk.toString().replace(/\n/, '')
        process.stdout.write('\x1B[31m'+ line +'\x1B[0m' + '\n')
        callback()
    }
}

process.stdin.pipe(new RedOutput())