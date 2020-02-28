const assert = require('assert')
const { UnionFind } = require('./index')

function test1() {
    const uf = new UnionFind()
    assert.strictEqual(uf.find(1), 1)

    uf.union(1, 2)
    assert.strictEqual(uf.find(1), 2)

    uf.union(2, 3)
    assert.strictEqual(uf.find(1), 3)
    assert.strictEqual(uf.find(2), 3)
}

test1()