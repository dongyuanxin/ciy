// 转换流：csv解析器

const { Transform } = require('stream')

class CSVParser extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true
        })

        this.value = ''
        this.values = []
        this.headers = []
        this.line = 0
    }

    // 针对字符的处理非常巧妙
    // 利用的是「状态机」的思想
    _transform(chunk, encoding, callback) {
        if (!Buffer.isBuffer()) {
            chunk = chunk.toString()
        }

        for (let i = 0; i < chunk.length; ++i) {
            const ch = chunk[i]
            if (ch === ',') {
                this.addValue()
            } else if (ch === '\n') {
                if (this.line > 0) {
                    this.push(this.getObject())
                }
                this.values = []
                ++this.line
            } else {
                this.value += ch 
            }
        }

        callback()
    }

    addValue() {
        if (this.line === 0) { // 首行，this.value代表字段
            this.headers.push(this.value)
        } else {
            this.values.push(this.value)
        }
        this.value = '' // 添加value后，清空。方便_transform()中的循环进行拼接
    }

    getObject() {
        const obj = {}
        this.headers.forEach((head, i) => {
            obj[head] = this.values[i]
        })
        return obj
    }
}

module.exports.CSVParser = CSVParser