// ac地址： https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/

/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
    let result = 0
    traceback(num + '', 0)
    return result

    /**
     * @param {string} str 
     * @param {number} start 
     */
    function traceback(str, start) {
        if (start >= str.length) {
            ++result
            return
        }

        traceback(str, start + 1)
        const sub = str.substr(start, 2)
        if (sub.length === 2 && sub >= '10' && sub <= '25') {
            traceback(str, start + 2)
        }
    }
};


console.log(translateNum(12258))