console.log(require.main);

const { count, add } = require('./a.js');
const { foo } = require('./a.js');
//在支持es6模块的环境下等同于
// import { count, add } from './a.js';

console.log(count); //0
add();
console.log(count); //0

console.log('foo', foo);
setTimeout(() => {
    console.log('after 2s foo', foo);
}, 2000);
