// 方法2: 使用归并排序
// 分治法：先拆成子问题，再将子问题的答案进行合并
// 在归并的过程中，计算逆序对
// 以7、5、6、4为例

/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    return findInversePairNum(nums, 0, nums.length - 1)
};

/**
 * @param {number[]} arr 
 * @param {number} start 
 * @param {number} end 
 */
function findInversePairNum(arr, start, end) {
    if (start >= end) return 0

    const copy = new Array(end - start + 1)
    const length = Math.floor((end - start) / 2) // 左数组长度
    const leftNum = findInversePairNum(arr, start, start + length)
    const rightNum = findInversePairNum(arr, start + length + 1, end)

    let i = start + length
    let j = end
    let copyIndex = end - start
    let num = 0
    while (i >= start && j >= start + length + 1) {
        if (arr[i] > arr[j]) {
            num += (j - start - length);
            copy[copyIndex--] = arr[i--]
        } else {
            copy[copyIndex--] = arr[j--]
        }
    }

    while (i >= start) {
        copy[copyIndex--] = arr[i--]
    }

    while (j >= start + length + 1) {
        copy[copyIndex--] = arr[j--]
    }
    
    for (let k = start; k <= end; ++k) {
        arr[k] = copy[k - start]
    }

    return num + leftNum + rightNum
}

console.log(reversePairs([7,5,6,4]))