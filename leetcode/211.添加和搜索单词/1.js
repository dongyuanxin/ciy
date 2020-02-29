// 方法1: dfs + 前缀树（字典树）
// ac地址: https://leetcode-cn.com/problems/add-and-search-word-data-structure-design/

var TrieNode = function() {
    this.next = {}
    this.isEnd = false
}

/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.root = new TrieNode()
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    if (!word.length) return
    
    let node = this.root
    for (let i = 0; i < word.length; ++i) {
        if (!node.next[word[i]]) {
            node.next[word[i]] = new TrieNode()
        }
        node = node.next[word[i]]
    }
    node.isEnd = true
}; 

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    if (!word.length) return false

    return this.dfs(this.root, word)
};

/**
 * @param {TrieNode} root
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.dfs = function(root, word) {
    const length = word.length
    let node = root
    for (let i = 0; i < length; ++i) {
        const ch = word[i]

        if (ch === '.') {
            const keys = Reflect.ownKeys(node.next)
            for (const key of keys) {
                const found = this.dfs(node.next[key], word.slice(i + 1))
                if (found) return true
            }
            return false
        }

        if (!node.next[ch]) {
            return false
        }
        node = node.next[ch]
    }
    return node.isEnd
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */


const obj = new WordDictionary()
obj.addWord('ab')
console.log(obj.search('..'))