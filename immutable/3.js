const { Seq, List } = require("immutable");
const assert = require("assert");

// 批量操作（Batching Mutations）
// 虽然已经immutable针对deepclone做了优化，但是每次都返回不可变还是会有性能损耗
// 可以使用withMutations，它的回调函数中的参数，是可变副本。
// 但仅支持set、push和pop操作（有背不可变思想）
const list1 = List([1, 2, 3]);
const list2 = list1.withMutations(function(list) {
  list
    .push(4)
    .push(5)
    .push(6);
});
assert.equal(list1.size, 3);
assert.equal(list2.size, 6);

// Seq提供了惰性操作运算，避免创建中间集合
const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
  .filter(x => x % 2 !== 0)
  .map(x => x * x);

// 耗时：7.477ms
console.time("a");
console.log(oddSquares.get(1)); // 这时才会进行计算，之前不会进行计算
console.timeEnd("a");
// 耗时：0.061ms
console.time("b");
console.log(oddSquares.get(2));
console.timeEnd("b");
