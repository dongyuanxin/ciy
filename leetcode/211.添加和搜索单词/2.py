# 方法2: 巧妙的利用正则表达式
# 所有的单词都通过前后添加 # 来进行分割
# 不再需要将所有单词都存放在一个数组中
# python可以勉强ac（2924 ms），Nodejs不可以

# ac地址: https://leetcode-cn.com/problems/add-and-search-word-data-structure-design/

from re import search

class WordDictionary:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.words = '#'


    def addWord(self, word: str) -> None:
        """
        Adds a word into the data structure.
        """
        self.words += (word + '#')

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
        """
        return bool(search('#' + word + '#', self.words))


# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)