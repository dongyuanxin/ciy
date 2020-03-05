// 方法1: 改造中序遍历
// 先遍历右，再当前，最后左（逆序）
// 比当前节点的值大的所有节点的和都放在sum中

// ac地址：https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var bstToGst = function(root) {
    let sum = 0
    travse(root)
    return root;

    function travse(node) {
        node.right && travse(node.right)

        node.val += sum
        sum = node.val

        node.left &&  travse(node.left)
    }
};