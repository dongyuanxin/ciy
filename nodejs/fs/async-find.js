// 递归查找文件
// 异步不阻塞主线程，速度更快
// 异步的处理技巧：使用一个变量asyncOps，标记当前正在进行的异步操作数量
// 每次异步开始前，+1；结束后，-1
// 每次-1后，检查asyncOps是否为0，如果为0，那么所有异步都完成，触发回调函数

const fs = require('fs')
const join = require('path').join

/**
 * 
 * @param {RegExp} nameRe 
 * @param {String} rootPath 
 * @param {Function} callback 
 */
function find(nameRe, rootPath, callback) {
    const results = []
    let asyncOps = 0
    let errored = false

    finder(rootPath)

    /**
     * 只触发一次
     * @param {Error} err 
     */
    function handleError(err) {
        if (errored) return
        errored = true
        callback(err)
    }

    /**
     * @param {String} path 
     */
    function finder(path) {
        ++asyncOps

        fs.readdir(path, (err, files) => {
            if (err) return handleError(err)

            for (const file of files) {
                const fpath = join(path, file)
                
                ++asyncOps
                fs.stat(fpath, (err, stats) => {
                    if (err) return handleError(err)

                    if (stats.isDirectory()) {
                        finder(fpath)
                    } else if (stats.isFile() && nameRe.test(file)) {
                        results.push(fpath)
                    }
                    
                    --asyncOps
                    // 回调设计遵循：错误优先
                    if (!asyncOps) callback(null, results)
                })
            }

            --asyncOps 
            if (!asyncOps) callback(null, results)
        })
    }
}

module.exports.find = find