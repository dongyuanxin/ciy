// 方法1: 两边搜索边界

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (!nums.length) return 0

    let left = 0, right = nums.length - 1
    while (nums[left] !== target && left < nums.length) {
        ++left
    }
    while (nums[right] !== target && right >= 0) {
        --right
    }

    return left <= right ? right - left + 1 : 0
};