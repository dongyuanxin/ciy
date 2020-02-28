// 方法1: 使用「并查集」
// ac地址：https://leetcode-cn.com/problems/accounts-merge/
// 因为存在同名不同人的情况，不要使用map直接hash
// email才是标识一个人身份的标记

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

const cmp = (x, y) => {
    if (x < y) return -1
    if (x > y) return 1
    return 0
}

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    const uf = new UnionFind();
    const map = {};// email => name

    // 步骤1:将属于同一集合的email进行“连线”
    for (const account of accounts) {
        for (let i = 1; i < account.length; ++i) {
            map[account[i]] = account[0];
            if (i < account.length - 1) {
                uf.union(account[i], account[i + 1]);
            }
        }
    }
    // 步骤2:遍历所有的mail，将各个集合的元素放在对应集合中
    const sets = {}; // key: string; value: string[]
    for (const email in map) {
        const root = uf.find(email)
        if (!sets[root]) {
            sets[root] = []
        }
        sets[root].push(email)
    }

    const res = []
    for (const root in sets) {
        sets[root].sort(cmp)
        res.push([map[root], ...sets[root]])
    }
    return res
};
