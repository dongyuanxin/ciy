// keyof 与 Object.keys 略有相似，只不过是针对 interface 的键。

interface Point {
    a: number;
    hello: string;
}

// type keys = "a" | "hello"
type keys = keyof Point;

/////////

const data: Point = {
    a: 3,
    hello: 'world',
};

// 无法获取返回类型
function get1(o: object, name: string) {
    return o[name];
}

// 范形约束：https://www.tslang.cn/docs/handbook/generics.html
// fanxing利用的就是类型变量，它在函数或者类内是生效的
// 可以调用时候指明，也可以不指明。有ts进行类型推导
// 利用范型，可以获取返回类型，不需要指定
function get2<T extends object, K extends keyof T>(o: T, name: K): T[K] {
    return o[name];
}

get2(data, 'a');

interface User {
    id: number;
    age: number;
    name: string;
}

// 注意看，这两个是有区别的。Omit实现：利用Exclude取出需要的key，利用Pick需要key和对应的value
type a = Exclude<keyof User, 'id'>;
type OmitUser = Omit<User, 'id'>;
