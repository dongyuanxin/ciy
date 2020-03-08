// 方法1: 使用符号标记是否出现过
// O(1)空间，时间复杂度小于O(N^2)，但是原数组改变了

// ac地址：https://leetcode-cn.com/problems/find-the-duplicate-number/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    const length = nums.length

    for (let i = 0; i < length; ++i) {
        const val = Math.abs(nums[i])
        if (nums[val] < 0) {
            return val
        } else {
            nums[val] *= (-1)
        }
    }
};