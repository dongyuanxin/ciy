// 方法1: 回溯拿到所有情况，最后排序返回最小的组合
// timeout

/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    const result = []
    permutation(nums, 0, result)
    result.sort((a, b) => {
        if (a < b) return -1
        if (a > b) return 1
        return 0
    })
    return result[0]
};

/**
 * 
 * @param {number[]} nums 
 * @param {number} start 
 * @param {number[]} result 
 */
function permutation(nums, start, result) {
    if (start === nums.length) {
        result.push(nums.join(''))
        return
    }

    for (let i = start; i < nums.length; ++i) {
        [nums[i], nums[start]] = [nums[start], nums[i]];
        permutation(nums, start + 1, result);
        [nums[start], nums[i]] = [nums[i], nums[start]];
    }
}