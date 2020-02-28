// 并查集
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
        this.parent.set(
            this.find(p),
            this.find(q)
        )
    }
}

module.exports.UnionFind = UnionFind