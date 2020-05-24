// 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象 (构造函数的prototype) 。
// 2. 成员的名字。
// 3. 成员的属性描述符。
function enumerable(value: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        console.log('='.repeat(10));
        console.log(target, target.prototype);
        console.log(propertyKey);
        console.log(descriptor);
        descriptor.enumerable = value;
    };
}

// 类的方法都被挂在了构造函数的prototype上
// 类的静态方法被挂在了构造函数上面
class Greeter2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return 'Hello, ' + this.greeting;
    }

    @enumerable(false)
    static say() {}
}
