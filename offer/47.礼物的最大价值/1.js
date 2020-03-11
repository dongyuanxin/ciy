// ![](https://tva1.sinaimg.cn/large/00831rSTly1gcp7gfgfalj30ur0u0dkm.jpg)
// 内存100%，时间96.63% 截图如上

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    const rowNum = grid.length
    const colNum = grid[0].length
    const dp = []
    for (let i = 0; i < rowNum; ++i) {
        dp[i] = []
        for (let j = 0; j < colNum; ++j) {
            dp[i][j] = 0
        }
    }

    dp[0][0] = grid[0][0]
    for (let i = 1; i < rowNum; ++i) {
        dp[i][0] = grid[i][0] + dp[i - 1][0]
    }

    for (let j = 1; j < colNum; ++j) {
        dp[0][j] = grid[0][j] + dp[0][j - 1]
    }

    for (let i = 1; i < rowNum; ++i) {
        for (let j = 1; j < colNum; ++j) {
            dp[i][j] = grid[i][j] + Math.max(dp[i - 1][j], dp[i][j - 1])
        }
    }

    return dp[rowNum - 1][colNum - 1]
};

console.log(maxValue([
    [1,3,1],
    [1,5,1],
    [4,2,1]
  ]))