const { find } = require('./async-find')
const path = require('path')

const rootPath = path.join(
    __dirname,
    '..',
    '..',
    'algorithm'
)

find(/better/, rootPath, (err, results) => {
    if (err) throw err
    console.log(results)
})