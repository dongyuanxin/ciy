/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
    nums.sort((a, b) => a - b);
    let sub = 0;
    for (let i = 0; i < 4; ++i) {
        if (nums[i] === 0) continue;
        if (nums[i] === nums[i + 1]) continue;
        sub += nums[i + 1] - nums[i];
    }
    return sub < 5;
};

isStraight([1, 2, 5, 0, 0]);
