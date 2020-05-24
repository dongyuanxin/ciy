function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T,
) {
    console.log('constructor.prototype is', constructor.prototype);
    console.log('constructor is', constructor);
    return class extends constructor {
        newProperty = 'new property';
        hello = 'override';
    };
}

@classDecorator
class Greeter {
    property = 'property';
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }

    static hello2() {}
    static name1: string = '123';

    hello1() {
        console.log('hello ');
    }
}

console.log(new Greeter('world'));
