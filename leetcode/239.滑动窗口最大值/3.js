// ac地址：https://leetcode-cn.com/problems/sliding-window-maximum/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if (k === 0) return [];
    const length = nums.length;
    if (length === 0) return [];

    const deque = [];
    for (let i = 0; i < k; ++i) {
        cleanDeque(deque, nums, i, k);
        deque.push(i);
    }

    const res = [];
    res.push(nums[deque[0]]);
    for (let i = k; i < length; ++i) {
        cleanDeque(deque, nums, i, k);
        deque.push(i);
        res.push(nums[deque[0]]);
    }
    return res;
};

/**
 *
 * @param {number[]} queue
 * @param {number[]} nums
 * @param {number} idx
 * @param {number} k
 */
function cleanDeque(queue, nums, idx, k) {
    if (queue.length && idx >= k + queue[0]) {
        queue.shift();
    }
    while (queue.length && nums[idx] > nums[queue[queue.length - 1]]) {
        queue.pop();
    }
}

console.log(maxSlidingWindow([7, 2, 4], 2));
