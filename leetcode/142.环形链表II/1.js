// ac地址：https://leetcode-cn.com/problems/linked-list-cycle-ii/

// Floyd判圈算法（龟兔赛跑）
// 判断环的入口点
// 找到相遇点，然后2个指针ptr1从头节点开始、ptr2从相遇点开始
// 每次移动一个距离，必会在入口点相遇

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let intersect = getIntersect(head)
    if (!intersect) {
        return null
    }

    let ptr1 = head
    let ptr2 = intersect
    while (ptr1 !== ptr2) {
        ptr1 = ptr1.next
        ptr2 = ptr2.next
    }

    return ptr2
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function getIntersect(head) {
    let fast = head
    let slow = head

    while (slow && fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) {
            return slow
        }
    }

    return null
}