// 自定义通信协议
// Byte     内容        描述
// 0        1byte
// 1        8 unsigned bit
// 2-n      n-2 bytes

const zlib = require('zlib')

/******* 服务端程序（数据库侧） *******/
// 数据库存储逻辑
//  1. 按照协议解码数据
//  2. 将数据存放在对应子数据库的对应键处
// 注意：也可以直接存二进制(看需求)

const database = [[], [], [], [], [], [], [], []] // 子数据库
const bitmasks = [1, 2, 4, 8, 16, 32, 64, 128] // 子数据库的坐标对应的掩码

/**
 * @param {Buffer} buf 
 * @param {Function} callback
 */
function store(buf, callback) {
    const db = buf[0]
    const key = buf.readUInt8(1)

    let i = 0
    for (; i < 8; ++i) {
        // 使用掩码来验证数据库下标的正确性，防止出现20（里面有2个1）
        if ((db & bitmasks[i]) === bitmasks[i]) { 
            break
        }
    }
    if (i >= 8) {
        callback(new Error('数据库索引出错'))
        return
    }

    if (buf[2] === 0x78) { // zlib压缩的数据开头通常是0x78
        zlib.inflate(buf.slice(2), (err, result) => {
            if (err) {
                callback(err)
                return
            }
            database[i][key] = result.toString('utf8')
            callback()
        })
    }
}

/******* 客户端程序（业务侧） *******/
// 业务逻辑：
//  1. 按照协议生成数据
//  2. 压缩数据提高传输速度
//  3. 传给数据库

// 构造要存储的数据
const buf = Buffer.alloc(2)
buf[0] = 8 // 00001000 存放在第4个子数据库
buf[1] = 9 // 存放子数据库的10号键

const data = 'Hello World!' // 要存储的对象
zlib.deflate(data, (err, result) => {
    const fullData = Buffer.concat([buf, result], buf.byteLength + result.byteLength)
    store(fullData, (_) => {
        if (_) throw _
        console.log('存放成功')
        console.log(database) // output: [ [], [], [], [ 'Hello World!' ], [], [], [], [] ]
    })
})