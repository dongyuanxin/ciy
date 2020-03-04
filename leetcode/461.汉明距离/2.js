// 方法2: 布赖恩·克尼根算法
// 直接跳过0。对于二进制n来说，n & n-1 就会将最右边的1变0
// 参考图可看：https://leetcode-cn.com/problems/hamming-distance/solution/yi-ming-ju-chi-by-leetcode/

// ac地址：https://leetcode-cn.com/problems/hamming-distance/

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    let v = x ^ y // 异或：相同位为0，不同位为1
    let dis = 0
    while (v) {
        v = v & (v - 1)
        ++dis
    }
    return dis
};