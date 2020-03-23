// 原理、应用：https://zhuanlan.zhihu.com/p/20295971
// 文档：https://immutable-js.github.io/immutable-js/

const { Map, List } = require("immutable");
const assert = require("assert");

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set("b", 3);
console.log(map1.get("b"), map2.get("b"));

// 应该使用 equals或者is来确定想等性，而不是 ===
// 因为库将所有对象看作collection，决定collection性质的是它的values，而不是references
const map3 = Map({ a: 1, b: 2, c: 3 });
const map4 = Map({ a: 1, b: 2, c: 3 });
console.log(map3.equals(map4)); // true
console.log(map3 === map4); // false

const originalMap = Map({ a: 1, b: 2, c: 3 });
const updatedMap = originalMap.set("b", 2);
// output: true
// 如果值没改变，那么会规避创建新对象。所以比较引用后，是相等的
console.log("originalMap === updatedMap: ", originalMap === updatedMap);

// 支持es6的array、set、map

const list1 = List([1, 2]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);
assert.equal(list1.size, 2);
assert.equal(list2.size, 5);
assert.equal(list3.size, 6);
assert.equal(list4.size, 13);
assert.equal(list4.get(0), 1);
