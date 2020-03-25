/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
    let tmp = 0;
    for (let num of nums) {
        tmp = tmp ^ num;
    }

    let bit = 0;
    let mask = 1;
    while ((mask & tmp) === 0) {
        mask = mask << 1;
        ++bit;
    }

    let res1 = 0,
        res2 = 0;
    for (let num of nums) {
        if (num & mask) {
            res1 = res1 ^ num;
        } else {
            res2 = res2 ^ num;
        }
    }

    return [res1, res2];
};

console.log(singleNumbers([1, 2, 5, 2]));
