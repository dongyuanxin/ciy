const { Heap } = require('./index')
const assert = require('assert')

function test1() {
    const maxHeap = new Heap()
    maxHeap.insert(2)
    maxHeap.insert(3)
    maxHeap.insert(10)
    assert.deepStrictEqual([ 10, 2, 3 ], maxHeap.container)
    
    maxHeap.extract()
    assert.strictEqual(maxHeap.top(), 3)
}

function test2() {
    const minHeap = new Heap((x, y) => x < y)
    minHeap.insert(10)
    minHeap.insert(3)
    minHeap.insert(2)
    assert.deepStrictEqual([ 2, 10, 3 ], minHeap.container)
    
    minHeap.extract()
    assert.strictEqual(minHeap.top(), 3)
}

test1()
test2()