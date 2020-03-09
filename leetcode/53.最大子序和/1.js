/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    const dp = []
    
    let res = dp[0] = nums[0]
    for (let i = 1; i < nums.length; ++i) {
        dp[i] = nums[i]
        if (dp[i - 1] > 0) {
            dp[i] += dp[i - 1]
        }
        res = Math.max(res, dp[i])
    }
    return res
};