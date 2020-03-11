// 方法1: 暴力法，双重循环，TLE

/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    let res = 0
    const length = nums.length
    for (let i = 0; i < length; ++i) {
        for (let j = i + 1; j < length; ++j) {
            (nums[i] > nums[j]) && (++res);
        }
    }

    return res
};

console.log(reversePairs([7,5,6,4]))