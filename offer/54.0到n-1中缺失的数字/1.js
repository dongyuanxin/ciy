// 方法1: 观察二分查找

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (mid === nums[mid]) {
            left = mid + 1
        } else if (mid < nums[mid]) {
            right = mid - 1
        }
        // 不会出现mid > nums[mid] 根据题目要求
    }

    return left
};