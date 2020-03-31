// ac地址：https://leetcode-cn.com/problems/sliding-window-maximum/
// 暴力法： O(kN)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    const res = [];
    for (let i = 0; i < nums.length - k + 1; ++i) {
        res.push(Math.max(...nums.slice(i, i + k)));
    }
    return res;
};
