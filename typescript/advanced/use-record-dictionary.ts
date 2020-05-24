interface Person {
    prop1: string;
    prop2: string;
    prop3: string;
}

type someProps = Record<12 | keyof Person, string>;

/////

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

const data2: Dictionary<number> = {
    a: 3,
    b: 4,
};

// https://www.tslang.cn/docs/handbook/interfaces.html
// 这种写法既可以规定dic的类型
// 而且避免在初始化的时候给key值
let dic = <someProps>{};
