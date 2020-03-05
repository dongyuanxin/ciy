// 二叉搜索树：https://github.com/dongyuanxin/old-notes/blob/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95/2018-10-09-binary-search-tree.md

// 实现中比较精妙的地方是：
//  1. Node结构设计（score和val的含义）
//  2. 递归的实现写法中，关于修改节点的操作，在递归过程中修改节点，并返回修改后的新节点。在对外暴露的API中，再用新节点覆盖旧节点

class TreeNode {
    /**
     * @param {number} score 节点权重，它决定着节点在BST中的位置！！！
     * @param {any} val 节点存放的值
     * @param {TreeNode} left 
     * @param {TreeNode} right 
     */
    constructor(score, val, left = null, right = null) {
        this.score = score
        this.val = val
        this.left = left
        this.right = right
    }
}

class BST {
    constructor() {
        this.size = 0
        this.root = null
    }

    /**
     * @param {TreeNode} node 
     * @param {number} score 
     * @return {TreeNode}
     */
    _search(node, score) {
        if (!node) return null
        if (node.score === score) return node
        else if (node.score > score) return this._search(node.left, score)
        else return this._search(node.right, score)
    }

    /**
     * 搜索指定权重的节点
     * @param {number} score 
     * @return {TreeNode}
     */
    search(score) {
        return this._search(this.root, score)
    }

    /**
     * 插入节点的实现：
     *  1. 节点不存在：找到节点应该插入的位置，并且新建节点
     *  2. 节点存在：更细节点的信息
     * @param {TreeNode} node 
     * @param {number} score 
     * @param {any} value 
     * @return {TreeNode}
     */
    _insert(node, score, value) {
        if (!node) {
            ++this.size
            return new TreeNode(score, value)
        }

        if (node.score === score) {
            node.val = value
        } else if (score > node.score) { // score比当前节点的score大，那么就是更新右子树
            node.right = this._insert(node.right, score, value) 
        } else {
            node.left = this._insert(node.left, score, value)
        }
        return node
    }

    /**
     * 插入新的节点
     * @param {number} score 新节点
     * @param {any} value 
     */
    insert(score, value) {
        this.root = this._insert(this.root, score, value) 
    }

    /**
     * @param {TreeNode} node
     * @return {TreeNode} 
     */
    _getMaxNode(node) {
        while (node && node.right) {
            node = node.right
        }
        return node
    }

    /**
     * 搜索权重最大的节点
     * @return {TreeNode}
     */
    getMaxNode() {
        return this._getMaxNode(this.root)
    }

    /**
     * @param {TreeNode} node
     * @return {TreeNode} 
     */
    _getMinNode(node) {
        while (node && node.left) {
            node = node.left
        }
        return node
    }

    /**
     * 搜索权重最小的节点
     * @return {TreeNode}
     */
    getMinNode() {
        return this._getMinNode(this.root)
    }

    /**
     * @param {TreeNode} node
     */
    _removeMin(node) {
        // 递归到底，如果没有左节点，那么当前节点就是最小节点
        // 将自身移除，并将右子树返回，作为父节点的新的左子树
        if (!node.left) {
            const right = node.right
            node = null
            --this.size
            return right
        }
        node.left = this._removeMin(node.left) // 更新父节点的左子树
        return node
    }

    /**
     * @param {TreeNode} node
     * @param {number} score
     */
    _remove(node, score) {
        if (!node) return null
        
        if (score > node.score) {
            node.right = this._remove(node.right, score)
            return node
        } else if (score < node.score) {
            node.left = this._remove(node.left, score)
            return node
        }

        // 分为3种情况：
        //  1. 无左子树
        //  2. 无右子树
        //  3. 左右均有
        if (!node.left) {
            --this.size
            const right = node.right
            node = null
            return right
        } 

        if (!node.right) {
            --this.size
            const left = node.left
            node = null
            return left
        }
        // 如果当前节点既有左子树，也有右子树
        const minNode = this._getMinNode(node.right) // 获取右子树的最小节点
        minNode.right = this._removeMin(node.right) // 移除右子树的最小节点，并将right指向更新后的右子树
        minNode.left = node.left // 将left指向左子树
        node = null // 当前节点扔掉
        return minNode
    }

    /**
     * 删除指定权重的节点
     * @param {number} score 
     */
    remove(score) {
        this.root = this._remove(this.root, score)
    }
}

module.exports.BST = BST