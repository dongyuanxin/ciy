// ac地址：https://leetcode-cn.com/problems/number-of-digit-one/
// 参考： https://leetcode-cn.com/problems/number-of-digit-one/solution/qiao-miao-shi-jian-fu-za-du-ologn-by-xian-hui/
/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n) {
    if (n < 0) {
        return 0
    }

    let bit = 1
    let res = 0
    let high = n
    while (high) {
        // 高位数字：从第bit+1位到最高位
        high = Math.floor(n / Math.pow(10, bit)) 
        // 从bit位到最高位
        let tmp = Math.floor(n / Math.pow(10, bit - 1))
        // 当前位
        let current = tmp % 10
        // 低位数字：从bit-1位到最低位
        let low = n - tmp * Math.pow(10, bit - 1)

        // 以数字213，第2位为例，很好理解
        if (current === 1) {
            res = res + (low + 1) + high * Math.pow(10, bit - 1)
        } else if (current > 1) {
            res = res + (high + 1) * Math.pow(10, bit - 1)
        } else {
            res = res + high * Math.pow(10, bit - 1)
        }
        ++bit
    }

    return res
};