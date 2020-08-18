exports.count = 0; // 输出值的拷贝

exports.foo = {
    count: 0,
};

setTimeout(() => {
    exports.foo.count += 1;
    console.log('a.js: changed exports.foo.count');
});

exports.add = () => {
    //这里改变count值，并不会将module.exports对象的count属性值改变
    exports.count++;
};
