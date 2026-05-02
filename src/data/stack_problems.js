export const STACK_PROBLEMS_CODE = {
  'Stack Concept LIFO': {
    javascript: `// Stack Concept: LIFO (Last In, First Out)
// The last element added to the stack is the first one to be removed.
function stackConcept() {
    let stack = [];
    stack.push("Book 1"); // Push
    stack.push("Book 2"); // Push
    console.log("Stack:", stack);
    console.log("Removed:", stack.pop()); // Pop (Book 2 is removed first)
    console.log("Stack after pop:", stack);
}
stackConcept();`,
    python: `# Stack Concept: LIFO (Last In, First Out)
def stack_concept():
    stack = []
    stack.append("Book 1") # Push
    stack.append("Book 2") # Push
    print("Stack:", stack)
    print("Removed:", stack.pop()) # Pop (Book 2 is removed first)
    print("Stack after pop:", stack)
stack_concept()`,
    java: `import java.util.Stack;
public class YourClassName {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();
        stack.push("Book 1");
        stack.push("Book 2");
        System.out.println("Stack: " + stack);
        System.out.println("Removed: " + stack.pop());
        System.out.println("Stack after pop: " + stack);
    }
}`,
    cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;
int main() {
    stack<string> s;
    s.push("Book 1");
    s.push("Book 2");
    cout << "Removed: " << s.top() << endl;
    s.pop();
    cout << "Next to remove: " << s.top() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    char* stack[] = {"Book 1", "Book 2"};
    int top = 1;
    printf("Removed: %s\\n", stack[top--]);
    printf("Next to remove: %s\\n", stack[top]);
    return 0;
}`
  },
  '01. Implement with Array': {
    javascript: `// Implement Stack using Array
class Stack {
    constructor() { this.items = []; }
    push(element) { this.items.push(element); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
}
const s = new Stack();
s.push(10); s.push(20);
console.log(s.pop());`,
    python: `# Implement Stack using List
class Stack:
    def __init__(self): self.items = []
    def push(self, item): self.items.append(item)
    def pop(self): return self.items.pop() if self.items else None
    def peek(self): return self.items[-1] if self.items else None
    def is_empty(self): return len(self.items) == 0
s = Stack()
s.push(10); s.push(20)
print(s.pop())`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(10); s.push(20);
        System.out.println(s.pop());
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
int main() {
    stack<int> s;
    s.push(10); s.push(20);
    cout << s.top() << endl; s.pop();
    return 0;
}`,
    c: `#include <stdio.h>
#define MAX 100
int stack[MAX], top = -1;
void push(int val) { if(top < MAX-1) stack[++top] = val; }
int pop() { return top >= 0 ? stack[top--] : -1; }
int main() {
    push(10); push(20);
    printf("%d\\n", pop());
    return 0;
}`
  },
  '03. Balanced Brackets': {
    javascript: `function isValid(s) {
    const stack = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };
    for (let char of s) {
        if (pairs[char]) stack.push(char);
        else if (pairs[stack.pop()] !== char) return false;
    }
    return stack.length === 0;
}
console.log(isValid("(){}[]"));`,
    python: `def is_valid(s):
    stack = []
    pairs = { '(': ')', '{': '}', '[': ']' }
    for char in s:
        if char in pairs: stack.append(char)
        elif not stack or pairs[stack.pop()] != char: return False
    return len(stack) == 0
print(is_valid("(){}[]"))`,
    java: `import java.util.*;
public class YourClassName {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
    public static void main(String[] args) {
        System.out.println(isValid("(){}[]"));
    }
}`,
    cpp: `#include <iostream>
#include <stack>
using namespace std;
bool isValid(string s) {
    stack<char> st;
    for(char c : s) {
        if(c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if(st.empty()) return false;
            char top = st.top(); st.pop();
            if((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}
int main() {
    cout << (isValid("(){}[]") ? "true" : "false") << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>
bool isValid(char* s) {
    char stack[100]; int top = -1;
    for(int i=0; s[i] != '\\0'; i++) {
        if(s[i] == '(' || s[i] == '{' || s[i] == '[') stack[++top] = s[i];
        else {
            if(top == -1) return false;
            char t = stack[top--];
            if((s[i] == ')' && t != '(') || (s[i] == '}' && t != '{') || (s[i] == ']' && t != '[')) return false;
        }
    }
    return top == -1;
}
int main() {
    printf("%s\\n", isValid("(){}[]") ? "true" : "false");
    return 0;
}`
  }
};
