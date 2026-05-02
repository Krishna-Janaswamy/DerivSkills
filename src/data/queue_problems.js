export const QUEUE_PROBLEMS_CODE = {
  'Queue Concept FIFO': {
    javascript: `// Queue Concept: FIFO (First In, First Out)
// The first element added to the queue is the first one to be removed.
function queueConcept() {
    let queue = [];
    queue.push("Alice"); // Enqueue
    queue.push("Bob");   // Enqueue
    console.log("Queue:", queue);
    console.log("Served:", queue.shift()); // Dequeue (Alice is served first)
    console.log("Queue after dequeue:", queue);
}
queueConcept();`,
    python: `# Queue Concept: FIFO (First In, First Out)
def queue_concept():
    queue = []
    queue.append("Alice") # Enqueue
    queue.append("Bob")   # Enqueue
    print("Queue:", queue)
    print("Served:", queue.pop(0)) # Dequeue (Alice is served first)
    print("Queue after dequeue:", queue)
queue_concept()`,
    java: `import java.util.LinkedList;
import java.util.Queue;
public class YourClassName {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        queue.add("Alice"); // Enqueue
        queue.add("Bob");   // Enqueue
        System.out.println("Queue: " + queue);
        System.out.println("Served: " + queue.poll()); // Dequeue
        System.out.println("Queue after dequeue: " + queue);
    }
}`,
    cpp: `#include <iostream>
#include <queue>
#include <string>
using namespace std;
int main() {
    queue<string> q;
    q.push("Alice");
    q.push("Bob");
    cout << "Served: " << q.front() << endl;
    q.pop();
    cout << "Next to serve: " << q.front() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    char* queue[] = {"Alice", "Bob"};
    int front = 0, rear = 2;
    printf("Served: %s\\n", queue[front++]);
    printf("Next to serve: %s\\n", queue[front]);
    return 0;
}`
  },
  'Queue Enqueue': {
    javascript: `// Queue Enqueue (Adding to the back)
class Queue {
    constructor() { this.items = []; }
    enqueue(element) {
        this.items.push(element);
        console.log("Enqueued:", element);
    }
}
let q = new Queue(); q.enqueue(10); q.enqueue(20);`,
    python: `class Queue:
    def __init__(self): self.items = []
    def enqueue(self, item):
        self.items.append(item)
        print("Enqueued:", item)
q = Queue()
q.enqueue(10)
q.enqueue(20)`,
    java: `import java.util.LinkedList;
import java.util.Queue;
public class YourClassName {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.add(10); System.out.println("Enqueued: 10");
        q.add(20); System.out.println("Enqueued: 20");
    }
}`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    queue<int> q;
    q.push(10); cout << "Enqueued: 10\\n";
    q.push(20); cout << "Enqueued: 20\\n";
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int queue[10], rear = 0;
    queue[rear++] = 10; printf("Enqueued: 10\\n");
    queue[rear++] = 20; printf("Enqueued: 20\\n");
    return 0;
}`
  },
  'Queue Dequeue': {
    javascript: `// Queue Dequeue (Removing from the front)
class Queue {
    constructor() { this.items = [10, 20]; }
    dequeue() {
        if (this.items.length === 0) return "Underflow";
        let removed = this.items.shift();
        console.log("Dequeued:", removed);
        return removed;
    }
}
let q = new Queue(); q.dequeue();`,
    python: `class Queue:
    def __init__(self): self.items = [10, 20]
    def dequeue(self):
        if not self.items: return "Underflow"
        removed = self.items.pop(0)
        print("Dequeued:", removed)
        return removed
q = Queue()
q.dequeue()`,
    java: `import java.util.LinkedList;
import java.util.Queue;
public class YourClassName {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.add(10); q.add(20);
        System.out.println("Dequeued: " + q.poll());
    }
}`,
    cpp: `#include <iostream>
#include <queue>
using namespace std;
int main() {
    queue<int> q; q.push(10); q.push(20);
    cout << "Dequeued: " << q.front() << endl; q.pop();
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int queue[] = {10, 20}, front = 0;
    printf("Dequeued: %d\\n", queue[front++]);
    return 0;
}`
  },
  '01. Implement Simple Queue': {
    javascript: `// Implement Simple Queue using Array
class Queue {
    constructor() { this.items = []; }
    enqueue(element) { this.items.push(element); }
    dequeue() { return this.items.shift(); }
    front() { return this.items[0]; }
    isEmpty() { return this.items.length === 0; }
}
const q = new Queue();
q.enqueue(1); q.enqueue(2);
console.log(q.dequeue());`,
    python: `# Implement Simple Queue using List
class Queue:
    def __init__(self): self.items = []
    def enqueue(self, item): self.items.append(item)
    def dequeue(self): return self.items.pop(0) if self.items else None
    def front(self): return self.items[0] if self.items else None
    def is_empty(self): return len(self.items) == 0
q = Queue()
q.enqueue(1); q.enqueue(2)
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
    queue<int> q;
    q.push(1); q.push(2);
    cout << q.front() << endl; q.pop();
    return 0;
}`,
    c: `#include <stdio.h>
#define MAX 100
int queue[MAX], front = 0, rear = 0;
void enqueue(int val) { if(rear < MAX) queue[rear++] = val; }
int dequeue() { return front < rear ? queue[front++] : -1; }
int main() {
    enqueue(1); enqueue(2);
    printf("%d\\n", dequeue());
    return 0;
}`
  }
};
