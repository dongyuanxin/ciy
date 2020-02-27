// 如何编写流的「单元测试」？
// 以csv转换流为例

const fs = require('fs')
const assert = require('assert')
const path = require('path')
const { CSVParser } = require('./transform')

const csvFilePath = path.resolve(__dirname, 'user.csv')

const rs = fs.createReadStream(csvFilePath)
const parser = new CSVParser()

rs.pipe(parser)
    // .on('data', (data) => {
    //     console.log(data)
    // })

process.on('exit', function() {
    const expected = [
        { name: 'roleAlex', location: 'UK' },
        { name: 'adminSam', location: 'France' }
    ]
    const actual = [
        parser.read(),
        parser.read()
    ]

    assert.deepStrictEqual(actual, expected)
})
