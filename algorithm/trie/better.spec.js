const assert = require('assert')
const { Trie } = require('./better')

function test1() {
    const trie = new Trie()
    trie.insert('a')
    trie.del('a')

    assert.strictEqual(trie.search('a'), 0)
    assert.strictEqual(trie.root.path, 0)
    assert.strictEqual(trie.root.next['a'], null)
}

function test2() {
    const trie = new Trie()
    trie.insert('ab')
    trie.insert('c')
    assert.strictEqual(trie.root.path, 2)

    trie.del('ab')
    assert.strictEqual(trie.root.path, 1)
    assert.strictEqual(trie.root.next['a'], null)
}


function test3() {
    const trie = new Trie()
    trie.insert('ab')
    trie.insert('ac')
    assert.strictEqual(trie.root.path, 2)

    trie.del('ab')
    assert.strictEqual(trie.root.next['a'].path, 1)
    assert.strictEqual(trie.root.next['a'].next['b'], null)
}

function test4() {
    const trie = new Trie()
    trie.insert('ab')
    trie.insert('ab')
    assert.strictEqual(trie.search('ab'), 2)
}

test1()
test2()
test3()
test4()