/**
 * @param {number} n
 * @return {number}
 */
var sumNums = function(n) {
    return n > 0 ? n + sumNums(n - 1) : 0;
};
