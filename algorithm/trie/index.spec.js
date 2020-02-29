const assert = require('assert')
const { Trie } = require('./index')

function test1() {
    const trie = new Trie()

    assert.ok(trie.insert('apple'))

    assert.ok(trie.search('apple'))

    assert.ok(trie.startsWith('apple'))

    assert.strictEqual(trie.search('app'), false)

    assert.strict(trie.insert('app'), true)

    assert.strict(trie.search('app'), true)
}

test1()
