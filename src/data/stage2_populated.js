export const STAGE2_POPULATED = {
  // --- LINKED LIST ---
  '01. Insert at Head or Tail': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
let head = null;
function insertHead(data) { let n = new Node(data); n.next = head; head = n; }
function insertTail(data) {
    let n = new Node(data);
    if(!head) { head = n; return; }
    let curr = head; while(curr.next) curr = curr.next;
    curr.next = n;
}
insertHead(1); insertTail(2); insertTail(3);
console.log(head.data, head.next.data, head.next.next.data);`,
    python: `class Node:
    def __init__(self, d): self.data=d; self.next=None
head = None
def insert_head(data):
    global head; n = Node(data); n.next = head; head = n
def insert_tail(data):
    global head; n = Node(data)
    if not head: head = n; return
    curr = head
    while curr.next: curr = curr.next
    curr.next = n
insert_head(1); insert_tail(2); insert_tail(3)
print(head.data, head.next.data, head.next.next.data)`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data=d; } }
    static Node head;
    static void insertHead(int d) { Node n = new Node(d); n.next = head; head = n; }
    static void insertTail(int d) {
        Node n = new Node(d);
        if(head==null) { head=n; return; }
        Node c = head; while(c.next!=null) c=c.next; c.next=n;
    }
    public static void main(String[] args) {
        insertHead(1); insertTail(2); insertTail(3);
        System.out.println(head.data + " " + head.next.data + " " + head.next.next.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d) { data=d; next=nullptr; } };
Node* head = nullptr;
void insertHead(int d) { Node* n = new Node(d); n->next = head; head = n; }
void insertTail(int d) {
    Node* n = new Node(d);
    if(!head) { head = n; return; }
    Node* c = head; while(c->next) c=c->next; c->next=n;
}
int main() {
    insertHead(1); insertTail(2); insertTail(3);
    cout << head->data << " " << head->next->data << " " << head->next->next->data << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* head = NULL;
void insertHead(int d) { struct Node* n = malloc(sizeof(struct Node)); n->data=d; n->next=head; head=n; }
void insertTail(int d) {
    struct Node* n = malloc(sizeof(struct Node)); n->data=d; n->next=NULL;
    if(!head) { head=n; return; }
    struct Node* c = head; while(c->next) c=c->next; c->next=n;
}
int main() {
    insertHead(1); insertTail(2); insertTail(3);
    printf("%d %d %d\\n", head->data, head->next->data, head->next->next->data);
    return 0;
}`
  },
  '05. Find Middle': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function findMiddle(head) {
    let slow = head, fast = head;
    while(fast && fast.next) { slow = slow.next; fast = fast.next.next; }
    return slow ? slow.data : null;
}
let head=new Node(1); head.next=new Node(2); head.next.next=new Node(3);
console.log("Middle:", findMiddle(head));`,
    python: `class Node:
    def __init__(self, d): self.data=d; self.next=None
def find_middle(head):
    slow = fast = head
    while fast and fast.next: slow, fast = slow.next, fast.next.next
    return slow.data if slow else None
head=Node(1); head.next=Node(2); head.next.next=Node(3)
print("Middle:", find_middle(head))`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data=d; } }
    static int findMiddle(Node head) {
        Node slow = head, fast = head;
        while(fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
        return slow != null ? slow.data : -1;
    }
    public static void main(String[] args) {
        Node h = new Node(1); h.next = new Node(2); h.next.next = new Node(3);
        System.out.println("Middle: " + findMiddle(h));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d){ data=d; next=nullptr; } };
int findMiddle(Node* head) {
    Node *slow = head, *fast = head;
    while(fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    return slow ? slow->data : -1;
}
int main() {
    Node* h = new Node(1); h->next = new Node(2); h->next->next = new Node(3);
    cout << "Middle: " << findMiddle(h) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
int findMiddle(struct Node* head) {
    struct Node *slow = head, *fast = head;
    while(fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    return slow ? slow->data : -1;
}
int main() {
    struct Node* h = malloc(sizeof(struct Node)); h->data=1;
    h->next = malloc(sizeof(struct Node)); h->next->data=2;
    h->next->next = malloc(sizeof(struct Node)); h->next->next->data=3; h->next->next->next=NULL;
    printf("Middle: %d\\n", findMiddle(h));
    return 0;
}`
  },
  '06. Detect Cycle': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function hasCycle(head) {
    let slow = head, fast = head;
    while(fast && fast.next) {
        slow = slow.next; fast = fast.next.next;
        if(slow === fast) return true;
    }
    return false;
}
let head=new Node(1); let n2=new Node(2); head.next=n2; n2.next=head;
console.log("Has cycle:", hasCycle(head));`,
    python: `class Node:
    def __init__(self, d): self.data=d; self.next=None
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow == fast: return True
    return False
head=Node(1); n2=Node(2); head.next=n2; n2.next=head
print("Has cycle:", has_cycle(head))`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data=d; } }
    static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while(fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
            if(slow == fast) return true;
        }
        return false;
    }
    public static void main(String[] args) {
        Node h = new Node(1), n2 = new Node(2); h.next = n2; n2.next = h;
        System.out.println("Has cycle: " + hasCycle(h));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d){ data=d; next=nullptr; } };
bool hasCycle(Node* head) {
    Node *slow = head, *fast = head;
    while(fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if(slow == fast) return true;
    }
    return false;
}
int main() {
    Node* h = new Node(1); Node* n2 = new Node(2); h->next = n2; n2->next = h;
    cout << "Has cycle: " << hasCycle(h) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
struct Node { int data; struct Node* next; };
bool hasCycle(struct Node* head) {
    struct Node *slow = head, *fast = head;
    while(fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if(slow == fast) return true;
    }
    return false;
}
int main() {
    struct Node* h = malloc(sizeof(struct Node)); h->data=1;
    struct Node* n2 = malloc(sizeof(struct Node)); n2->data=2;
    h->next = n2; n2->next = h;
    printf("Has cycle: %s\\n", hasCycle(h) ? "true" : "false");
    return 0;
}`
  },

  // --- STACKS ---
  '04. Next Greater Element': {
    javascript: `function nextGreater(arr) {
    let res = new Array(arr.length).fill(-1), stack = [];
    for(let i=0; i<arr.length; i++) {
        while(stack.length && arr[stack[stack.length-1]] < arr[i]) {
            res[stack.pop()] = arr[i];
        }
        stack.push(i);
    }
    return res;
}
console.log("Next Greater:", nextGreater([4, 5, 2, 25]));`,
    python: `def next_greater(arr):
    res, stack = [-1]*len(arr), []
    for i in range(len(arr)):
        while stack and arr[stack[-1]] < arr[i]: res[stack.pop()] = arr[i]
        stack.append(i)
    return res
print("Next Greater:", next_greater([4, 5, 2, 25]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {4, 5, 2, 25}, res = new int[arr.length];
        Arrays.fill(res, -1); Stack<Integer> s = new Stack<>();
        for(int i=0; i<arr.length; i++) {
            while(!s.isEmpty() && arr[s.peek()] < arr[i]) res[s.pop()] = arr[i];
            s.push(i);
        }
        System.out.println("Next Greater: " + Arrays.toString(res));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;
int main() {
    vector<int> arr = {4, 5, 2, 25}, res(4, -1); stack<int> s;
    for(int i=0; i<4; i++) {
        while(!s.empty() && arr[s.top()] < arr[i]) { res[s.top()] = arr[i]; s.pop(); }
        s.push(i);
    }
    for(int x : res) cout << x << " "; cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {4, 5, 2, 25}, res[4] = {-1,-1,-1,-1}, s[4], top = -1;
    for(int i=0; i<4; i++) {
        while(top >= 0 && arr[s[top]] < arr[i]) res[s[top--]] = arr[i];
        s[++top] = i;
    }
    for(int i=0; i<4; i++) printf("%d ", res[i]); printf("\\n");
    return 0;
}`
  },

  // --- HASHING ---
  'HashMap Basics': {
    javascript: `let map = new Map();
map.set("Alice", 90); map.set("Bob", 85);
console.log("Alice's score:", map.get("Alice"));
console.log("Contains Bob?", map.has("Bob"));`,
    python: `map = {"Alice": 90, "Bob": 85}
print("Alice's score:", map.get("Alice"))
print("Contains Bob?", "Bob" in map)`,
    java: `import java.util.HashMap;
public class YourClassName {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Alice", 90); map.put("Bob", 85);
        System.out.println("Alice's score: " + map.get("Alice"));
        System.out.println("Contains Bob? " + map.containsKey("Bob"));
    }
}`,
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    unordered_map<string, int> map;
    map["Alice"] = 90; map["Bob"] = 85;
    cout << "Alice's score: " << map["Alice"] << endl;
    cout << "Contains Bob? " << map.count("Bob") << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    printf("C doesn't have a built-in Hash Map. You must implement one using arrays and hash functions.\\n");
    return 0;
}`
  },
  '03. Two Sum Hash': {
    javascript: `function twoSum(arr, target) {
    let map = new Map();
    for(let i=0; i<arr.length; i++) {
        let comp = target - arr[i];
        if(map.has(comp)) return [map.get(comp), i];
        map.set(arr[i], i);
    }
    return [];
}
console.log(twoSum([2, 7, 11, 15], 9));`,
    python: `def two_sum(arr, target):
    num_map = {}
    for i, num in enumerate(arr):
        comp = target - num
        if comp in num_map: return [num_map[comp], i]
        num_map[num] = i
    return []
print(two_sum([2, 7, 11, 15], 9))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {2, 7, 11, 15}; int target = 9;
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int i=0; i<arr.length; i++) {
            if(map.containsKey(target - arr[i])) {
                System.out.println("[" + map.get(target - arr[i]) + ", " + i + "]");
                return;
            }
            map.put(arr[i], i);
        }
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    vector<int> arr = {2, 7, 11, 15}; int target = 9;
    unordered_map<int, int> map;
    for(int i=0; i<arr.size(); i++) {
        if(map.count(target - arr[i])) {
            cout << "[" << map[target - arr[i]] << ", " << i << "]" << endl;
            return 0;
        }
        map[arr[i]] = i;
    }
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {2, 7, 11, 15}, target = 9;
    for(int i=0; i<4; i++) {
        for(int j=i+1; j<4; j++) {
            if(arr[i] + arr[j] == target) { printf("[%d, %d]\\n", i, j); return 0; }
        }
    }
    return 0;
}`
  }
};
