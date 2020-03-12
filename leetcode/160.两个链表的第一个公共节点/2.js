// 方法2: 快慢指针
// 时间95.49%，内存击败100%
// ![](https://tva1.sinaimg.cn/large/00831rSTly1gcqxd3lzj2j30vv0u0jwh.jpg)

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let node = headA
    let lengthA = 0
    while (node) {
        ++lengthA
        node = node.next
    }
    if (!lengthA) return null

    node = headB
    let lengthB = 0
    while (node) {
        ++lengthB
        node = node.next
    }
    if (!lengthB) return null

    let diff = 0, slow, fast
    if (lengthA > lengthB) {
        slow = headA
        fast = headB
        diff = lengthA - lengthB
    } else {
        slow = headB
        fast = headA
        diff = lengthB - lengthA
    }

    while (diff--) {
        slow = slow.next
    }

    while (slow !== fast) {
        slow = slow.next
        fast = fast.next
    }

    return slow
};