/**
 * @param {number} n
 * @return {number[]}
 */
var twoSum = function(n) {
    const map = new Map();
    const totalTimes = Math.pow(6, n); // 出现的总次数
    inner(0, 1);

    const res = [];
    for (const times of map.values()) {
        res.push(times / totalTimes);
    }

    return res;

    /**
     * @param {number[]} total
     * @param {number} step
     */
    function inner(total, step) {
        if (step > n) {
            map.set(total, map.has(total) ? map.get(total) + 1 : 1);
            return;
        }

        for (let i = 1; i <= 6; ++i) {
            inner(total + i, step + 1);
        }
    }
};
