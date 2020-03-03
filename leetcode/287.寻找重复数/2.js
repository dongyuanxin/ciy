// 方法2: Floyd算法
// 这题是变形的Floyd算法。重要的是怎么理解才能将数组转换为链表？
// 由于数组长度是 n + 1，里面元素的范围是【1，n】
// 对于元素i（取值范围合法于下标），定义他的next就是nums【i】
// 如此一来，转换成功

// ac地址：https://leetcode-cn.com/problems/find-the-duplicate-number/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let intersect = getIntersect(nums)
    let ptr1 = nums[0]
    let ptr2 = intersect
    while (ptr2 !== ptr1) {
        ptr1 = nums[ptr1]
        ptr2 = nums[ptr2]
    }
    
    return ptr2
};

/**
 * @param {number[]} nums
 * @param {number} 
 */
function getIntersect(nums) {
    let fast = nums[0]
    let slow = nums[0]

    do {
        slow = nums[slow]
        fast = nums[fast]
        fast = nums[fast]
    }while(fast !== slow)

    return fast
} 