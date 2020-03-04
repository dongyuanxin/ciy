// 方法1: 使用掩码
// 对每一位进行判断

// ac地址：https://leetcode-cn.com/problems/hamming-distance/

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    let dis = 0
    let mask = 0x01
    let times = 0
    while (times < 31) {
        if ((x & mask) !== (y & mask)) {
            ++dis
        }
        mask = mask << 1
        ++times
    }

    return dis
};
