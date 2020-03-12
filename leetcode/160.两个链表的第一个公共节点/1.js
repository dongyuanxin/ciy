// 方法1: 使用hashmap ，空间复杂度是O(N),时间复杂度是O(N)
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    const map = new Map()
    let node = headA
    while (node) {
        map.set(node, true)
        node = node.next
    }

    node = headB
    while (node) {
        if (map.has(node)) return node
        node = node.next
    }
    return null
};