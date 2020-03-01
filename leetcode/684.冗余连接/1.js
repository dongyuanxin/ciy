// 方法1:使用「并查集」
// 同一棵树有着一个root，处于同一个集合中
// 遍历所有的边edges，将连通的结点放入同一个集合，形成一个联通分量GG。
// 在遍历的过程中，如果边(a, b)的两个结点a, b已经属于同一联通分量，则(a, b)就是该联通分量的冗余边。

// ac地址：https://leetcode-cn.com/problems/redundant-connection/
// 原文地址：https://xxoo521.com/2020-02-28-redundant-connection/
class UnionFind {
    constructor() {
        this.parent = new Map()
    }
    
    // 查找元素所在集合 
    find(x) {
        while (this.parent.has(x)) {
            x = this.parent.get(x)
        }
        return x
    }

    // 合并两个集合
    union(p, q) {
        const rootP = this.find(p)
        const rootQ = this.find(q)
        if (rootP !== rootQ) {
            this.parent.set(
                this.find(p),
                this.find(q)
            )
        }
    }
}

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const uf = new UnionFind()

    for (const edge of edges) {
        const p = edge[0]
        const q = edge[1]
        if (uf.find(p) === uf.find(q)) {
            return [p, q]
        }
        uf.union(p, q)
    }
    return [-1, -1]
};