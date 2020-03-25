/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {Object} obj
 * @return {boolean}
 */
var isBalanced = function(root, obj = {}) {
    if (!root) {
        obj.depth = 0;
        return true;
    }

    const left = {};
    const right = {};
    if (isBalanced(root.left, left) && isBalanced(root.right, right)) {
        if (Math.abs(left.depth - right.depth) > 1) {
            return false;
        }

        obj.depth = Math.max(left.depth, right.depth) + 1;
        return true;
    } else {
        return false;
    }
};
