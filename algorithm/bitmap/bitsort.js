// Bitmap: 用一个bit位来标记某个元素对应的Value，而Key就是该元素
// 用时间换空间。由于使用了bit位，所以空间节省
// 应用1: bit sort
// 应用2: 查找2.5亿个整数中找出不重复的整数。每个数字要用2个bit，00代表没出现，01代表一次，10代表多次。
//      循环遍历，00 => 01 => 10(不再需要变换)
// 应用3: 大数据量的快速集合运算。利用多个bitmap来完成。

// 参考：
//  应用1、2: https://wizardforcel.gitbooks.io/the-art-of-programming-by-july/content/06.07.html
//  应用3: https://blog.csdn.net/u011619071/article/details/77703877

const BYTE_SIZE = 8 // 1byte = 8bit

/**
 * 将Buffer对应
 * @param {Buffer} buf
 * @param {number} position
 */
function setBit(buf, position) {
    let index = Math.floor(position / BYTE_SIZE)
    let offset = position % BYTE_SIZE
    // 对应的字节的bit位置位0
    buf[index] = buf[index] | (0x01 << offset) 
}

/**
 * 假设nums中元素的取值范围是：item >= 0
 * 用对应的bit位来标记是否出现
 * @param {number[]} nums 
 */
function bitSort(nums) {
    const byteLength = Math.ceil(nums.length / BYTE_SIZE)

    const buf = Buffer.alloc(byteLength)
    nums.forEach(num => setBit(buf, num))

    for (let i = 0; i < byteLength; ++i) {
        let mask = 0x01 
        let j = 0
        do {
            if ((buf[i] & mask) === mask) {
                const num = i * BYTE_SIZE + j
                process.stdout.write(num.toString() + ' ')
            }
            mask = mask << 1
            ++j
        } while(j < BYTE_SIZE);
    }

    process.stdout.write('\r\n')
}

module.exports.bitSort = bitSort