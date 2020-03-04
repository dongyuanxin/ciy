// 方法1: 按位统计
// 对于第t位，统计nums中t位为1的数量和为0的数量
// 那么在t位上，汉明距离的和就是两个数量的乘积（类比排列）
// 复杂度降低到O(N)级别。

// 汉明距离应用：图片相似性：http://www.ruanyifeng.com/blog/2011/07/principle_of_similar_image_search.html

/**
 * @param {number[]} nums
 * @return {number}
 */
var totalHammingDistance = function(nums) {
    // 根据题目要求，不超过10^9，所以30位就可以了
    const res = (new Array(30)).fill(0)
    for (let num of nums) {
        let bit = 0
        let mask = 0x01
        while (bit < 30) {
            if (num & mask) {
                ++res[bit]
            }
            ++bit
            mask = mask << 1
        }
    }

    const length = nums.length
    return res.reduce((pre, cur) => pre + cur * (length - cur) ,0)
};

// console.log(totalHammingDistance([4, 14, 2]))