// 效果是访问的时候，浏览器显示「绿锁」
// 完整生成方法请见：./cert/run.sh

const https = require('https')
const fs = require('fs')

const options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
}

https.createServer(options, (req, res) => {
    res.write('hello world!')
    res.end('\r\n')
})
.listen(8080, () => {
    console.log('Listen on 8080')
})