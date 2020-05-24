class Greeter3 {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @parseFunc
    greet(@required name: string) {
        return 'Hello ' + name + ', ' + this.greeting;
    }
}

function parseFunc(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) {
    console.log('hello', descriptor.value);
}

function required(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
) {
    console.log(target);
    console.log(propertyKey);
    console.log(parameterIndex);
}
