const { BST } = require('./index')
const assert = require('assert')

function test1() {
    const bst = new BST()
    assert.strictEqual(bst.root, null)
    bst.insert(100, 'a')
    assert.strictEqual(bst.root.val, 'a')
    assert.strictEqual(bst.root.score, 100)

    bst.insert(90, 'b')
    bst.insert(110, 'c')
    bst.insert(108, 'd')
    bst.insert(115, 'e')
    assert.strictEqual(bst.size, 5)
    assert.strictEqual(bst.getMinNode().score, 90)
    assert.strictEqual(bst.getMaxNode().score, 115)

    const newVal = 'https://xxoo521.com/'
    bst.insert(110, newVal)
    assert.strictEqual(bst.root.right.val, newVal)

    bst.remove(100)
    assert.strictEqual(bst.size, 4)
    assert.strictEqual(bst.root.score, 108)
    assert.strictEqual(bst.getMinNode().score, 90)
    assert.strictEqual(bst.getMaxNode().score, 115)
}

test1()