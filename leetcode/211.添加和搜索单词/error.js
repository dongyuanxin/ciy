// 方法2: 暴力法
// 对每个单词正则表达式
// timeout，无法ac

/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.values = []
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    word.length && this.values.push(word)
}; 

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    const re = new RegExp('^' + word + '$')
    for (const val of this.values) {
        if (re.test(val)) return true
    }
    return false
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

const obj = new WordDictionary()
obj.addWord('ab')
console.log(obj.search('ab'))
