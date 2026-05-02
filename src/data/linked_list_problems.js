export const LINKED_LIST_PROBLEMS_CODE = {
  'Singly Linked List': {
    javascript: `// Singly Linked List Node
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
// Create nodes
let head = new Node(10);
let second = new Node(20);
head.next = second;
console.log("Head:", head.data, "Next:", head.next.data);`,
    python: `# Singly Linked List Node
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
# Create nodes
head = Node(10)
second = Node(20)
head.next = second
print("Head:", head.data, "Next:", head.next.data)`,
    java: `class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}
public class YourClassName {
    public static void main(String[] args) {
        Node head = new Node(10);
        Node second = new Node(20);
        head.next = second;
        System.out.println("Head: " + head.data + " Next: " + head.next.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node {
    int data;
    Node* next;
    Node(int d) { data = d; next = nullptr; }
};
int main() {
    Node* head = new Node(10);
    Node* second = new Node(20);
    head->next = second;
    cout << "Head: " << head->data << " Next: " << head->next->data << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node {
    int data;
    struct Node* next;
};
int main() {
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    struct Node* second = (struct Node*)malloc(sizeof(struct Node));
    head->data = 10; head->next = second;
    second->data = 20; second->next = NULL;
    printf("Head: %d Next: %d\\n", head->data, head->next->data);
    return 0;
}`
  },
  '03. Reverse Iterative': {
    javascript: `class Node { constructor(d) { this.data=d; this.next=null; } }
function reverseList(head) {
    let prev = null, curr = head;
    while(curr !== null) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}
let head=new Node(1); head.next=new Node(2); head.next.next=new Node(3);
let reversed = reverseList(head);
console.log("Reversed head:", reversed.data);`,
    python: `class Node:
    def __init__(self, d): self.data=d; self.next=None
def reverse_list(head):
    prev, curr = None, head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev
head=Node(1); head.next=Node(2); head.next.next=Node(3)
reversed_head = reverse_list(head)
print("Reversed head:", reversed_head.data)`,
    java: `class Node { int data; Node next; Node(int d) { data=d; next=null; } }
public class YourClassName {
    public static Node reverseList(Node head) {
        Node prev = null, curr = head;
        while(curr != null) {
            Node nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
    public static void main(String[] args) {
        Node head=new Node(1); head.next=new Node(2); head.next.next=new Node(3);
        Node reversed = reverseList(head);
        System.out.println("Reversed head: " + reversed.data);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
struct Node { int data; Node* next; Node(int d) { data=d; next=nullptr; } };
Node* reverseList(Node* head) {
    Node *prev = nullptr, *curr = head;
    while(curr != nullptr) {
        Node* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}
int main() {
    Node* head=new Node(1); head->next=new Node(2); head->next->next=new Node(3);
    Node* reversed = reverseList(head);
    cout << "Reversed head: " << reversed->data << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
struct Node { int data; struct Node* next; };
struct Node* reverseList(struct Node* head) {
    struct Node *prev = NULL, *curr = head;
    while(curr != NULL) {
        struct Node* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}
int main() {
    struct Node* head=(struct Node*)malloc(sizeof(struct Node)); head->data=1;
    struct Node* n2=(struct Node*)malloc(sizeof(struct Node)); n2->data=2; head->next=n2; n2->next=NULL;
    struct Node* reversed = reverseList(head);
    printf("Reversed head: %d\\n", reversed->data);
    return 0;
}`
  }
};
