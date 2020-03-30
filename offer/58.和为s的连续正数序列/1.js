/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let a = 1,
        b = 2,
        sum = a + b;
    const res = [];
    while (a !== b && b <= target) {
        if (sum === target) {
            res.push(getSubSequence(a, b));
            ++b;
            sum += b;
        } else if (sum > target) {
            sum -= a; // 注意，这里是先减去指针对应的值，再移动指针
            ++a;
        } else {
            ++b;
            sum += b;
        }
    }
    return res;
};

function getSubSequence(start, end) {
    const res = [];
    for (let i = start; i <= end; ++i) {
        res.push(i);
    }
    return res;
}
