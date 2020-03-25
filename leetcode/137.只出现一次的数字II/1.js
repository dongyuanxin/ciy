// ac地址：https://leetcode-cn.com/problems/single-number-ii
//
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    const map = new Map();
    for (let num of nums) {
        if (map.has(num)) map.set(num, map.get(num) + 1);
        else map.set(num, 1);
    }

    for (let [num, times] of map.entries()) {
        if (times === 1) return num;
    }
};
