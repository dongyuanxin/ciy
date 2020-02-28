// 错误思路：直接使用set
// 输入：[[3,4],[1,2],[2,4],[3,5],[2,5]]
// 错误输出：[2,4]

// 因为3、4、1、2依次放入了set中。但是3、4和1、2并不是连通的，不能用Set代表连通分量。

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const set = new Set()
    for (const edge of edges) {
        if (set.has(edge[0]) && set.has(edge[1])) {
            return edge
        } 
        set.add(edge[0]).add(edge[1])
    }
    return [-1, -1]
};