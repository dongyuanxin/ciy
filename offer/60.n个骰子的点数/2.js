/**
 * @param {number} n
 * @return {number[]}
 */
var twoSum = function(n) {
    const dp = new Array(n + 1);
    for (let i = 1; i <= n; ++i) {
        dp[i] = new Array(67).fill(0);
    }

    for (let j = 1; j <= 6; ++j) {
        dp[1][j] = 1;
    }

    for (let i = 2; i <= n; ++i) {
        for (let j = i; j <= 6 * i; ++j) {
            for (let k = 1; j - k > 0 && k <= 6; ++k) {
                dp[i][j] += dp[i - 1][j - k];
            }
        }
    }

    let totalTimes = Math.pow(6, n);
    const ans = [];
    for (let j = n; j <= n * 6; ++j) {
        ans.push(dp[n][j] / totalTimes);
    }
    return ans;
};

console.log(twoSum(2));
