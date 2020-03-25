// 按位计算
// ac地址：https://leetcode-cn.com/problems/single-number-ii/
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0;
    for (let bit = 0; bit < 32; ++bit) {
        let mask = 1 << bit;
        let count = 0;
        for (let num of nums) {
            if (num & mask) ++count;
        }
        if (count % 3) {
            res = res | mask;
        }
    }
    return res;
};
