const fs = require('fs')
const { EventEmitter } = require('events')

// 设计上：
// load和close使用events更好，这样具体操作可以放在某个函数作用域中
// get/del/set 使用async/await更好

/**
 * 文件数据库
 */
class Database extends EventEmitter {
    constructor(path) {
        super()
        this.path = path    
        this.records = {}
        this.ws = fs.createWriteStream(this.path, {
            encoding: 'utf8',
            flags: 'a'
        })
        .on('close', () => this.emit('close'))
        
        this.load() // 加载之前的数据库
    }

    /**
     * 按行记录，同样的key，后面的行是最新的数据，所以在读取的时候，采用了覆盖操作
     */
    load() {
        const self = this
        const stream = fs.createReadStream(this.path, {
            encoding: 'utf8'
        })
        let data = ''

        stream.on('data', (chunk) => {
            data += chunk.toString('utf8')
            const records = data.split('\n')
            data = records.pop() // 最后读入的非正行留给下次一起拼接使用

            for (const record of records) {
                try {
                    const obj = JSON.parse(record)
                    if (obj.value === null) {
                        delete self.records[obj.key]
                    } else {
                        self.records[obj.key] = obj.value // 覆盖操作
                    }
                } catch (error) {
                    self.emit('error', error)
                }
            }
        })

        stream.on('close', () => {
            self.emit('load')
        })
    }

    /**
     * 设置值：更新内存+写入到文件中
     */
    set(key, value, cb) {
        const line = JSON.stringify({
            key,
            value
        }) + '\n'

        if (value === null) {
            delete this.records[key]
        } else {
            this.records[key] = value
        }

        this.ws.write(line, cb)
    }

    get(key) {
        return this.records[key] || null
    }

    del(key, cb) {
        this.set(key, null, cb)
    }

    close() {
        this.ws.close()
    }
}

module.exports.Database = Database
