export const QUEUE_PROBLEMS_PART2 = {
  // --- QUEUE CONCEPTS & PATTERNS ---
  'Queue Front': {
    javascript: `let queue = [10, 20, 30];
console.log("Front element is:", queue[0]);`,
    python: `queue = [10, 20, 30]
print("Front element is:", queue[0])`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>(Arrays.asList(10, 20, 30));
        System.out.println("Front element is: " + q.peek());
    }
}`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    queue<int> q; q.push(10); q.push(20); q.push(30);
    cout << "Front element is: " << q.front() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int q[100] = {10, 20, 30}, front = 0, rear = 3;
int main() { printf("Front element is: %d\\n", q[front]); return 0; }`
  },
  'Simple Queue': {
    javascript: `class SimpleQueue {
    constructor() { this.items = []; }
    enqueue(val) { this.items.push(val); }
    dequeue() { return this.items.shift(); }
    front() { return this.items[0]; }
}
let q = new SimpleQueue(); q.enqueue(1); q.enqueue(2);
console.log(q.dequeue());`,
    python: `class SimpleQueue:
    def __init__(self): self.items = []
    def enqueue(self, val): self.items.append(val)
    def dequeue(self): return self.items.pop(0)
    def front(self): return self.items[0]
q = SimpleQueue(); q.enqueue(1); q.enqueue(2)
print(q.dequeue())`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.add(1); q.add(2);
        System.out.println(q.poll());
    }
}`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    queue<int> q; q.push(1); q.push(2);
    cout << q.front() << endl; q.pop();
    return 0;
}`,
    c: `#include <stdio.h>
int q[100], f = 0, r = 0;
void enqueue(int x) { q[r++] = x; }
int dequeue() { return q[f++]; }
int main() { enqueue(1); enqueue(2); printf("%d\\n", dequeue()); return 0; }`
  },
  'Circular Queue': {
    javascript: `// See 02. Implement Circular Queue
console.log("Circular Queue connects the rear to the front to save space.");`,
    python: `print("Circular Queue connects the rear to the front.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Circular Queue."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Circular Queue." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Circular Queue.\\n"); return 0; }`
  },
  'Priority Queue': {
    javascript: `// Priority Queue Concept
console.log("Priority Queue orders elements by priority (usually a Heap).");`,
    python: `print("Priority Queue uses heapq in Python.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("PriorityQueue class in Java."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "priority_queue in C++." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Priority Queue requires custom Heap.\\n"); return 0; }`
  },

  // --- MISSING TOP 15 QUEUE PROBLEMS ---
  '02. Implement Circular Queue': {
    javascript: `class CircularQueue {
    constructor(k) { this.q = new Array(k); this.k = k; this.head = -1; this.tail = -1; }
    enQueue(value) {
        if(this.isFull()) return false;
        if(this.isEmpty()) this.head = 0;
        this.tail = (this.tail + 1) % this.k;
        this.q[this.tail] = value; return true;
    }
    deQueue() {
        if(this.isEmpty()) return false;
        if(this.head === this.tail) { this.head = -1; this.tail = -1; }
        else this.head = (this.head + 1) % this.k;
        return true;
    }
    Front() { return this.isEmpty() ? -1 : this.q[this.head]; }
    Rear() { return this.isEmpty() ? -1 : this.q[this.tail]; }
    isEmpty() { return this.head === -1; }
    isFull() { return (this.tail + 1) % this.k === this.head; }
}
let cq = new CircularQueue(3); cq.enQueue(1); cq.enQueue(2); cq.enQueue(3);
console.log(cq.isFull()); cq.deQueue(); cq.enQueue(4);
console.log(cq.Rear());`,
    python: `class CircularQueue:
    def __init__(self, k: int):
        self.q = [0] * k; self.k = k; self.head = -1; self.tail = -1
    def enQueue(self, value: int) -> bool:
        if self.isFull(): return False
        if self.isEmpty(): self.head = 0
        self.tail = (self.tail + 1) % self.k
        self.q[self.tail] = value; return True
    def deQueue(self) -> bool:
        if self.isEmpty(): return False
        if self.head == self.tail: self.head = self.tail = -1
        else: self.head = (self.head + 1) % self.k
        return True
    def Front(self) -> int: return -1 if self.isEmpty() else self.q[self.head]
    def Rear(self) -> int: return -1 if self.isEmpty() else self.q[self.tail]
    def isEmpty(self) -> bool: return self.head == -1
    def isFull(self) -> bool: return (self.tail + 1) % self.k == self.head
cq = CircularQueue(3); cq.enQueue(1); cq.enQueue(2); cq.enQueue(3)
print(cq.isFull()); cq.deQueue(); cq.enQueue(4); print(cq.Rear())`,
    java: `public class YourClassName {
    static class CircularQueue {
        int[] q; int head = -1, tail = -1, k;
        CircularQueue(int k) { this.k = k; q = new int[k]; }
        boolean enQueue(int value) {
            if(isFull()) return false;
            if(isEmpty()) head = 0;
            tail = (tail + 1) % k; q[tail] = value; return true;
        }
        boolean deQueue() {
            if(isEmpty()) return false;
            if(head == tail) { head = -1; tail = -1; }
            else head = (head + 1) % k;
            return true;
        }
        int Front() { return isEmpty() ? -1 : q[head]; }
        int Rear() { return isEmpty() ? -1 : q[tail]; }
        boolean isEmpty() { return head == -1; }
        boolean isFull() { return (tail + 1) % k == head; }
    }
    public static void main(String[] args) {
        CircularQueue cq = new CircularQueue(3); cq.enQueue(1); cq.enQueue(2); cq.enQueue(3);
        System.out.println(cq.isFull()); cq.deQueue(); cq.enQueue(4); System.out.println(cq.Rear());
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
class CircularQueue {
    vector<int> q; int head, tail, k;
public:
    CircularQueue(int k) : q(k), k(k), head(-1), tail(-1) {}
    bool enQueue(int value) {
        if(isFull()) return false;
        if(isEmpty()) head = 0;
        tail = (tail + 1) % k; q[tail] = value; return true;
    }
    bool deQueue() {
        if(isEmpty()) return false;
        if(head == tail) { head = -1; tail = -1; }
        else head = (head + 1) % k;
        return true;
    }
    int Front() { return isEmpty() ? -1 : q[head]; }
    int Rear() { return isEmpty() ? -1 : q[tail]; }
    bool isEmpty() { return head == -1; }
    bool isFull() { return (tail + 1) % k == head; }
};
int main() {
    CircularQueue cq(3); cq.enQueue(1); cq.enQueue(2); cq.enQueue(3);
    cout << cq.isFull() << endl; cq.deQueue(); cq.enQueue(4); cout << cq.Rear() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdbool.h>
int q[3], head = -1, tail = -1, k = 3;
bool isEmpty() { return head == -1; }
bool isFull() { return (tail + 1) % k == head; }
bool enQueue(int value) {
    if(isFull()) return false;
    if(isEmpty()) head = 0;
    tail = (tail + 1) % k; q[tail] = value; return true;
}
bool deQueue() {
    if(isEmpty()) return false;
    if(head == tail) { head = -1; tail = -1; }
    else head = (head + 1) % k;
    return true;
}
int Rear() { return isEmpty() ? -1 : q[tail]; }
int main() {
    enQueue(1); enQueue(2); enQueue(3);
    printf("%d\\n", isFull()); deQueue(); enQueue(4); printf("%d\\n", Rear());
    return 0;
}`
  },
  '03. Queue with Stacks': {
    javascript: `// Same as Pattern: Two Stack Trick\nconsole.log("See Pattern: Two Stack Trick.");`,
    python: `print("See Pattern: Two Stack Trick.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("See Two Stack Trick."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "See Two Stack Trick." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("See Two Stack Trick.\\n"); return 0; }`
  },
  '05. First Non Repeating': {
    javascript: `function firstNonRepeating(s) {
    let q = [], map = {};
    for(let c of s) {
        map[c] = (map[c]||0) + 1;
        q.push(c);
        while(q.length && map[q[0]] > 1) q.shift();
    }
    return q.length ? q[0] : '#';
}
console.log(firstNonRepeating("aabc"));`,
    python: `def first_non_repeating(s):
    q, count = [], {}
    for c in s:
        count[c] = count.get(c, 0) + 1
        q.append(c)
        while q and count[q[0]] > 1: q.pop(0)
    return q[0] if q else '#'
print(first_non_repeating("aabc"))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        String s = "aabc";
        Queue<Character> q = new LinkedList<>();
        int[] freq = new int[256];
        for(char c : s.toCharArray()) {
            freq[c]++; q.add(c);
            while(!q.isEmpty() && freq[q.peek()] > 1) q.poll();
        }
        System.out.println(q.isEmpty() ? '#' : q.peek());
    }
}`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    string s = "aabc"; queue<char> q; int freq[256] = {0};
    for(char c : s) {
        freq[c]++; q.push(c);
        while(!q.empty() && freq[q.front()] > 1) q.pop();
    }
    cout << (q.empty() ? '#' : q.front()) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    char s[] = "aabc", q[100]; int freq[256]={0}, f=0, r=0;
    for(int i=0; s[i]; i++) {
        freq[s[i]]++; q[r++] = s[i];
        while(f < r && freq[q[f]] > 1) f++;
    }
    printf("%c\\n", f < r ? q[f] : '#'); return 0;
}`
  },
  '06. BFS Tree Traversal': {
    javascript: `// BFS uses a Queue\nconsole.log("Breadth-First Search uses a Queue to traverse level by level.");`,
    python: `print("BFS uses a Queue.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("BFS uses a Queue."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "BFS uses a Queue." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("BFS uses a Queue.\\n"); return 0; }`
  },
  '07. Generate Binary Numbers': {
    javascript: `function generateBinary(n) {
    let q = ["1"], res = [];
    while(n--) {
        let s = q.shift(); res.push(s);
        q.push(s + "0"); q.push(s + "1");
    }
    return res;
}
console.log(generateBinary(5));`,
    python: `def generate_binary(n):
    q, res = ["1"], []
    for _ in range(n):
        s = q.pop(0); res.append(s)
        q.append(s + "0"); q.append(s + "1")
    return res
print(generate_binary(5))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int n = 5; Queue<String> q = new LinkedList<>(); q.add("1");
        while(n-- > 0) {
            String s = q.poll(); System.out.print(s + " ");
            q.add(s + "0"); q.add(s + "1");
        }
    }
}`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    int n = 5; queue<string> q; q.push("1");
    while(n--) {
        string s = q.front(); q.pop(); cout << s << " ";
        q.push(s + "0"); q.push(s + "1");
    }
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Generate Binary Numbers uses a Queue of Strings.\\n"); return 0; }`
  },
  '08. Interleave Halves': {
    javascript: `function interleave(q) {
    let half = q.length / 2, stack = [];
    for(let i=0; i<half; i++) stack.push(q.shift());
    while(stack.length) q.push(stack.pop());
    for(let i=0; i<half; i++) q.push(q.shift());
    for(let i=0; i<half; i++) stack.push(q.shift());
    while(stack.length) { q.push(stack.pop()); q.push(q.shift()); }
    return q;
}
console.log(interleave([1,2,3,4,5,6]));`,
    python: `def interleave(q):
    half, stack = len(q) // 2, []
    for _ in range(half): stack.append(q.pop(0))
    while stack: q.append(stack.pop())
    for _ in range(half): q.append(q.pop(0))
    for _ in range(half): stack.append(q.pop(0))
    while stack: q.append(stack.pop()); q.append(q.pop(0))
    return q
print(interleave([1,2,3,4,5,6]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>(Arrays.asList(1,2,3,4,5,6));
        int half = q.size() / 2; Stack<Integer> s = new Stack<>();
        for(int i=0; i<half; i++) s.push(q.poll());
        while(!s.isEmpty()) q.add(s.pop());
        for(int i=0; i<half; i++) q.add(q.poll());
        for(int i=0; i<half; i++) s.push(q.poll());
        while(!s.isEmpty()) { q.add(s.pop()); q.add(q.poll()); }
        System.out.println(q);
    }
}`,
    cpp: `#include <iostream>
#include <queue>
#include <stack>
using namespace std;
int main() {
    queue<int> q; for(int x:{1,2,3,4,5,6}) q.push(x);
    int half = q.size()/2; stack<int> s;
    for(int i=0; i<half; i++) { s.push(q.front()); q.pop(); }
    while(!s.empty()) { q.push(s.top()); s.pop(); }
    for(int i=0; i<half; i++) { q.push(q.front()); q.pop(); }
    for(int i=0; i<half; i++) { s.push(q.front()); q.pop(); }
    while(!s.empty()) { q.push(s.top()); s.pop(); q.push(q.front()); q.pop(); }
    while(!q.empty()) { cout << q.front() << " "; q.pop(); }
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Interleave Queue requires a Stack.\\n"); return 0; }`
  },
  '09. Sliding Window Max': {
    javascript: `function maxSlidingWindow(nums, k) {
    let dq = [], res = [];
    for(let i=0; i<nums.length; i++) {
        if(dq.length && dq[0] === i - k) dq.shift();
        while(dq.length && nums[dq[dq.length-1]] < nums[i]) dq.pop();
        dq.push(i);
        if(i >= k - 1) res.push(nums[dq[0]]);
    }
    return res;
}
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));`,
    python: `def max_sliding_window(nums, k):
    from collections import deque
    dq, res = deque(), []
    for i, num in enumerate(nums):
        if dq and dq[0] == i - k: dq.popleft()
        while dq and nums[dq[-1]] < num: dq.pop()
        dq.append(i)
        if i >= k - 1: res.append(nums[dq[0]])
    return res
print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {1,3,-1,-3,5,3,6,7}; int k = 3;
        Deque<Integer> dq = new ArrayDeque<>(); List<Integer> res = new ArrayList<>();
        for(int i=0; i<nums.length; i++) {
            if(!dq.isEmpty() && dq.peekFirst() == i - k) dq.pollFirst();
            while(!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
            dq.offerLast(i);
            if(i >= k - 1) res.add(nums[dq.peekFirst()]);
        }
        System.out.println(res);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;
int main() {
    vector<int> nums = {1,3,-1,-3,5,3,6,7}; int k = 3;
    deque<int> dq; vector<int> res;
    for(int i=0; i<nums.size(); i++) {
        if(!dq.empty() && dq.front() == i - k) dq.pop_front();
        while(!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if(i >= k - 1) res.push_back(nums[dq.front()]);
    }
    for(int x : res) cout << x << " "; cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Sliding Window Max uses a Deque.\\n"); return 0; }`
  },
  '10. Rotting Oranges': {
    javascript: `// Rotting Oranges (BFS on Grid)
console.log("Rotting Oranges uses multi-source BFS in a queue.");`,
    python: `print("Rotting Oranges uses BFS in a queue.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Rotting Oranges uses BFS."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Rotting Oranges uses BFS." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Rotting Oranges uses BFS.\\n"); return 0; }`
  },
  '11. Shortest Path in Maze': {
    javascript: `// Shortest Path (BFS on Grid)
console.log("Shortest path in unweighted maze is purely BFS with a Queue.");`,
    python: `print("Shortest path uses BFS.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Shortest path uses BFS."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Shortest path uses BFS." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Shortest path uses BFS.\\n"); return 0; }`
  },
  '12. Recent Calls': {
    javascript: `class RecentCounter {
    constructor() { this.q = []; }
    ping(t) {
        this.q.push(t);
        while(this.q[0] < t - 3000) this.q.shift();
        return this.q.length;
    }
}
let rc = new RecentCounter();
console.log(rc.ping(1), rc.ping(100), rc.ping(3001), rc.ping(3002));`,
    python: `class RecentCounter:
    def __init__(self): self.q = []
    def ping(self, t: int) -> int:
        self.q.append(t)
        while self.q[0] < t - 3000: self.q.pop(0)
        return len(self.q)
rc = RecentCounter()
print(rc.ping(1), rc.ping(100), rc.ping(3001), rc.ping(3002))`,
    java: `import java.util.*;
public class YourClassName {
    static class RecentCounter {
        Queue<Integer> q = new LinkedList<>();
        int ping(int t) {
            q.add(t);
            while(q.peek() < t - 3000) q.poll();
            return q.size();
        }
    }
    public static void main(String[] args) {
        RecentCounter rc = new RecentCounter();
        System.out.println(rc.ping(1) + " " + rc.ping(100) + " " + rc.ping(3001) + " " + rc.ping(3002));
    }
}`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;
class RecentCounter {
    queue<int> q;
public:
    int ping(int t) {
        q.push(t);
        while(q.front() < t - 3000) q.pop();
        return q.size();
    }
};
int main() {
    RecentCounter rc; cout << rc.ping(1) << " " << rc.ping(100) << " " << rc.ping(3001) << " " << rc.ping(3002) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int q[10000], f = 0, r = 0;
int ping(int t) {
    q[r++] = t;
    while(q[f] < t - 3000) f++;
    return r - f;
}
int main() { printf("%d %d %d %d\\n", ping(1), ping(100), ping(3001), ping(3002)); return 0; }`
  },
  '13. Task Scheduler': {
    javascript: `// Task Scheduler (LeetCode 621)
console.log("Task Scheduler uses Max Heap and Queue or Greedy array filling.");`,
    python: `print("Task Scheduler uses Max Heap and Queue.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Task Scheduler."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Task Scheduler." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Task Scheduler.\\n"); return 0; }`
  }
};
