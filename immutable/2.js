// immutable可以和js的Array、Object进行转换。
// 它们被视为Collection

const { Map, List, fromJS } = require("immutable");

const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
const map2 = Map({ c: 10, a: 20, t: 30 });
const obj = { d: 100, o: 200, g: 300 };
const map3 = map1.merge(map2, obj);
console.log(map3.toJSON()); // 转换为 json
// output: { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }

const list1 = List([1, 2, 3]);
const list2 = List([4, 5, 6]);
const array = [7, 8, 9];
const list3 = list1.concat(list2, array);
console.log(list3.toArray()); // toArray、toObject都是将其转换为js原生对象（非递归）

// 对于嵌套对象，它们提供mergeDeep, getIn, setIn, and updateIn，
// 来操作嵌套对象
const nested = fromJS({ a: { b: { c: [3, 4, 5] } } });
console.log(nested.getIn(["a", "b", "c"]).toArray()); // output：[ 3, 4, 5 ]

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } }); // merge 会覆盖合并，mergeDeep不会直接覆盖（推荐）
console.log(nested2.toJS());

const nested3 = nested.updateIn(["a", "b", "c"], list => list.push(4));
console.log(nested3.toJS()["a"]); // toJS将其嵌套对象递归转换
