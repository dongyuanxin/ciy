// 数学技巧 + 集合
// 假设对于a、b、c、d来说，d 出现了1次，其他数字出现3次
// 那么 2 * d = 3*(a + b + c + d) - (3a + 3b + 3c + d)

// ac地址：https://leetcode-cn.com/problems/single-number-ii
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    const set = new Set(nums);
    let sum1 = 0;
    for (let num of set.values()) {
        sum1 += num;
    }
    let sum2 = 0;
    for (let num of nums) {
        sum2 += num;
    }

    return Math.floor((3 * sum1 - sum2) / 2);
};
