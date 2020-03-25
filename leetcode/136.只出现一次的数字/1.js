// ac地址：https://leetcode-cn.com/problems/single-number/
// 原文地址：https://xxoo521.com/

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0;
    for (let num of nums) {
        res = res ^ num;
    }
    return res;
};
