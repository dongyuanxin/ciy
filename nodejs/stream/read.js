// 可读流：使用流API「包装」来自底层的I/O源

const { Readable } = require('stream')
const fs = require('fs')

// 「按行」读取大型json，并且进行包装
class JsonLineReader extends Readable {
    constructor(source, options = {}) {
        super({
            ...options,
            objectMode: true // 流实例 => 对象模式。因此，this.push 可以传入object
        })
        this._source = source
        this._data = ''

        this._source.on('data', (chunk) => {
            chunk && this.handleLine(chunk);
        })

        this._source.on('end', () => {
            // 如果目标文件最后一行不是空行，那么最后一行的结束符不是\n，要特殊处理
            if (this._data.length) {
                this.push(JSON.parse(this._data))
                this._data = ''
            }
            this.push(null)
        })
    }

    handleLine(chunk) {
        this._data += chunk.toString()
        let lineIndex;
        while ((lineIndex = this._data.indexOf('\n')) !== -1) {
            const line = this._data.slice(0, lineIndex)
            if (!line.length) {
                this._data = this._data.slice(1)
                continue
            }

            const json = JSON.parse(line)
            if (!this.push(json)) {
                break
            }
            this._data = this._data.slice(lineIndex)
        }
    }

    _read() {
        // empty
        // 构造函数中已切换到流动模式，不需要「显式调用」数据读取开始的相关API
    }
}

const rs = fs.createReadStream('./json.txt')
const reader = new JsonLineReader(rs)
reader.on('data', json => {
    console.log(json)
})
reader.on('end', () => {
    console.log('<<< finish read')
})