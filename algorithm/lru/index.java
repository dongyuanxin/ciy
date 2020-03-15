// 漫画：什么是LRU算法？ - 小灰的文章 - 知乎
// https://zhuanlan.zhihu.com/p/52196637

// 使用了哈希链表
//  哈希的key-value是 string-node。方便在O(1)时间内读取
//  其中node数据结构是有next和prev指针，从而连成链表
// 而能提速的关键点是：链表的前后顺序代表着被访问的时间顺讯。
//  对于不经常访问的缓存，会被移除。而经常访问的就会保存在内存中。从而达到「高速缓存」的目的。

public class LRUCache {

    private Node head;

    private Node end;
    //缓存存储上限
    private int limit;

    private HashMap<String, Node> hashMap;

    public LRUCache(int limit) {
        this.limit = limit;
        hashMap = new HashMap<String, Node>();
    }

    public String get(String key) {
        Node node = hashMap.get(key);
        if (node == null){
            return null;
        }    
        refreshNode(node);
        return node.value;
    }

    public void put(String key, String value) {
        Node node = hashMap.get(key);
        if (node == null) {
            //如果key不存在，插入key-value
            if (hashMap.size() >= limit) {
                String oldKey = removeNode(head);
                hashMap.remove(oldKey);
            }   
            node = new Node(key, value);
            addNode(node);
            hashMap.put(key, node);
        }else {//如果key存在，刷新key-value        
            node.value = value;
            refreshNode(node);
        }
    }

    public void remove(String key) {
        Node node = hashMap.get(key);
        removeNode(node);
        hashMap.remove(key);
    }

    /** 
     * 刷新被访问的节点位置 
     * @param  node 被访问的节点 
     */
    private void refreshNode(Node node) {//如果访问的是尾节点，无需移动节点
        if (node == end) {
            return;
        }//移除节点    
        removeNode(node);
        //重新插入节点    
        addNode(node);
    }

    /** 
     * 删除节点 
     * @param  node 要删除的节点 
     */ 
    private String removeNode(Node node) {
        if (node == end) {
            //移除尾节点
            end = end.pre;
        }else if(node == head){
            //移除头节点        
            head = head.next;
        } else {
            //移除中间节点        
            node.pre.next = node.next;
            node.next.pre = node.pre;
        }
        return node.key;
    }

    /** 
     * 尾部插入节点 
     * @param  node 要插入的节点 
     */
    private void addNode(Node node) {
        if(end != null) {
            end.next = node;
            node.pre = end;
            node.next = null;
        }
        end = node;
        if(head == null){        
            head = node;
        }
    }

    class Node {
        Node(String key, String value){
            this.key = key;
            this.value = value;
        }
        public Node pre;
        public Node next;
        public String key;
        public String value;
    }

    public static void main(String[] args) {
        LRUCache lruCache = new LRUCache(5);
        lruCache.put("001", "用户1信息");
        lruCache.put("002", "用户1信息");
        lruCache.put("003", "用户1信息");
        lruCache.put("004", "用户1信息");
        lruCache.put("005", "用户1信息");
        lruCache.get("002");
        lruCache.put("004", "用户2信息更新");
        lruCache.put("006", "用户6信息");
        System.out.println(lruCache.get("001"));
        System.out.println(lruCache.get("006"));
    }
}