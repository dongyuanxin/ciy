// Mixin模式
//  JavaScript是基于原型链，无法多继承
//  mixin模式优于其他模式，因为它可以选择性的包括其他类的方法，并且不一定是父类

function Say() {}

Say.prototype.hi = function() {
    console.log('say hi', this.name)
}

Say.prototype.hello = function() {
    console.log('say hello', this.name)
}

class User {
    constructor(name = '') {
        this.name = name
    }

    bye() {
        console.log('say bye', this.name)
    }
}

/****** 简单的mixins实现 ****/

/**
 * @param {Object} target 
 * @param  {...Object} source 
 */
function mixins(target, ...source) {
    Object.assign(target, ...source)
}

// 测试代码
mixins(User.prototype, Say.prototype)
const user = new User('hello')
user.hi() // say hi hello