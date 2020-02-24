// Buffer编码训练：DataURI编解码

const fs = require('fs')

/**
 * @param {string} path 
 * @param {string} encoding
 * @param {string} mimeType
 * @return {string}
 */
function imgToDataUri(path, encoding, mimeType) {
    encoding = encoding || 'base64'
    mimeType = mimeType || 'image/png'
    const data = fs.readFileSync(path).toString(encoding) // 对buffer进行base64编码
    return `data:${mimeType};${encoding},${data}` // DataURI拼接规则
}

const imgPath = '/Users/yuanxindong/Desktop/学习书籍/nodeinpractice-master/listings/buffers/monkey.png'
console.log(imgToDataUri(imgPath))