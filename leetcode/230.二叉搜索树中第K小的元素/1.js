// 方法1：中序遍历
// 二叉搜索树的中序遍历就是按顺序访问节点

// ac地址：https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let i = 0
    let val = null
    travel(root)
    return val
    
    function travel(node) {
        node.left && travel(node.left)

        if (++i === k) {
            val = node.val
            return
        }

        node.right && travel(node.right)
    }
};