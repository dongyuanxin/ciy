const vm = require('vm');
const script = new vm.Script('m = m + n; n = 5; console.log(m);');
const sandbox = {
    m: 1,
    n: 2,
};
script.runInNewContext(sandbox);
console.log(sandbox);

const obj = {};
const sum = new Function('obj', 'obj.a = 1; return obj;');
// const sum = new Function('obj', 'with(obj){ a = 2; return obj;}');
console.log(sum(obj), obj);
