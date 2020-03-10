// 方法1: 利用动态规划，求的前面的丑数，根据丑数定义，再依此*2、*3、*5就是后面的丑数

/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    const res = new Array(n)
    res[0] = 1

    let ptr2 = 0, // 下个数字永远 * 2
        ptr3 = 0, // 下个数字永远 * 3
        ptr5 = 0; // 下个数字永远 * 5

    for (let i = 1; i < n; ++i) {
        res[i] = Math.min(res[ptr2] * 2, res[ptr3] * 3, res[ptr5] * 5)
        // 说明前ptr2个丑数*2也不可能产生比i更大的丑数了
        // 所以移动ptr2
        if (res[i] === res[ptr2] * 2) {
            ++ptr2
        } 
        if (res[i] === res[ptr3] * 3) {
            ++ptr3
        } 
        if (res[i] === res[ptr5] * 5) {
            ++ptr5
        }
    }

    return res[n - 1]
};