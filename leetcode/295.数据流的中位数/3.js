// ac地址：https://leetcode-cn.com/problems/find-median-from-data-stream/
// 方法2: 平衡堆
// 时间复杂度是：O(1) + 5*O(logN) = O(logN)

const defaultCmp = (x, y) => x > y;

const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];

class Heap {
    /**
     * 默认是最大堆
     * @param {Function} cmp 
     */
    constructor(cmp = defaultCmp) {
        this.container = [];
        this.cmp = cmp;
    }

    insert(data) {
        const { container, cmp } = this;

        container.push(data);
        let index = container.length - 1;
        while (index) {
            let parent = Math.floor((index - 1) / 2);
            // if (container[index] <= container[parent]) {
            //     break;
            // }
            if (!cmp(container[index], container[parent])) {
                return
            }
            swap(container, index, parent);
            index = parent;
        }
    }

    extract() {
        const { container, cmp } = this;
        if (!container.length) {
            return null;
        }

        swap(container, 0, container.length - 1);
        const res = container.pop();
        const length = container.length;
        let index = 0,
            exchange = index * 2 + 1;

        while (exchange < length) {
            // 如果有右节点，并且右节点的值大于左节点的值
            let right = index * 2 + 2;
            // if (right < length && container[right] > container[exchange]) {
            //     exchange = right;
            // }
            // if (container[exchange] <= container[index]) {
            //     break;
            // }
            if (right < length && cmp(container[right], container[exchange])) {
                exchange = right;
            }
            if (!cmp(container[exchange],container[index])) {
                break;
            }
            swap(container, exchange, index);
            index = exchange;
            exchange = index * 2 + 1;
        }

        return res;
    }

    top() {
        if (this.container.length) return this.container[0];
        return null;
    }
}

/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    // 最大堆：存放数据流中较小的一半元素
    // 最小堆：存放数据流中较大的一半元素
    // 中值的定义：较小的一半元素中的最大值x + 较大的一半元素中的最小值y 的平均值
    this.maxHeap = new Heap() 
    this.minHeap = new Heap((x, y) => x < y)
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    // 保持maxHeap.length = minHeap.length || maxHeap.length = minHeap.length +  1
    // 很巧妙的平衡过程：先让入maxHeap，进行调整后
    // 再取出top放入minHeap
    // 检查大小关系
    this.maxHeap.insert(num)
    this.minHeap.insert(this.maxHeap.top())
    this.maxHeap.extract()

    if (this.maxHeap.container.length < this.minHeap.container.length) {
        this.maxHeap.insert(this.minHeap.top())
        this.minHeap.extract()
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    return this.maxHeap.container.length > this.minHeap.container.length
        ? this.maxHeap.top()
        : (this.maxHeap.top() + this.minHeap.top()) / 2
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */