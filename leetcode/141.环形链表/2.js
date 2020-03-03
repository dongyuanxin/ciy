// 方法2: 使用哈希表
// 若出现环，那么环的入口出的节点一定会被重复访问
// 所以准备一个node=>boolean的map即可

// ac地址：https://leetcode-cn.com/problems/linked-list-cycle/

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (!head) return false

    const map = new Map()
    let node = head
    map.set(node, true)

    while (node.next) {
        if (map.get(node.next)) {
            // map.clear() // 节省时间可以去掉
            return true
        }
        map.set(node.next, true)
        node = node.next
    }
    // map.clear()
    return false
};