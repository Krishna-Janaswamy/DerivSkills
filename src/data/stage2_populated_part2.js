export const STAGE2_POPULATED_PART2 = {
  // --- LINKED LIST ---
  '09. Merge Sorted Lists': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function mergeLists(l1, l2) {
    let dummy = new Node(0), curr = dummy;
    while(l1 && l2) {
        if(l1.data < l2.data) { curr.next = l1; l1 = l1.next; }
        else { curr.next = l2; l2 = l2.next; }
        curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
}
let l1=new Node(1); l1.next=new Node(3);
let l2=new Node(2); l2.next=new Node(4);
let res = mergeLists(l1, l2);
console.log(res.data, res.next.data, res.next.next.data, res.next.next.next.data);`,
    python: `class Node:
    def __init__(self, d): self.data=d; self.next=None
def merge_lists(l1, l2):
    dummy = curr = Node(0)
    while l1 and l2:
        if l1.data < l2.data: curr.next, l1 = l1, l1.next
        else: curr.next, l2 = l2, l2.next
        curr = curr.next
    curr.next = l1 or l2
    return dummy.next
l1=Node(1); l1.next=Node(3); l2=Node(2); l2.next=Node(4)
res = merge_lists(l1, l2)
print(res.data, res.next.data, res.next.next.data, res.next.next.next.data)`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data=d; } }
    static Node mergeLists(Node l1, Node l2) {
        Node dummy = new Node(0), curr = dummy;
        while(l1 != null && l2 != null) {
            if(l1.data < l2.data) { curr.next = l1; l1 = l1.next; }
            else { curr.next = l2; l2 = l2.next; }
            curr = curr.next;
        }
        curr.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
    public static void main(String[] args) {
        Node l1 = new Node(1); l1.next = new Node(3);
        Node l2 = new Node(2); l2.next = new Node(4);
        Node res = mergeLists(l1, l2);
        System.out.println(res.data + " " + res.next.data + " " + res.next.next.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d) { data=d; next=nullptr; } };
Node* mergeLists(Node* l1, Node* l2) {
    Node dummy(0), *curr = &dummy;
    while(l1 && l2) {
        if(l1->data < l2->data) { curr->next = l1; l1 = l1->next; }
        else { curr->next = l2; l2 = l2->next; }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;
    return dummy.next;
}
int main() {
    Node* l1 = new Node(1); l1->next = new Node(3);
    Node* l2 = new Node(2); l2->next = new Node(4);
    Node* res = mergeLists(l1, l2);
    cout << res->data << " " << res->next->data << " " << res->next->next->data << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* newNode(int d) { struct Node* n = malloc(sizeof(struct Node)); n->data=d; n->next=NULL; return n; }
struct Node* mergeLists(struct Node* l1, struct Node* l2) {
    struct Node dummy, *curr = &dummy; dummy.next = NULL;
    while(l1 && l2) {
        if(l1->data < l2->data) { curr->next = l1; l1 = l1->next; }
        else { curr->next = l2; l2 = l2->next; }
        curr = curr->next;
    }
    curr->next = l1 ? l1 : l2;
    return dummy.next;
}
int main() {
    struct Node *l1 = newNode(1); l1->next = newNode(3);
    struct Node *l2 = newNode(2); l2->next = newNode(4);
    struct Node *res = mergeLists(l1, l2);
    printf("%d %d %d\\n", res->data, res->next->data, res->next->next->data);
    return 0;
}`
  },
  '10. Remove Nth from End': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function removeNthFromEnd(head, n) {
    let dummy = new Node(0); dummy.next = head;
    let slow = dummy, fast = dummy;
    for(let i=0; i<=n; i++) fast = fast.next;
    while(fast) { slow = slow.next; fast = fast.next; }
    slow.next = slow.next.next;
    return dummy.next;
}
let head=new Node(1); head.next=new Node(2); head.next.next=new Node(3);
head = removeNthFromEnd(head, 2);
console.log(head.data, head.next.data);`,
    python: `class Node:
    def __init__(self, d): self.data=d; self.next=None
def remove_nth_from_end(head, n):
    dummy = Node(0); dummy.next = head
    slow = fast = dummy
    for _ in range(n + 1): fast = fast.next
    while fast: slow, fast = slow.next, fast.next
    slow.next = slow.next.next
    return dummy.next
head=Node(1); head.next=Node(2); head.next.next=Node(3)
head = remove_nth_from_end(head, 2)
print(head.data, head.next.data)`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data=d; } }
    static Node removeNthFromEnd(Node head, int n) {
        Node dummy = new Node(0); dummy.next = head;
        Node slow = dummy, fast = dummy;
        for(int i=0; i<=n; i++) fast = fast.next;
        while(fast != null) { slow = slow.next; fast = fast.next; }
        slow.next = slow.next.next;
        return dummy.next;
    }
    public static void main(String[] args) {
        Node h = new Node(1); h.next = new Node(2); h.next.next = new Node(3);
        h = removeNthFromEnd(h, 2);
        System.out.println(h.data + " " + h.next.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d) { data=d; next=nullptr; } };
Node* removeNthFromEnd(Node* head, int n) {
    Node dummy(0); dummy.next = head;
    Node *slow = &dummy, *fast = &dummy;
    for(int i=0; i<=n; i++) fast = fast->next;
    while(fast) { slow = slow->next; fast = fast->next; }
    slow->next = slow->next->next;
    return dummy.next;
}
int main() {
    Node* h = new Node(1); h->next = new Node(2); h->next->next = new Node(3);
    h = removeNthFromEnd(h, 2);
    cout << h->data << " " << h->next->data << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* newNode(int d) { struct Node* n = malloc(sizeof(struct Node)); n->data=d; n->next=NULL; return n; }
struct Node* removeNthFromEnd(struct Node* head, int n) {
    struct Node dummy; dummy.next = head;
    struct Node *slow = &dummy, *fast = &dummy;
    for(int i=0; i<=n; i++) fast = fast->next;
    while(fast) { slow = slow->next; fast = fast->next; }
    slow->next = slow->next->next;
    return dummy.next;
}
int main() {
    struct Node* h = newNode(1); h->next = newNode(2); h->next->next = newNode(3);
    h = removeNthFromEnd(h, 2);
    printf("%d %d\\n", h->data, h->next->data);
    return 0;
}`
  },

  // --- STACKS ---
  '07. Min Stack': {
    javascript: `class MinStack {
    constructor() { this.stack = []; this.minStack = []; }
    push(val) {
        this.stack.push(val);
        if(!this.minStack.length || val <= this.minStack[this.minStack.length-1]) this.minStack.push(val);
    }
    pop() {
        if(this.stack.pop() === this.minStack[this.minStack.length-1]) this.minStack.pop();
    }
    getMin() { return this.minStack[this.minStack.length-1]; }
}
let minStack = new MinStack();
minStack.push(-2); minStack.push(0); minStack.push(-3);
console.log("Min:", minStack.getMin()); minStack.pop(); console.log("Min:", minStack.getMin());`,
    python: `class MinStack:
    def __init__(self): self.stack, self.min_stack = [], []
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]: self.min_stack.append(val)
    def pop(self):
        if self.stack.pop() == self.min_stack[-1]: self.min_stack.pop()
    def get_min(self): return self.min_stack[-1]
min_stack = MinStack()
min_stack.push(-2); min_stack.push(0); min_stack.push(-3)
print("Min:", min_stack.get_min()); min_stack.pop(); print("Min:", min_stack.get_min())`,
    java: `import java.util.Stack;
public class YourClassName {
    static class MinStack {
        Stack<Integer> s = new Stack<>(), m = new Stack<>();
        void push(int val) { s.push(val); if(m.isEmpty() || val <= m.peek()) m.push(val); }
        void pop() { if(s.pop().equals(m.peek())) m.pop(); }
        int getMin() { return m.peek(); }
    }
    public static void main(String[] args) {
        MinStack ms = new MinStack();
        ms.push(-2); ms.push(0); ms.push(-3);
        System.out.println("Min: " + ms.getMin()); ms.pop(); System.out.println("Min: " + ms.getMin());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
class MinStack {
    stack<int> s, m;
public:
    void push(int val) { s.push(val); if(m.empty() || val <= m.top()) m.push(val); }
    void pop() { if(s.top() == m.top()) m.pop(); s.pop(); }
    int getMin() { return m.top(); }
};
int main() {
    MinStack ms; ms.push(-2); ms.push(0); ms.push(-3);
    cout << "Min: " << ms.getMin() << endl; ms.pop(); cout << "Min: " << ms.getMin() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#define MAX 100
int stack[MAX], min_stack[MAX], top = -1, min_top = -1;
void push(int val) {
    stack[++top] = val;
    if(min_top == -1 || val <= min_stack[min_top]) min_stack[++min_top] = val;
}
void pop() { if(stack[top--] == min_stack[min_top]) min_top--; }
int getMin() { return min_stack[min_top]; }
int main() {
    push(-2); push(0); push(-3);
    printf("Min: %d\\n", getMin()); pop(); printf("Min: %d\\n", getMin());
    return 0;
}`
  },

  // --- QUEUES ---
  '03. Queue with Stacks': {
    javascript: `class QueueUsingStacks {
    constructor() { this.s1 = []; this.s2 = []; }
    enqueue(x) { this.s1.push(x); }
    dequeue() {
        if(!this.s2.length) while(this.s1.length) this.s2.push(this.s1.pop());
        return this.s2.pop();
    }
}
let q = new QueueUsingStacks(); q.enqueue(1); q.enqueue(2);
console.log("Dequeued:", q.dequeue(), q.dequeue());`,
    python: `class QueueUsingStacks:
    def __init__(self): self.s1, self.s2 = [], []
    def enqueue(self, x): self.s1.append(x)
    def dequeue(self):
        if not self.s2:
            while self.s1: self.s2.append(self.s1.pop())
        return self.s2.pop()
q = QueueUsingStacks(); q.enqueue(1); q.enqueue(2)
print("Dequeued:", q.dequeue(), q.dequeue())`,
    java: `import java.util.Stack;
public class YourClassName {
    static class QueueUsingStacks {
        Stack<Integer> s1 = new Stack<>(), s2 = new Stack<>();
        void enqueue(int x) { s1.push(x); }
        int dequeue() {
            if(s2.isEmpty()) while(!s1.isEmpty()) s2.push(s1.pop());
            return s2.pop();
        }
    }
    public static void main(String[] args) {
        QueueUsingStacks q = new QueueUsingStacks(); q.enqueue(1); q.enqueue(2);
        System.out.println("Dequeued: " + q.dequeue() + " " + q.dequeue());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
class QueueUsingStacks {
    stack<int> s1, s2;
public:
    void enqueue(int x) { s1.push(x); }
    int dequeue() {
        if(s2.empty()) { while(!s1.empty()) { s2.push(s1.top()); s1.pop(); } }
        int val = s2.top(); s2.pop(); return val;
    }
};
int main() {
    QueueUsingStacks q; q.enqueue(1); q.enqueue(2);
    cout << "Dequeued: " << q.dequeue() << " " << q.dequeue() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int s1[100], s2[100], top1=-1, top2=-1;
void enqueue(int x) { s1[++top1] = x; }
int dequeue() {
    if(top2 == -1) while(top1 >= 0) s2[++top2] = s1[top1--];
    return s2[top2--];
}
int main() {
    enqueue(1); enqueue(2);
    printf("Dequeued: %d %d\\n", dequeue(), dequeue());
    return 0;
}`
  },

  // --- HASHING ---
  '01. Count Frequency': {
    javascript: `function countFreq(arr) {
    let map = new Map();
    for(let x of arr) map.set(x, (map.get(x) || 0) + 1);
    for(let [k, v] of map) console.log(k + " -> " + v);
}
countFreq([1, 1, 2, 3, 3, 3]);`,
    python: `def count_freq(arr):
    freq = {}
    for x in arr: freq[x] = freq.get(x, 0) + 1
    for k, v in freq.items(): print(f"{k} -> {v}")
count_freq([1, 1, 2, 3, 3, 3])`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1, 1, 2, 3, 3, 3};
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int x : arr) map.put(x, map.getOrDefault(x, 0) + 1);
        for(Map.Entry<Integer, Integer> e : map.entrySet()) {
            System.out.println(e.getKey() + " -> " + e.getValue());
        }
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    vector<int> arr = {1, 1, 2, 3, 3, 3};
    unordered_map<int, int> map;
    for(int x : arr) map[x]++;
    for(auto p : map) cout << p.first << " -> " << p.second << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {1, 1, 2, 3, 3, 3}, freq[10] = {0};
    for(int i=0; i<6; i++) freq[arr[i]]++;
    for(int i=0; i<10; i++) if(freq[i]) printf("%d -> %d\\n", i, freq[i]);
    return 0;
}`
  }
};
