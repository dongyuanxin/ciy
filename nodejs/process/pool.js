// 手动实现一个可用的进程池（线程池差不多）
// 目的：worker-master可以利用多核cpu，但是每次启动一个worker太浪费时间，所以准备Pool
// 整体流程：
//  master创建Pool
//  master下发任务
//  Pool进行调度（重点）
//  worker接收到pool传来的任务，执行
//  原调用线路返回

const cp = require('child_process')
const cpuNum = require('os').cpus().length

/**
 * 声明一个针对指定worker的进程池
 * @param {string} workModule 
 * @return {function}
 */
function creatProcessPool (workModule) {
    const waitingQueue = [] // 任务等待队列
    const readyPool = [] // 可用的worker存放的池子
    let poolSize = 0 // 池的大小 = 可用的worker + 正在使用中worker

    /**
     * 将信号发送给池中可用的worker
     * @param {string} job 任务信号
     * @param {function} callback
     */
    return function doWork(job, callback) {
        callback = callback || (() => {})

        // 如果池中没有可用worker，且池的大小已经到上限
        if (!readyPool.length && poolSize > cpuNum) {
            waitingQueue.push([job, callback])
            return 
        }

        let child = null
        if (readyPool.length) { // 池中有可用worker
            child = readyPool.shift()
        } else { // 池中没有可用worker，并且当前worker还可以申请
            child = cp.fork(workModule)
            ++poolSize
        }
        
        let cbTriggered = false // 防止回调函数重复调用

        child.once('error', err => {
            if (!cbTriggered) {
                callback(err)
                cbTriggered = true
            }
            child.kill()
        })
        .once('exit', (code) => {
            if (!cbTriggered) {
                callback(new Error('Worker exited with code:' + code))
            }
            --poolSize
            const childIdx = readyPool.indexOf(child)
            readyPool.splice(childIdx)
        })
        .once('message', msg => {
            // 当worker完成cpu计算后
            // 发送消息给master，重新回收worker
            callback(null, msg)
            cbTriggered = true
            readyPool.push(child) 

            // 如果等待队列中还有未完成任务，则执行
            if (waitingQueue.length) {
                // 防止阻塞主线程
                setImmediate(() => {
                    doWork(...waitingQueue.shift())
                })
            }
        })
        .send(job) // 向worker发送指令
    }
}

module.exports.creatProcessPool = creatProcessPool