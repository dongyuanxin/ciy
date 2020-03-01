// 管理大型项目中的事件机制，为了防止随意添加事件导致错乱
// 使用一个白名单，每次操作前进行检查
// script: npx babel manage-event.js --out-dir lib && node lib/manage-event.js
// 参考：
//      1. ts中使用：https://tasaid.com/blog/20171011233014.html
//      2. es5原理：https://aotu.io/notes/2016/10/24/decorator/index.html
//      3. 为什么不能用于函数？因为存在函数提升。https://es6.ruanyifeng.com/#docs/decorator#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A3%85%E9%A5%B0%E5%99%A8%E4%B8%8D%E8%83%BD%E7%94%A8%E4%BA%8E%E5%87%BD%E6%95%B0%EF%BC%9F

const { EventEmitter } = require('events')

// 相关操作前进行检查
function check(target, name, descriptor) {
    const method = descriptor.value

    descriptor.value = function (event, ...args) {
        if (!(event in this._eventList)) {
            throw new Error(`事件名 ${event} 不合法`)
        }
        method.call(this, event, ...args)
    }

    return descriptor
}

class SafeEventEmitter extends EventEmitter {
    constructor(eventList, ...params) {
        super(...params)
        this._eventList = eventList
    }

    @check
    on(event, listener) {
        return super.on(event, listener)
    }

    @check
    emit(event, ...args) {
        return super.emit(event, ...args)
    }
}

///////////////

// 事件名白名单
const eventList = {
    play: 'play',
    pause: 'pause'
}

const player = new SafeEventEmitter(eventList)

try {
    player.on('play', () => {
        console.log('play music')
    })

    player.on('kashfuahsodi', () => {
        console.log('play music')
    })
} catch (error) {
    console.log(error.message)
}