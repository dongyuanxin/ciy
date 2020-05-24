class Person {
    // @validate('string')
    // static name1 = 123;
    @validate('string')
    static age2 = 2;
    age;

    constructor(age) {
        this.age = age;
    }
}

// function validator(constructor) {
//   return class extends constructor {
//     constructor(...args) {
//       super(...args)

//       // 遍历所有的校验信息进行验证
//       for (let [key, type] of Object.entries(validateConf)) {
//         if (typeof this[key] !== type) throw new Error(`${key} must be ${type}`)
//       }
//     }
//   }
// }

function validate(type) {
    return function (target, name) {
        // 向全局对象中传入要校验的属性名及类型
        console.log(target[name]);
        let descriptor = Object.getOwnPropertyDescriptor(target, name);
        console.log(descriptor.value);
    };
}

// new Person('Niko'); // throw new error: [age must be number]
