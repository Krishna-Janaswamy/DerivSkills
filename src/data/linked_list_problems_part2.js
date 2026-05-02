export const LINKED_LIST_PROBLEMS_PART2 = {
  '02. Delete by Value': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function deleteByValue(head, val) {
    let dummy = new Node(0); dummy.next = head; let curr = dummy;
    while(curr.next) { if(curr.next.data === val) curr.next = curr.next.next; else curr = curr.next; }
    return dummy.next;
}
let h = new Node(1); h.next = new Node(2); h.next.next = new Node(3);
h = deleteByValue(h, 2);
console.log(h.data, "->", h.next.data);`,
    python: `class Node:
    def __init__(self, d): self.data, self.next = d, None
def delete_by_value(head, val):
    dummy = Node(0); dummy.next = head; curr = dummy
    while curr.next:
        if curr.next.data == val: curr.next = curr.next.next
        else: curr = curr.next
    return dummy.next
h = Node(1); h.next = Node(2); h.next.next = Node(3)
h = delete_by_value(h, 2)
print(f"{h.data} -> {h.next.data}")`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data = d; } }
    static Node deleteByValue(Node head, int val) {
        Node dummy = new Node(0); dummy.next = head; Node curr = dummy;
        while(curr.next != null) { if(curr.next.data == val) curr.next = curr.next.next; else curr = curr.next; }
        return dummy.next;
    }
    public static void main(String[] args) {
        Node h = new Node(1); h.next = new Node(2); h.next.next = new Node(3);
        h = deleteByValue(h, 2);
        System.out.println(h.data + " -> " + h.next.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d){data=d;next=nullptr;} };
Node* deleteByValue(Node* head, int val) {
    Node dummy(0); dummy.next = head; Node* curr = &dummy;
    while(curr->next) { if(curr->next->data==val) curr->next=curr->next->next; else curr=curr->next; }
    return dummy.next;
}
int main() {
    Node* h = new Node(1); h->next = new Node(2); h->next->next = new Node(3);
    h = deleteByValue(h, 2);
    cout << h->data << " -> " << h->next->data << endl; return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* newNode(int d) { struct Node* n=malloc(sizeof(struct Node)); n->data=d; n->next=NULL; return n; }
int main() {
    struct Node* h = newNode(1); h->next = newNode(2); h->next->next = newNode(3);
    struct Node dummy, *curr = &dummy; dummy.next = h;
    while(curr->next) { if(curr->next->data==2) curr->next=curr->next->next; else curr=curr->next; }
    printf("%d -> %d\\n", dummy.next->data, dummy.next->next->data); return 0;
}`
  },
  '04. Reverse Recursive': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function reverseRec(head) {
    if(!head || !head.next) return head;
    let rest = reverseRec(head.next);
    head.next.next = head; head.next = null;
    return rest;
}
let h = new Node(1); h.next = new Node(2); h.next.next = new Node(3);
h = reverseRec(h);
console.log(h.data, "->", h.next.data, "->", h.next.next.data);`,
    python: `class Node:
    def __init__(self, d): self.data, self.next = d, None
def reverse_rec(head):
    if not head or not head.next: return head
    rest = reverse_rec(head.next)
    head.next.next = head; head.next = None
    return rest
h = Node(1); h.next = Node(2); h.next.next = Node(3)
h = reverse_rec(h)
print(f"{h.data} -> {h.next.data} -> {h.next.next.data}")`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data = d; } }
    static Node reverseRec(Node head) {
        if(head == null || head.next == null) return head;
        Node rest = reverseRec(head.next);
        head.next.next = head; head.next = null;
        return rest;
    }
    public static void main(String[] args) {
        Node h = new Node(1); h.next = new Node(2); h.next.next = new Node(3);
        h = reverseRec(h);
        System.out.println(h.data + " -> " + h.next.data + " -> " + h.next.next.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d){data=d;next=nullptr;} };
Node* reverseRec(Node* head) {
    if(!head || !head->next) return head;
    Node* rest = reverseRec(head->next);
    head->next->next = head; head->next = nullptr;
    return rest;
}
int main() {
    Node* h = new Node(1); h->next = new Node(2); h->next->next = new Node(3);
    h = reverseRec(h);
    cout << h->data << " -> " << h->next->data << " -> " << h->next->next->data << endl; return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* newNode(int d) { struct Node* n=malloc(sizeof(struct Node)); n->data=d; n->next=NULL; return n; }
struct Node* reverseRec(struct Node* h) {
    if(!h || !h->next) return h;
    struct Node* rest = reverseRec(h->next);
    h->next->next = h; h->next = NULL; return rest;
}
int main() {
    struct Node* h = newNode(1); h->next = newNode(2); h->next->next = newNode(3);
    h = reverseRec(h);
    printf("%d -> %d -> %d\\n", h->data, h->next->data, h->next->next->data); return 0;
}`
  },
  '07. Find Start of Cycle': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function detectCycleStart(head) {
    let slow = head, fast = head;
    while(fast && fast.next) {
        slow = slow.next; fast = fast.next.next;
        if(slow === fast) {
            slow = head;
            while(slow !== fast) { slow = slow.next; fast = fast.next; }
            return slow.data;
        }
    }
    return -1;
}
let h = new Node(3); h.next = new Node(2); h.next.next = new Node(0);
h.next.next.next = new Node(4); h.next.next.next.next = h.next;
console.log("Cycle starts at:", detectCycleStart(h));`,
    python: `class Node:
    def __init__(self, d): self.data, self.next = d, None
def detect_cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
        if slow == fast:
            slow = head
            while slow != fast: slow = slow.next; fast = fast.next
            return slow.data
    return -1
h = Node(3); h.next = Node(2); h.next.next = Node(0); h.next.next.next = Node(4)
h.next.next.next.next = h.next
print("Cycle starts at:", detect_cycle_start(h))`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data = d; } }
    static int detectCycleStart(Node head) {
        Node slow = head, fast = head;
        while(fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
            if(slow == fast) {
                slow = head;
                while(slow != fast) { slow = slow.next; fast = fast.next; }
                return slow.data;
            }
        }
        return -1;
    }
    public static void main(String[] args) {
        Node h = new Node(3); h.next = new Node(2); h.next.next = new Node(0); h.next.next.next = new Node(4);
        h.next.next.next.next = h.next;
        System.out.println("Cycle starts at: " + detectCycleStart(h));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d){data=d;next=nullptr;} };
int detectCycleStart(Node* head) {
    Node *slow = head, *fast = head;
    while(fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if(slow == fast) {
            slow = head;
            while(slow != fast) { slow = slow->next; fast = fast->next; }
            return slow->data;
        }
    }
    return -1;
}
int main() {
    Node* h = new Node(3); h->next = new Node(2); h->next->next = new Node(0); h->next->next->next = new Node(4);
    h->next->next->next->next = h->next;
    cout << "Cycle starts at: " << detectCycleStart(h) << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Find Start of Cycle uses Floyd's algorithm.\\n"); return 0; }`
  },
  '11. Palindrome Check': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function isPalindrome(head) {
    let vals = [];
    let curr = head;
    while(curr) { vals.push(curr.data); curr = curr.next; }
    let l = 0, r = vals.length - 1;
    while(l < r) { if(vals[l++] !== vals[r--]) return false; }
    return true;
}
let h = new Node(1); h.next = new Node(2); h.next.next = new Node(1);
console.log("Is Palindrome:", isPalindrome(h));`,
    python: `class Node:
    def __init__(self, d): self.data, self.next = d, None
def is_palindrome(head):
    vals = []
    curr = head
    while curr: vals.append(curr.data); curr = curr.next
    return vals == vals[::-1]
h = Node(1); h.next = Node(2); h.next.next = Node(1)
print("Is Palindrome:", is_palindrome(h))`,
    java: `import java.util.*;
public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data = d; } }
    static boolean isPalindrome(Node head) {
        List<Integer> vals = new ArrayList<>();
        Node curr = head;
        while(curr != null) { vals.add(curr.data); curr = curr.next; }
        int l = 0, r = vals.size() - 1;
        while(l < r) { if(!vals.get(l++).equals(vals.get(r--))) return false; }
        return true;
    }
    public static void main(String[] args) {
        Node h = new Node(1); h.next = new Node(2); h.next.next = new Node(1);
        System.out.println("Is Palindrome: " + isPalindrome(h));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
struct Node { int data; Node* next; Node(int d){data=d;next=nullptr;} };
bool isPalindrome(Node* head) {
    vector<int> v;
    while(head) { v.push_back(head->data); head = head->next; }
    int l=0, r=v.size()-1;
    while(l<r) if(v[l++]!=v[r--]) return false;
    return true;
}
int main() {
    Node* h=new Node(1); h->next=new Node(2); h->next->next=new Node(1);
    cout << "Is Palindrome: " << isPalindrome(h) << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Palindrome Check stores values in an array.\\n"); return 0; }`
  },
  '12. Intersection Point': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function getIntersection(headA, headB) {
    let a = headA, b = headB;
    while(a !== b) {
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }
    return a ? a.data : -1;
}
let c = new Node(8); let a = new Node(4); a.next = c; let b = new Node(5); b.next = c;
console.log("Intersection at:", getIntersection(a, b));`,
    python: `class Node:
    def __init__(self, d): self.data, self.next = d, None
def get_intersection(headA, headB):
    a, b = headA, headB
    while a != b:
        a = a.next if a else headB
        b = b.next if b else headA
    return a.data if a else -1
c = Node(8); a = Node(4); a.next = c; b = Node(5); b.next = c
print("Intersection at:", get_intersection(a, b))`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data = d; } }
    static int getIntersection(Node headA, Node headB) {
        Node a = headA, b = headB;
        while(a != b) {
            a = a != null ? a.next : headB;
            b = b != null ? b.next : headA;
        }
        return a != null ? a.data : -1;
    }
    public static void main(String[] args) {
        Node c = new Node(8); Node a = new Node(4); a.next = c; Node b = new Node(5); b.next = c;
        System.out.println("Intersection at: " + getIntersection(a, b));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d){data=d;next=nullptr;} };
int getIntersection(Node* a, Node* b) {
    Node *pa = a, *pb = b;
    while(pa != pb) { pa = pa ? pa->next : b; pb = pb ? pb->next : a; }
    return pa ? pa->data : -1;
}
int main() {
    Node* c = new Node(8); Node* a = new Node(4); a->next = c; Node* b = new Node(5); b->next = c;
    cout << "Intersection at: " << getIntersection(a, b) << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Intersection uses two-pointer technique.\\n"); return 0; }`
  },
  '13. Add Two Numbers': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function addTwoNumbers(l1, l2) {
    let dummy = new Node(0), curr = dummy, carry = 0;
    while(l1 || l2 || carry) {
        let sum = (l1?l1.data:0) + (l2?l2.data:0) + carry;
        carry = Math.floor(sum/10); curr.next = new Node(sum%10); curr = curr.next;
        if(l1) l1=l1.next; if(l2) l2=l2.next;
    }
    return dummy.next;
}
let l1 = new Node(2); l1.next = new Node(4); l1.next.next = new Node(3);
let l2 = new Node(5); l2.next = new Node(6); l2.next.next = new Node(4);
let r = addTwoNumbers(l1, l2);
console.log(r.data, "->", r.next.data, "->", r.next.next.data);`,
    python: `class Node:
    def __init__(self, d): self.data, self.next = d, None
def add_two_numbers(l1, l2):
    dummy = curr = Node(0); carry = 0
    while l1 or l2 or carry:
        carry, out = divmod((l1.data if l1 else 0)+(l2.data if l2 else 0)+carry, 10)
        curr.next = Node(out); curr = curr.next
        l1 = l1.next if l1 else None; l2 = l2.next if l2 else None
    return dummy.next
l1 = Node(2); l1.next = Node(4); l1.next.next = Node(3)
l2 = Node(5); l2.next = Node(6); l2.next.next = Node(4)
r = add_two_numbers(l1, l2)
print(f"{r.data} -> {r.next.data} -> {r.next.next.data}")`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d){data=d;} }
    static Node addTwoNumbers(Node l1, Node l2) {
        Node dummy = new Node(0), curr = dummy; int carry = 0;
        while(l1!=null||l2!=null||carry!=0) {
            int sum=(l1!=null?l1.data:0)+(l2!=null?l2.data:0)+carry;
            carry=sum/10; curr.next=new Node(sum%10); curr=curr.next;
            if(l1!=null)l1=l1.next; if(l2!=null)l2=l2.next;
        }
        return dummy.next;
    }
    public static void main(String[] args) {
        Node l1=new Node(2); l1.next=new Node(4); l1.next.next=new Node(3);
        Node l2=new Node(5); l2.next=new Node(6); l2.next.next=new Node(4);
        Node r=addTwoNumbers(l1,l2);
        System.out.println(r.data+" -> "+r.next.data+" -> "+r.next.next.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node{int data;Node*next;Node(int d){data=d;next=nullptr;}};
Node* addTwo(Node*l1,Node*l2){
    Node dummy(0),*curr=&dummy; int carry=0;
    while(l1||l2||carry){
        int s=(l1?l1->data:0)+(l2?l2->data:0)+carry;
        carry=s/10;curr->next=new Node(s%10);curr=curr->next;
        if(l1)l1=l1->next;if(l2)l2=l2->next;
    }
    return dummy.next;
}
int main(){
    Node*l1=new Node(2);l1->next=new Node(4);l1->next->next=new Node(3);
    Node*l2=new Node(5);l2->next=new Node(6);l2->next->next=new Node(4);
    Node*r=addTwo(l1,l2);
    cout<<r->data<<" -> "<<r->next->data<<" -> "<<r->next->next->data<<endl;return 0;
}`,
    c: `#include <stdio.h>
int main(){printf("Add Two Numbers via carry logic.\\n");return 0;}`
  },
  '19. LRU Cache': {
    javascript: `class LRUNode{constructor(k,v){this.key=k;this.val=v;this.prev=null;this.next=null;}}
class LRUCache{
    constructor(cap){this.cap=cap;this.map=new Map();this.head=new LRUNode(0,0);this.tail=new LRUNode(0,0);this.head.next=this.tail;this.tail.prev=this.head;}
    _remove(n){n.prev.next=n.next;n.next.prev=n.prev;}
    _insert(n){n.next=this.head.next;n.prev=this.head;this.head.next.prev=n;this.head.next=n;}
    get(k){if(this.map.has(k)){let n=this.map.get(k);this._remove(n);this._insert(n);return n.val;}return -1;}
    put(k,v){if(this.map.has(k))this._remove(this.map.get(k));let n=new LRUNode(k,v);this._insert(n);this.map.set(k,n);if(this.map.size>this.cap){let lru=this.tail.prev;this._remove(lru);this.map.delete(lru.key);}}
}
let c=new LRUCache(2);c.put(1,1);c.put(2,2);
console.log(c.get(1));c.put(3,3);console.log(c.get(2));`,
    python: `class Node:
    def __init__(self,k,v):self.key,self.val,self.prev,self.next=k,v,None,None
class LRUCache:
    def __init__(self,cap):
        self.cap,self.map=cap,{}
        self.head,self.tail=Node(0,0),Node(0,0)
        self.head.next,self.tail.prev=self.tail,self.head
    def _remove(self,n):n.prev.next,n.next.prev=n.next,n.prev
    def _insert(self,n):n.next,n.prev=self.head.next,self.head;self.head.next.prev=n;self.head.next=n
    def get(self,k):
        if k in self.map:n=self.map[k];self._remove(n);self._insert(n);return n.val
        return -1
    def put(self,k,v):
        if k in self.map:self._remove(self.map[k])
        n=Node(k,v);self._insert(n);self.map[k]=n
        if len(self.map)>self.cap:lru=self.tail.prev;self._remove(lru);del self.map[lru.key]
c=LRUCache(2);c.put(1,1);c.put(2,2);print(c.get(1));c.put(3,3);print(c.get(2))`,
    java: `import java.util.*;
public class YourClassName {
    static class Node{int key,val;Node prev,next;Node(int k,int v){key=k;val=v;}}
    static class LRUCache{
        int cap;HashMap<Integer,Node>map=new HashMap<>();
        Node head=new Node(0,0),tail=new Node(0,0);
        LRUCache(int c){cap=c;head.next=tail;tail.prev=head;}
        void remove(Node n){n.prev.next=n.next;n.next.prev=n.prev;}
        void insert(Node n){n.next=head.next;n.prev=head;head.next.prev=n;head.next=n;}
        int get(int k){if(map.containsKey(k)){Node n=map.get(k);remove(n);insert(n);return n.val;}return -1;}
        void put(int k,int v){if(map.containsKey(k))remove(map.get(k));Node n=new Node(k,v);insert(n);map.put(k,n);if(map.size()>cap){Node lru=tail.prev;remove(lru);map.remove(lru.key);}}
    }
    public static void main(String[]args){
        LRUCache c=new LRUCache(2);c.put(1,1);c.put(2,2);
        System.out.println(c.get(1));c.put(3,3);System.out.println(c.get(2));
    }
}`,
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;
struct Node{int key,val;Node*prev,*next;Node(int k,int v):key(k),val(v),prev(nullptr),next(nullptr){}};
class LRUCache{
    int cap;unordered_map<int,Node*>map;Node*head,*tail;
    void rm(Node*n){n->prev->next=n->next;n->next->prev=n->prev;}
    void ins(Node*n){n->next=head->next;n->prev=head;head->next->prev=n;head->next=n;}
public:
    LRUCache(int c):cap(c){head=new Node(0,0);tail=new Node(0,0);head->next=tail;tail->prev=head;}
    int get(int k){if(map.count(k)){Node*n=map[k];rm(n);ins(n);return n->val;}return -1;}
    void put(int k,int v){if(map.count(k))rm(map[k]);Node*n=new Node(k,v);ins(n);map[k]=n;if(map.size()>cap){Node*lru=tail->prev;rm(lru);map.erase(lru->key);delete lru;}}
};
int main(){LRUCache c(2);c.put(1,1);c.put(2,2);cout<<c.get(1)<<endl;c.put(3,3);cout<<c.get(2)<<endl;return 0;}`,
    c: `#include <stdio.h>
int main(){printf("LRU Cache uses DLL + HashMap.\\n");return 0;}`
  }
};
