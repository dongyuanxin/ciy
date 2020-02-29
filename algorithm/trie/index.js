// 参考地址：https://leetcode-cn.com/problems/implement-trie-prefix-tree/solution/shi-xian-trie-qian-zhui-shu-by-leetcode/

/**
 * 它本身不记录值，是通过next来记录
 * 例如：
 * ```javascript
 *  const root = new TrieNode()
 *  root.next['a'] = new TrieNode()
 * ```
 * 代表着root连接着一个TrieNode，中间的路径通过next连接，路径上的值是'a'
 */
class TrieNode {
    constructor() {
        this.next = {}
        this.isEnd = false
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
            node = node.next[word[i]]
        }
        node.isEnd = true
        return true
    }

    /**
     * 搜索单词
     * @param {string} word 
     * @return {boolean}
     */
    search(word) {
        if (!word) return false

        let node = this.root
        for (let i = 0; i < word.length; ++i) {
            if (node.next[word[i]]) {
                node = node.next[word[i]]
            } else {
                return false
            }
        }
        return node.isEnd
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
}

module.exports.Trie = Trie