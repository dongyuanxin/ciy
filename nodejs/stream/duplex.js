// 带有交互提示的双工流

const { Duplex } = require('stream')

class PromptStream extends Duplex {
    constructor(options) {
        super(options)
        this.push('>>> ')
    }

    _write(chunk, encoding, callback) {
        this.push('<<< ' + chunk.toString() + '>>> ')
        callback()
    }

    _read() {}
}

// readable.pipe(stream) => writable 若stream是Duplex或者transform，会自动形成管道链
// 此时是从readable触发data事件，将data写入stream。
// 如果stream是双工/transofrm，调用push，将处理的数据写入缓冲，等待后面的链进行调用
process.stdin.pipe(new PromptStream()).pipe(process.stdout)

// 书上的demo，很难理解
// 因为双工流的特点是：可读和可写端放入一起维护
// 这样它既可以读入，也可以向目标写入，用起来更方便

// class PromptStream extends Duplex {
//     constructor(options) {
//         super(options)
//         this.isWaiting = false
//     }

//     _write(chunk, encoding, callback) {
//         this.isWaiting = false
//         this.push('<<< ' + chunk.toString())
//         callback()
//     }

//     _read() {
//         if (this.isWaiting) {
//             return
//         }
//         this.push('>>> ')
//         this.isWaiting = true
//     }
// }