// 按照协议DBF协议规范，读取 .dbf 二进制文件

const fs = require('fs')

/**
 * @param {any} err 
 * @param {Buffer} buf 
 */
function readDbf(err, buf) {
    if (err) throw err
    // step1: 读取部分头部信息
    const header = {}
    // 读取最后更新日期
    const date = new Date();
    date.setFullYear(1990 + buf[1])
    date.setMonth(buf[2])
    date.setDate(buf[3])
    header.lastUpdated = date.toString()
    // 4 - 7byte, 内容是32bit（要一次性读取）
    header.totalRecords = buf.readUInt32LE(4) // 记录数量
    header.bytesInHeader = buf.readUInt16LE(8) // 头部字节数
    header.bytesPerRecord = buf.readUInt16LE(10) // 记录部分字节数目
    // console.log(header)

    // step2: 获取字段信息
    // 32-n byte，内容是32bit，最后跟着1byte的字段终止符
    let fieldOffset = 32 // 字段位置
    const filedSize = 32 // 字段大小
    const fieldTerminator = 0x0D // 字段终止符
    const FIELD_TYPES = {
        C: 'Character',
        N: 'Numeric'
    }
    const fields = []

    while (buf[fieldOffset] !== fieldTerminator) {
        const fieldBuf = buf.slice(fieldOffset, fieldOffset + filedSize)
        fields.push(
            {
                name: fieldBuf.toString('ascii', 0, 11).replace(/\u0000/g, ''),
                type: FIELD_TYPES[fieldBuf.toString('ascii', 11, 12)],
                length: fieldBuf[16]
            }
        )
        fieldOffset += filedSize
    }
    // console.log(fields)

    // step3: 读取记录
    const records = []
    for (let i = 0; i < header.totalRecords; ++i) {
        let recordOffset = header.bytesInHeader + (i * header.bytesPerRecord)
        const record = {}
        record.isDel = buf[recordOffset] === 0x2A
        recordOffset++
        // 每条记录中的field是按照fields中的字段顺序排列
        for (const field of fields) {
            const Type = field.type === 'Numeric' ? Number : String;
            record[field.name] = Type(
                buf.toString('utf8', recordOffset, recordOffset + field.length).trim()
            );
            recordOffset += field.length;
        }
        
        records.push(record)
    }
    // console.log({ header, fields, records })

    return {
        header, 
        fields,
        records
    }
}

const filePath = '/Users/yuanxindong/Desktop/学习书籍/nodeinpractice-master/listings/buffers/world.dbf'
fs.readFile(filePath, readDbf)