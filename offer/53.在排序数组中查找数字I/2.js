// 方法2: 二分查找
// 改造基本的二分查找方法，在找到匹配时，继续缩小范围查找
// 例如对 2、3、3、3、2， target为3
// 那么第一次mid匹配成功后，继续缩小范围进行查找，相当于不断对子序列进行二分
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    const length = nums.length;
    let start = -1,
        end = -1;

    let left = 0,
        right = length - 1;
    // 找到左边界：找到第一次出现
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            start = mid;
            right = mid - 1; // important
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    left = 0;
    right = length - 1;
    // 找到右边界：找到第2次出现
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            end = mid;
            left = mid + 1; // important
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return start <= end && start !== -1 ? end - start + 1 : 0;
};

console.log(search([5,7,7,8,8,10]))