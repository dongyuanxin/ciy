// index.js 中的字典树无法做到：
//  1. 删除单词
//  2. 统计单词次数

/**
 * 通过处理end和path的关系，来进行删除操作
 */
class TrieNode {
    constructor() {
        this.next = {}
        this.end = 0 // 代表有几个单词以当前节点为终止节点
        this.path = 0 // 代表有几个单词从当前节点经过
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    /**
     * 插入单词
     * @param {string} word 
     * @return {boolean} 是否插入成功
     */
    insert(word) {
        if (!word) return false

        let node = this.root
        for (let i = 0; i < word.length; ++i) {
            if (!node.next[word[i]]) {
                node.next[word[i]] = new TrieNode()
            }
            node.path += 1
            node = node.next[word[i]]
        }
        node.end += 1
        return true
    }

    /**
     * 搜索单词出现的次数
     * @param {string} word 
     * @return {number}
     */
    search(word) {
        if (!word) return false

        let node = this.root
        for (let i = 0; i < word.length; ++i) {
            if (node.next[word[i]]) {
                node = node.next[word[i]]
            } else {
                return 0
            }
        }
        return node.end
    }

    /**
     * 查找前缀
     * @param {string} prefix 
     * @return {boolean}
     */
    startsWith(prefix) {
        if (!prefix) return true

        let node = this.root
        for (let i = 0; i < prefix.length; ++i) {
            if (node.next[prefix[i]]) {
                node = node.next[prefix[i]]
            } else {
                return false
            }
        }
        return true
    }

    /**
     * 删除单词
     * 注意：掘金小册《前端面试之道》里面的字典树的del函数有问题，无法通过测试
     * @param {string} word
     * @return {void}
     */
    del(word) {
        if (!this.search(word)) return
        const length = word.length
        let node = this.root, preNode = null

        for (let i = 0; i < length; ++i) {
            --node.path
            // 如果path为0，说明减掉后没有单词经过当前节点
            if (!node.path) {
                if (preNode) {
                    // 如果不是根节点，那么将上一节点和这一节点的“路径”裁剪
                    preNode.next[word[i - 1]] = null
                } else { 
                    // 如果当前节点是根节点，那么直接裁剪
                    node.next[word[i]] = null
                }
                return
            }
            preNode = node
            node = node.next[word[i]]
        }
        
        --node.end
        if (!node.end) {
            preNode.next[word[length - 1]] = null
        }
    }
}

module.exports.Trie = Trie