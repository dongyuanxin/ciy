// 方法2：优化的滑动窗口
// map使用 char => index
// index代表字符char上次出现的位置，这样滑动窗口在缩小的时候，可以「一步到位」
// 而不是逐步缩小左边

// demo: "tmmzuxt"

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const length = s.length
    const map = new Map()
    let i = 0, j = 0
    let ans = 0
    while (i < length && j < length) {
        // 容易理解：检查s[j]是否出现过，并且s[j]重复的字符是否在当前的滑动窗口中
        if (map.has(s[j]) && map.get(s[j]) >= i) {
            i = map.get(s[j]) + 1
        }
        ans = Math.max(j - i + 1, ans)
        map.set(s[j], j)
        ++j
    }
    return ans
};

console.log(lengthOfLongestSubstring("tmmzuxt"))