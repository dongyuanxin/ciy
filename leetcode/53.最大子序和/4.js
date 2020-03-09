// 方法3：分治法
// 分治法就是看左边、右边和跨越中间，这三个sum
// 其中跨越中间的sum，处理方法是从中间向两边计算，然后加和
// 用不到线段树：https://leetcode-cn.com/problems/maximum-subarray/solution/cfen-zhi-suan-fa-qu-jian-er-fen-xian-duan-shu-jian/

/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @param {number} mid
 * @return {number}
 */
function crossSum(nums, left, right, mid) {
    if (left === right) {
        return nums[left]
    }

    let leftMaxSum = Number.MIN_SAFE_INTEGER
    let leftSum = 0
    for (let i = mid; i >= left; --i) {
        leftSum += nums[i]
        leftMaxSum = Math.max(leftMaxSum, leftSum)
    }

    let rightMaxSum =  Number.MIN_SAFE_INTEGER
    let rightSum = 0
    for (let i = mid + 1; i <= right; ++i) {
        rightSum += nums[i]
        rightMaxSum = Math.max(rightMaxSum, rightSum)
    }

    return leftMaxSum + rightMaxSum
}

/**
 * @param {number[]} nums
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function __maxSubArray(nums, left, right) {
    if (left === right) {
        return nums[left]
    }

    const mid = Math.floor((left + right) / 2)
    const lsum = __maxSubArray(nums, left, mid)
    const rsum = __maxSubArray(nums, mid + 1, right)
    const cross = crossSum(nums, left, right, mid)

    return Math.max(lsum, rsum, cross)
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    return __maxSubArray(nums, 0, nums.length - 1)
};