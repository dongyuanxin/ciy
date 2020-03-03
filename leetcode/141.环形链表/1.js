// ac地址：https://leetcode-cn.com/problems/linked-list-cycle/

// Floyd判圈算法（龟兔赛跑）
// 用来判断链标中是否有环
// slow 每次移动1步，fast 每次移动2步。若存在环，则必定会相遇
// 否则，则会抵达边界
// https://blog.csdn.net/qq_35056292/article/details/80331053

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slow = head
    let fast = head
    
    while (slow && fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if(slow === fast) return true 
    }
    return false
};