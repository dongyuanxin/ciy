/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    let step = 0;
    let res = null;
    inorder(root);
    return res;

    function inorder(node) {
        if (!node) return;

        inorder(node.right);
        if (++step === k) {
            res = node;
        }
        inorder(node.left);
    }
};
