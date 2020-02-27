// 方法1: 直接排序
// 每次取出元素的时候先排序，再取出
// JavaScript会timeout，无法ac

/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.data = []
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.data.push(num)
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const length = this.data.length
    if (!length) {
        return null
    }
    this.data.sort((a, b) => a - b)

    const mid = Math.floor((length - 1) / 2)
    if (length % 2) {
        return this.data[mid]
    }
    return (this.data[mid] + this.data[mid + 1]) / 2
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
