/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
    let result = 0;
    for (let i = 2; i <= n; ++i) {
        result = (result + m) % i;
    }
    return result;
};
