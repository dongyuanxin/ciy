const a: string = 'abc';

const b: typeof a = 'abcd';

class DemoClass {}
const democlass = new DemoClass();

// 可以看到，typeof的对象是某个值，返回是这个值的type

interface Context {
    demo: typeof democlass;
    demo2: DemoClass;
}

const ctx: Context = {
    demo: new DemoClass(),
    demo2: new DemoClass(),
};
