export const STACK_PROBLEMS_PART2 = {
  // --- STACK CONCEPTS & PATTERNS ---
  'Stack Push': {
    javascript: `let stack = [];
stack.push(10); stack.push(20);
console.log("Pushed elements. Top is:", stack[stack.length - 1]);`,
    python: `stack = []
stack.append(10); stack.append(20)
print("Pushed elements. Top is:", stack[-1])`,
    java: `import java.util.Stack;
public class YourClassName {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10); stack.push(20);
        System.out.println("Pushed elements. Top is: " + stack.peek());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<int> s; s.push(10); s.push(20);
    cout << "Pushed elements. Top is: " << s.top() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int stack[100], top = -1;
void push(int val) { stack[++top] = val; }
int main() {
    push(10); push(20);
    printf("Pushed elements. Top is: %d\\n", stack[top]);
    return 0;
}`
  },
  'Stack Pop': {
    javascript: `let stack = [10, 20];
let popped = stack.pop();
console.log("Popped:", popped, "| New Top:", stack[stack.length - 1]);`,
    python: `stack = [10, 20]
popped = stack.pop()
print("Popped:", popped, "| New Top:", stack[-1])`,
    java: `import java.util.Stack;
public class YourClassName {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10); stack.push(20);
        System.out.println("Popped: " + stack.pop() + " | New Top: " + stack.peek());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<int> s; s.push(10); s.push(20);
    int popped = s.top(); s.pop();
    cout << "Popped: " << popped << " | New Top: " << s.top() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int stack[100] = {10, 20}, top = 1;
int pop() { return stack[top--]; }
int main() {
    printf("Popped: %d | New Top: %d\\n", pop(), stack[top]);
    return 0;
}`
  },
  'Stack Peek': {
    javascript: `let stack = [10, 20, 30];
console.log("Peek at Top Element:", stack[stack.length - 1]);`,
    python: `stack = [10, 20, 30]
print("Peek at Top Element:", stack[-1])`,
    java: `import java.util.Stack;
public class YourClassName {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10); stack.push(20); stack.push(30);
        System.out.println("Peek at Top Element: " + stack.peek());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<int> s; s.push(10); s.push(20); s.push(30);
    cout << "Peek at Top Element: " << s.top() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int stack[100] = {10, 20, 30}, top = 2;
int peek() { return stack[top]; }
int main() {
    printf("Peek at Top Element: %d\\n", peek());
    return 0;
}`
  },
  'Stack isEmpty': {
    javascript: `let stack = [];
console.log("Is stack empty?", stack.length === 0);`,
    python: `stack = []
print("Is stack empty?", len(stack) == 0)`,
    java: `import java.util.Stack;
public class YourClassName {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        System.out.println("Is stack empty? " + stack.isEmpty());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<int> s;
    cout << "Is stack empty? " << (s.empty() ? "true" : "false") << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdbool.h>
int top = -1;
bool isEmpty() { return top == -1; }
int main() {
    printf("Is stack empty? %s\\n", isEmpty() ? "true" : "false");
    return 0;
}`
  },
  'Array based Stack': {
    javascript: `class ArrayStack {
    constructor() { this.items = []; }
    push(el) { this.items.push(el); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length - 1]; }
}
let s = new ArrayStack(); s.push(5);
console.log("Array Stack Peek:", s.peek());`,
    python: `class ArrayStack:
    def __init__(self): self.items = []
    def push(self, item): self.items.append(item)
    def pop(self): return self.items.pop()
    def peek(self): return self.items[-1]
s = ArrayStack(); s.push(5)
print("Array Stack Peek:", s.peek())`,
    java: `public class YourClassName {
    static class ArrayStack {
        int[] arr = new int[100]; int top = -1;
        void push(int x) { arr[++top] = x; }
        int pop() { return arr[top--]; }
        int peek() { return arr[top]; }
    }
    public static void main(String[] args) {
        ArrayStack s = new ArrayStack(); s.push(5);
        System.out.println("Array Stack Peek: " + s.peek());
    }
}`,
    cpp: `#include <iostream>
using namespace std;
class ArrayStack {
    int arr[100]; int t = -1;
public:
    void push(int x) { arr[++t] = x; }
    int pop() { return arr[t--]; }
    int peek() { return arr[t]; }
};
int main() {
    ArrayStack s; s.push(5);
    cout << "Array Stack Peek: " << s.peek() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int arr[100], t = -1;
void push(int x) { arr[++t] = x; }
int peek() { return arr[t]; }
int main() { push(5); printf("Array Stack Peek: %d\\n", peek()); return 0; }`
  },
  'LinkedList based Stack': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
class LLStack {
    constructor() { this.head = null; }
    push(d) { let n = new Node(d); n.next = this.head; this.head = n; }
    pop() { let val = this.head.data; this.head = this.head.next; return val; }
    peek() { return this.head.data; }
}
let s = new LLStack(); s.push(5); s.push(10);
console.log("LL Stack Popped:", s.pop());`,
    python: `class Node:
    def __init__(self, d): self.data, self.next = d, None
class LLStack:
    def __init__(self): self.head = None
    def push(self, d): n = Node(d); n.next = self.head; self.head = n
    def pop(self): val = self.head.data; self.head = self.head.next; return val
    def peek(self): return self.head.data
s = LLStack(); s.push(5); s.push(10)
print("LL Stack Popped:", s.pop())`,
    java: `public class YourClassName {
    static class Node { int data; Node next; Node(int d) { data = d; } }
    static class LLStack {
        Node head;
        void push(int d) { Node n = new Node(d); n.next = head; head = n; }
        int pop() { int v = head.data; head = head.next; return v; }
        int peek() { return head.data; }
    }
    public static void main(String[] args) {
        LLStack s = new LLStack(); s.push(5); s.push(10);
        System.out.println("LL Stack Popped: " + s.pop());
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d) { data=d; next=nullptr; } };
class LLStack {
    Node* head = nullptr;
public:
    void push(int d) { Node* n = new Node(d); n->next = head; head = n; }
    int pop() { int v = head->data; Node* t = head; head = head->next; delete t; return v; }
    int peek() { return head->data; }
};
int main() {
    LLStack s; s.push(5); s.push(10);
    cout << "LL Stack Popped: " << s.pop() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* head = NULL;
void push(int d) { struct Node* n = malloc(sizeof(struct Node)); n->data = d; n->next = head; head = n; }
int pop() { int v = head->data; struct Node* t = head; head = head->next; free(t); return v; }
int main() {
    push(5); push(10);
    printf("LL Stack Popped: %d\\n", pop());
    return 0;
}`
  },
  'Built-in Deque': {
    javascript: `// In JS, arrays act as a built-in Deque
let deque = [];
deque.push(1); // Push back
deque.unshift(2); // Push front
console.log(deque.shift()); // Pop front -> 2
console.log(deque.pop()); // Pop back -> 1`,
    python: `from collections import deque
dq = deque()
dq.append(1) # Push back
dq.appendleft(2) # Push front
print(dq.popleft()) # Pop front -> 2
print(dq.pop()) # Pop back -> 1`,
    java: `import java.util.ArrayDeque;
import java.util.Deque;
public class YourClassName {
    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>();
        dq.addLast(1); dq.addFirst(2);
        System.out.println(dq.removeFirst());
        System.out.println(dq.removeLast());
    }
}`,
    cpp: `#include <iostream>
#include <deque>
using namespace std;
int main() {
    deque<int> dq;
    dq.push_back(1); dq.push_front(2);
    cout << dq.front() << endl; dq.pop_front();
    cout << dq.back() << endl; dq.pop_back();
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("C does not have a built-in Deque.\\n"); return 0; }`
  },
  'Pattern: Two Stack Trick': {
    javascript: `// Using two stacks to implement a Queue
class QueueViaStacks {
    constructor() { this.s1 = []; this.s2 = []; }
    enqueue(x) { this.s1.push(x); }
    dequeue() {
        if(this.s2.length === 0) {
            while(this.s1.length > 0) this.s2.push(this.s1.pop());
        }
        return this.s2.pop();
    }
}
let q = new QueueViaStacks(); q.enqueue(1); q.enqueue(2);
console.log(q.dequeue()); // 1`,
    python: `class QueueViaStacks:
    def __init__(self): self.s1 = []; self.s2 = []
    def enqueue(self, x): self.s1.append(x)
    def dequeue(self):
        if not self.s2:
            while self.s1: self.s2.append(self.s1.pop())
        return self.s2.pop()
q = QueueViaStacks(); q.enqueue(1); q.enqueue(2)
print(q.dequeue()) # 1`,
    java: `import java.util.Stack;
public class YourClassName {
    static class QueueViaStacks {
        Stack<Integer> s1 = new Stack<>(), s2 = new Stack<>();
        void enqueue(int x) { s1.push(x); }
        int dequeue() {
            if(s2.isEmpty()) { while(!s1.isEmpty()) s2.push(s1.pop()); }
            return s2.pop();
        }
    }
    public static void main(String[] args) {
        QueueViaStacks q = new QueueViaStacks(); q.enqueue(1); q.enqueue(2);
        System.out.println(q.dequeue());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
class QueueViaStacks {
    stack<int> s1, s2;
public:
    void enqueue(int x) { s1.push(x); }
    int dequeue() {
        if(s2.empty()) { while(!s1.empty()) { s2.push(s1.top()); s1.pop(); } }
        int x = s2.top(); s2.pop(); return x;
    }
};
int main() {
    QueueViaStacks q; q.enqueue(1); q.enqueue(2);
    cout << q.dequeue() << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Two Stack Trick.\\n"); return 0; }`
  },
  'Pattern: Balanced Brackets': {
    javascript: `// See Top 20 Stack Problems > Balanced Brackets
console.log("Balanced Brackets uses a stack to match opening and closing brackets.");`,
    python: `print("Balanced Brackets uses a stack to match opening and closing brackets.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Balanced Brackets uses a Stack."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Balanced Brackets." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Balanced Brackets.\\n"); return 0; }`
  },

  // --- MISSING TOP 20 STACK PROBLEMS ---
  '01. Implement with Array': {
    javascript: `// Same as Array based Stack\nconsole.log("See Array based Stack.");`,
    python: `print("See Array based Stack.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("See Array based Stack."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "See Array based Stack." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("See Array based Stack.\\n"); return 0; }`
  },
  '02. Implement with LinkedList': {
    javascript: `// Same as LinkedList based Stack\nconsole.log("See LinkedList based Stack.");`,
    python: `print("See LinkedList based Stack.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("See LinkedList based Stack."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "See LinkedList based Stack." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("See LinkedList based Stack.\\n"); return 0; }`
  },
  '05. Previous Greater Element': {
    javascript: `function prevGreaterElement(arr) {
    let stack = [], res = new Array(arr.length).fill(-1);
    for(let i=0; i<arr.length; i++) {
        while(stack.length && arr[stack[stack.length-1]] <= arr[i]) stack.pop();
        if(stack.length) res[i] = arr[stack[stack.length-1]];
        stack.push(i);
    }
    return res;
}
console.log(prevGreaterElement([10, 4, 2, 20, 40, 12, 30]));`,
    python: `def prev_greater_element(arr):
    stack, res = [], [-1] * len(arr)
    for i in range(len(arr)):
        while stack and arr[stack[-1]] <= arr[i]: stack.pop()
        if stack: res[i] = arr[stack[-1]]
        stack.append(i)
    return res
print(prev_greater_element([10, 4, 2, 20, 40, 12, 30]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {10, 4, 2, 20, 40, 12, 30};
        int[] res = new int[arr.length]; Arrays.fill(res, -1);
        Stack<Integer> stack = new Stack<>();
        for(int i=0; i<arr.length; i++) {
            while(!stack.isEmpty() && arr[stack.peek()] <= arr[i]) stack.pop();
            if(!stack.isEmpty()) res[i] = arr[stack.peek()];
            stack.push(i);
        }
        System.out.println(Arrays.toString(res));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;
int main() {
    vector<int> arr = {10, 4, 2, 20, 40, 12, 30};
    vector<int> res(arr.size(), -1);
    stack<int> s;
    for(int i=0; i<arr.size(); i++) {
        while(!s.empty() && arr[s.top()] <= arr[i]) s.pop();
        if(!s.empty()) res[i] = arr[s.top()];
        s.push(i);
    }
    for(int x : res) cout << x << " "; cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {10, 4, 2, 20, 40, 12, 30}, n = 7;
    int res[7], stack[7], top = -1;
    for(int i=0; i<n; i++) { res[i] = -1; }
    for(int i=0; i<n; i++) {
        while(top >= 0 && arr[stack[top]] <= arr[i]) top--;
        if(top >= 0) res[i] = arr[stack[top]];
        stack[++top] = i;
    }
    for(int i=0; i<n; i++) printf("%d ", res[i]);
    return 0;
}`
  },
  '06. Stock Span Problem': {
    javascript: `function calculateSpan(prices) {
    let stack = [], spans = new Array(prices.length);
    for(let i=0; i<prices.length; i++) {
        while(stack.length && prices[stack[stack.length-1]] <= prices[i]) stack.pop();
        spans[i] = stack.length === 0 ? i + 1 : i - stack[stack.length-1];
        stack.push(i);
    }
    return spans;
}
console.log(calculateSpan([100, 80, 60, 70, 60, 75, 85]));`,
    python: `def calculate_span(prices):
    stack, spans = [], [0] * len(prices)
    for i in range(len(prices)):
        while stack and prices[stack[-1]] <= prices[i]: stack.pop()
        spans[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)
    return spans
print(calculate_span([100, 80, 60, 70, 60, 75, 85]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] prices = {100, 80, 60, 70, 60, 75, 85};
        int[] spans = new int[prices.length];
        Stack<Integer> stack = new Stack<>();
        for(int i=0; i<prices.length; i++) {
            while(!stack.isEmpty() && prices[stack.peek()] <= prices[i]) stack.pop();
            spans[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        System.out.println(Arrays.toString(spans));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;
int main() {
    vector<int> prices = {100, 80, 60, 70, 60, 75, 85};
    vector<int> spans(prices.size());
    stack<int> s;
    for(int i=0; i<prices.size(); i++) {
        while(!s.empty() && prices[s.top()] <= prices[i]) s.pop();
        spans[i] = s.empty() ? i + 1 : i - s.top();
        s.push(i);
    }
    for(int x : spans) cout << x << " "; cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int prices[] = {100, 80, 60, 70, 60, 75, 85}, n = 7;
    int spans[7], stack[7], top = -1;
    for(int i=0; i<n; i++) {
        while(top >= 0 && prices[stack[top]] <= prices[i]) top--;
        spans[i] = (top < 0) ? i + 1 : i - stack[top];
        stack[++top] = i;
    }
    for(int i=0; i<n; i++) printf("%d ", spans[i]);
    return 0;
}`
  },
  '08. Two Stacks in One Array': {
    javascript: `class TwoStacks {
    constructor(n) { this.arr = new Array(n); this.t1 = -1; this.t2 = n; }
    push1(x) { if(this.t1 < this.t2 - 1) this.arr[++this.t1] = x; }
    push2(x) { if(this.t1 < this.t2 - 1) this.arr[--this.t2] = x; }
    pop1() { return this.t1 >= 0 ? this.arr[this.t1--] : -1; }
    pop2() { return this.t2 < this.arr.length ? this.arr[this.t2++] : -1; }
}
let ts = new TwoStacks(5); ts.push1(5); ts.push2(10);
console.log(ts.pop1(), ts.pop2());`,
    python: `class TwoStacks:
    def __init__(self, n): self.arr, self.t1, self.t2 = [0]*n, -1, n
    def push1(self, x):
        if self.t1 < self.t2 - 1: self.t1 += 1; self.arr[self.t1] = x
    def push2(self, x):
        if self.t1 < self.t2 - 1: self.t2 -= 1; self.arr[self.t2] = x
    def pop1(self):
        if self.t1 >= 0: val = self.arr[self.t1]; self.t1 -= 1; return val
        return -1
    def pop2(self):
        if self.t2 < len(self.arr): val = self.arr[self.t2]; self.t2 += 1; return val
        return -1
ts = TwoStacks(5); ts.push1(5); ts.push2(10)
print(ts.pop1(), ts.pop2())`,
    java: `public class YourClassName {
    static class TwoStacks {
        int[] arr; int t1, t2;
        TwoStacks(int n) { arr = new int[n]; t1 = -1; t2 = n; }
        void push1(int x) { if(t1 < t2 - 1) arr[++t1] = x; }
        void push2(int x) { if(t1 < t2 - 1) arr[--t2] = x; }
        int pop1() { return t1 >= 0 ? arr[t1--] : -1; }
        int pop2() { return t2 < arr.length ? arr[t2++] : -1; }
    }
    public static void main(String[] args) {
        TwoStacks ts = new TwoStacks(5); ts.push1(5); ts.push2(10);
        System.out.println(ts.pop1() + " " + ts.pop2());
    }
}`,
    cpp: `#include <iostream>
using namespace std;
class TwoStacks {
    int *arr; int t1, t2, size;
public:
    TwoStacks(int n) { size = n; arr = new int[n]; t1 = -1; t2 = size; }
    void push1(int x) { if(t1 < t2 - 1) arr[++t1] = x; }
    void push2(int x) { if(t1 < t2 - 1) arr[--t2] = x; }
    int pop1() { return t1 >= 0 ? arr[t1--] : -1; }
    int pop2() { return t2 < size ? arr[t2++] : -1; }
};
int main() {
    TwoStacks ts(5); ts.push1(5); ts.push2(10);
    cout << ts.pop1() << " " << ts.pop2() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int arr[5], t1 = -1, t2 = 5;
void push1(int x) { if(t1 < t2 - 1) arr[++t1] = x; }
void push2(int x) { if(t1 < t2 - 1) arr[--t2] = x; }
int pop1() { return t1 >= 0 ? arr[t1--] : -1; }
int pop2() { return t2 < 5 ? arr[t2++] : -1; }
int main() { push1(5); push2(10); printf("%d %d\\n", pop1(), pop2()); return 0; }`
  },
  '09. Sort Stack': {
    javascript: `function sortStack(stack) {
    let tmpStack = [];
    while(stack.length) {
        let tmp = stack.pop();
        while(tmpStack.length && tmpStack[tmpStack.length-1] > tmp) stack.push(tmpStack.pop());
        tmpStack.push(tmp);
    }
    return tmpStack;
}
console.log(sortStack([34, 3, 31, 98, 92, 23]));`,
    python: `def sort_stack(stack):
    tmp_stack = []
    while stack:
        tmp = stack.pop()
        while tmp_stack and tmp_stack[-1] > tmp: stack.append(tmp_stack.pop())
        tmp_stack.append(tmp)
    return tmp_stack
print(sort_stack([34, 3, 31, 98, 92, 23]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.addAll(Arrays.asList(34, 3, 31, 98, 92, 23));
        Stack<Integer> tmpStack = new Stack<>();
        while(!stack.isEmpty()) {
            int tmp = stack.pop();
            while(!tmpStack.isEmpty() && tmpStack.peek() > tmp) stack.push(tmpStack.pop());
            tmpStack.push(tmp);
        }
        System.out.println(tmpStack);
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<int> stack, tmpStack;
    for(int x : {34, 3, 31, 98, 92, 23}) stack.push(x);
    while(!stack.empty()) {
        int tmp = stack.top(); stack.pop();
        while(!tmpStack.empty() && tmpStack.top() > tmp) { stack.push(tmpStack.top()); tmpStack.pop(); }
        tmpStack.push(tmp);
    }
    while(!tmpStack.empty()) { cout << tmpStack.top() << " "; tmpStack.pop(); }
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Sort Stack uses a temporary stack.\\n"); return 0; }`
  },
  '10. Largest Rectangle in Histogram': {
    javascript: `function largestRectangleArea(heights) {
    let maxArea = 0, stack = [];
    heights.push(0);
    for(let i=0; i<heights.length; i++) {
        while(stack.length && heights[stack[stack.length-1]] > heights[i]) {
            let h = heights[stack.pop()];
            let w = stack.length ? i - stack[stack.length-1] - 1 : i;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    return maxArea;
}
console.log(largestRectangleArea([2,1,5,6,2,3]));`,
    python: `def largest_rectangle_area(heights):
    max_area, stack = 0, []
    heights.append(0)
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area
print(largest_rectangle_area([2,1,5,6,2,3]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] heights = {2,1,5,6,2,3,0};
        int maxArea = 0; Stack<Integer> stack = new Stack<>();
        for(int i=0; i<heights.length; i++) {
            while(!stack.isEmpty() && heights[stack.peek()] > heights[i]) {
                int h = heights[stack.pop()];
                int w = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }
        System.out.println(maxArea);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;
int main() {
    vector<int> heights = {2,1,5,6,2,3}; heights.push_back(0);
    int maxArea = 0; stack<int> s;
    for(int i=0; i<heights.size(); i++) {
        while(!s.empty() && heights[s.top()] > heights[i]) {
            int h = heights[s.top()]; s.pop();
            int w = s.empty() ? i : i - s.top() - 1;
            maxArea = max(maxArea, h * w);
        }
        s.push(i);
    }
    cout << maxArea << endl; return 0;
}`,
    c: `#include <stdio.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
int main() {
    int heights[] = {2,1,5,6,2,3,0}, n = 7;
    int stack[7], top = -1, maxArea = 0;
    for(int i=0; i<n; i++) {
        while(top >= 0 && heights[stack[top]] > heights[i]) {
            int h = heights[stack[top--]];
            int w = top < 0 ? i : i - stack[top] - 1;
            maxArea = MAX(maxArea, h * w);
        }
        stack[++top] = i;
    }
    printf("%d\\n", maxArea); return 0;
}`
  },
  '11. Max Rectangle in Matrix': {
    javascript: `// Maximum Rectangle in a 2D Binary Matrix\nconsole.log("Max Rectangle is basically Largest Rectangle in Histogram row by row.");`,
    python: `print("Max Rectangle is basically Largest Rectangle in Histogram row by row.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Max Rectangle in Matrix."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Max Rectangle in Matrix." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Max Rectangle in Matrix.\\n"); return 0; }`
  },
  '12. Infix to Postfix': {
    javascript: `function infixToPostfix(exp) {
    let result = "", stack = [], prec = {'+':1, '-':1, '*':2, '/':2, '^':3};
    for(let c of exp) {
        if(/[a-zA-Z0-9]/.test(c)) result += c;
        else if(c === '(') stack.push(c);
        else if(c === ')') {
            while(stack.length && stack[stack.length-1] !== '(') result += stack.pop();
            stack.pop();
        } else {
            while(stack.length && prec[c] <= prec[stack[stack.length-1]]) result += stack.pop();
            stack.push(c);
        }
    }
    while(stack.length) result += stack.pop();
    return result;
}
console.log(infixToPostfix("a+b*(c^d-e)^(f+g*h)-i"));`,
    python: `def infix_to_postfix(exp):
    result, stack, prec = "", [], {'+':1, '-':1, '*':2, '/':2, '^':3}
    for c in exp:
        if c.isalnum(): result += c
        elif c == '(': stack.append(c)
        elif c == ')':
            while stack and stack[-1] != '(': result += stack.pop()
            stack.pop()
        else:
            while stack and stack[-1] != '(' and prec.get(c, 0) <= prec.get(stack[-1], 0):
                result += stack.pop()
            stack.append(c)
    while stack: result += stack.pop()
    return result
print(infix_to_postfix("a+b*(c^d-e)^(f+g*h)-i"))`,
    java: `import java.util.*;
public class YourClassName {
    static int prec(char c) {
        if(c == '^') return 3;
        if(c == '*' || c == '/') return 2;
        if(c == '+' || c == '-') return 1;
        return -1;
    }
    public static void main(String[] args) {
        String exp = "a+b*(c^d-e)^(f+g*h)-i";
        StringBuilder result = new StringBuilder(); Stack<Character> stack = new Stack<>();
        for(int i=0; i<exp.length(); ++i) {
            char c = exp.charAt(i);
            if(Character.isLetterOrDigit(c)) result.append(c);
            else if(c == '(') stack.push(c);
            else if(c == ')') {
                while(!stack.isEmpty() && stack.peek() != '(') result.append(stack.pop());
                stack.pop();
            } else {
                while(!stack.isEmpty() && prec(c) <= prec(stack.peek())) result.append(stack.pop());
                stack.push(c);
            }
        }
        while(!stack.isEmpty()) result.append(stack.pop());
        System.out.println(result);
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int prec(char c) { if(c=='^') return 3; if(c=='*' || c=='/') return 2; if(c=='+' || c=='-') return 1; return -1; }
int main() {
    string exp = "a+b*(c^d-e)^(f+g*h)-i";
    string result; stack<char> s;
    for(char c : exp) {
        if(isalnum(c)) result += c;
        else if(c == '(') s.push('(');
        else if(c == ')') {
            while(!s.empty() && s.top() != '(') { result += s.top(); s.pop(); }
            s.pop();
        } else {
            while(!s.empty() && prec(c) <= prec(s.top())) { result += s.top(); s.pop(); }
            s.push(c);
        }
    }
    while(!s.empty()) { result += s.top(); s.pop(); }
    cout << result << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Infix to Postfix.\\n"); return 0; }`
  },
  '13. Evaluate Postfix': {
    javascript: `function evaluatePostfix(exp) {
    let stack = [];
    for(let c of exp.split(' ')) {
        if(!isNaN(c)) stack.push(parseInt(c));
        else {
            let val1 = stack.pop(), val2 = stack.pop();
            switch(c) {
                case '+': stack.push(val2 + val1); break;
                case '-': stack.push(val2 - val1); break;
                case '*': stack.push(val2 * val1); break;
                case '/': stack.push(Math.trunc(val2 / val1)); break;
            }
        }
    }
    return stack.pop();
}
console.log(evaluatePostfix("2 3 1 * + 9 -"));`,
    python: `def evaluate_postfix(exp):
    stack = []
    for c in exp.split():
        if c.lstrip('-').isdigit(): stack.append(int(c))
        else:
            val1, val2 = stack.pop(), stack.pop()
            if c == '+': stack.append(val2 + val1)
            elif c == '-': stack.append(val2 - val1)
            elif c == '*': stack.append(val2 * val1)
            elif c == '/': stack.append(int(val2 / val1))
    return stack.pop()
print(evaluate_postfix("2 3 1 * + 9 -"))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        String[] exp = {"2", "3", "1", "*", "+", "9", "-"};
        Stack<Integer> stack = new Stack<>();
        for(String c : exp) {
            if(c.equals("+") || c.equals("-") || c.equals("*") || c.equals("/")) {
                int val1 = stack.pop(), val2 = stack.pop();
                if(c.equals("+")) stack.push(val2 + val1);
                else if(c.equals("-")) stack.push(val2 - val1);
                else if(c.equals("*")) stack.push(val2 * val1);
                else if(c.equals("/")) stack.push(val2 / val1);
            } else {
                stack.push(Integer.parseInt(c));
            }
        }
        System.out.println(stack.pop());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
#include <vector>
using namespace std;
int main() {
    vector<string> exp = {"2", "3", "1", "*", "+", "9", "-"};
    stack<int> s;
    for(string c : exp) {
        if(c == "+" || c == "-" || c == "*" || c == "/") {
            int val1 = s.top(); s.pop(); int val2 = s.top(); s.pop();
            if(c == "+") s.push(val2 + val1);
            else if(c == "-") s.push(val2 - val1);
            else if(c == "*") s.push(val2 * val1);
            else if(c == "/") s.push(val2 / val1);
        } else {
            s.push(stoi(c));
        }
    }
    cout << s.top() << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Evaluate Postfix.\\n"); return 0; }`
  },
  '14. Celebrity Problem': {
    javascript: `// Celebrity Problem
console.log("Celebrity problem finds a person who knows no one but everyone knows them, usually O(N) using stack or two pointers.");`,
    python: `print("Celebrity problem finds a person who knows no one but everyone knows them.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Celebrity Problem."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Celebrity Problem." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Celebrity Problem.\\n"); return 0; }`
  },
  '15. Remove K Digits': {
    javascript: `// Remove K Digits to form smallest number
function removeKdigits(num, k) {
    let stack = [];
    for(let c of num) {
        while(k > 0 && stack.length && stack[stack.length-1] > c) { stack.pop(); k--; }
        stack.push(c);
    }
    stack.length = stack.length - k;
    let res = stack.join('').replace(/^0+/, '');
    return res === "" ? "0" : res;
}
console.log(removeKdigits("1432219", 3));`,
    python: `def remove_kdigits(num, k):
    stack = []
    for c in num:
        while k > 0 and stack and stack[-1] > c: stack.pop(); k -= 1
        stack.append(c)
    if k > 0: stack = stack[:-k]
    res = "".join(stack).lstrip('0')
    return res if res else "0"
print(remove_kdigits("1432219", 3))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        String num = "1432219"; int k = 3;
        Stack<Character> stack = new Stack<>();
        for(char c : num.toCharArray()) {
            while(k > 0 && !stack.isEmpty() && stack.peek() > c) { stack.pop(); k--; }
            stack.push(c);
        }
        while(k-- > 0) stack.pop();
        StringBuilder sb = new StringBuilder();
        for(char c : stack) sb.append(c);
        while(sb.length() > 1 && sb.charAt(0) == '0') sb.deleteCharAt(0);
        System.out.println(sb.length() == 0 ? "0" : sb.toString());
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() { cout << "Remove K Digits uses Monotonic Stack." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Remove K Digits.\\n"); return 0; }`
  },
  '16. Stack using Two Queues': {
    javascript: `// Same as Queue using Stacks, but flipped
console.log("Stack using Two Queues pushes to Q2, enqueues Q1 to Q2, then swaps names.");`,
    python: `print("Stack using Two Queues.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Stack using Queues."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Stack using Queues." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Stack using Queues.\\n"); return 0; }`
  }
};
