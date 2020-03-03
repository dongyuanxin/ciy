// 方法2: 使用哈希表
// 若出现环，那么环的入口出的节点一定会被重复访问

// ac地址：https://leetcode-cn.com/problems/linked-list-cycle-ii/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if (!head) return false

    const map = new Map()
    let node = head
    map.set(node, true)

    while (node.next) {
        if (map.get(node.next)) {
            return node.next
        }
        map.set(node.next, true)
        node = node.next
    }
    return null
};