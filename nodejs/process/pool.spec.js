const { creatProcessPool } = require('./pool')

const doWork = creatProcessPool('./pool.worker.js')
doWork('A', function (error, msg) {
    if (error) {
        console.log(error.message)
        return
    }

    console.log('运算结果是:', msg)
})

doWork('B', function (error, msg) {
    if (error) {
        console.log(error.message)
        return
    }

    console.log('运算结果是:', msg)
})