// ac地址：https://leetcode-cn.com/problems/sliding-window-maximum/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if (k === 1) return nums;
    const length = nums.length;
    if (!length) return [];

    const left = new Array(length);
    const right = new Array(length);

    left[0] = nums[0];
    right[length - 1] = nums[length - 1];
    for (let i = 1; i < length; ++i) {
        if (i % k) {
            left[i] = Math.max(nums[i], left[i - 1]);
        } else {
            left[i] = nums[i];
        }

        let j = length - i - 1;
        if ((j + 1) % k) {
            right[j] = Math.max(nums[j], right[j + 1]);
        } else {
            right[j] = nums[j];
        }
    }

    console.log(left, right);

    const res = [];
    for (let i = 0; i < length - k + 1; i++) {
        res.push(Math.max(right[i], left[i + k - 1]));
    }
    return res;
};

maxSlidingWindow([1, -9, 8, -6, 6, 4, 0, 5], 4);
