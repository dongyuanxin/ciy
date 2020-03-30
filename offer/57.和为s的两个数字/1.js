// ac地址：https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let left = 0,
        right = nums.length - 1;
    while (left < right) {
        if (nums[left] + nums[right] > target) {
            --right;
        } else if (nums[left] + nums[right] < target) {
            ++left;
        } else {
            return [nums[left], nums[right]];
        }
    }
};
