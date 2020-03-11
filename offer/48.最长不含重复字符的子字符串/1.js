// 方法：滑动窗口

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const length = s.length
    const map = {} // char => boolean 代表着char是否在目前的窗口内
    let i = 0, j = 0
    let ans = 0
    while (i < length && j < length) {
        if (!map[s[j]]) {
            ans = Math.max(j - i + 1, ans)
            map[s[j]] = true
            ++j
        } else {
            // 如果char重复，那么缩小滑动窗口，并更新对应的map
            map[s[i]] = false
            ++i
        }
    }

    return ans
};