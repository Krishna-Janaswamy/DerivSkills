export const STAGE1_PROBLEMS_CODE = {
  'Pick Your Language': {
    javascript: `// Hello World in JavaScript
console.log("Welcome to DSA in JavaScript!");
// Run this to verify your environment works.`,
    python: `# Hello World in Python
print("Welcome to DSA in Python!")
# Run this to verify your environment works.`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("Welcome to DSA in Java!");
    }
}`,
    cpp: `// Hello World in C++
#include <iostream>
using namespace std;
int main() {
    cout << "Welcome to DSA in C++!" << endl;
    return 0;
}`,
    c: `// Hello World in C
#include <stdio.h>
int main() {
    printf("Welcome to DSA in C!\\n");
    return 0;
}`
  },
  'Variables': {
    javascript: `// Variables
function execute() {
    let a = 10;
    const b = 20;
    var c = 30;
    console.log("Variables:", a, b, c);
}
execute();`,
    python: `# Variables
def execute():
    a = 10
    b = 20
    c = 30
    print("Variables:", a, b, c)
execute()`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int a = 10;
        final int b = 20;
        int c = 30;
        System.out.println("Variables: " + a + " " + b + " " + c);
    }
}`,
    cpp: `// Variables
#include <iostream>
using namespace std;
int main() {
    int a = 10;
    const int b = 20;
    int c = 30;
    cout << "Variables: " << a << " " << b << " " << c << endl;
    return 0;
}`,
    c: `// Variables
#include <stdio.h>
int main() {
    int a = 10;
    const int b = 20;
    int c = 30;
    printf("Variables: %d %d %d\\n", a, b, c);
    return 0;
}`
  },
  'Data Types': {
    javascript: `// Data Types
function execute() {
    let num = 42;
    let str = "Hello";
    let bool = true;
    let obj = { key: "value" };
    console.log("Types:", typeof num, typeof str, typeof bool, typeof obj);
}
execute();`,
    python: `# Data Types
def execute():
    num = 42
    string = "Hello"
    boolean = True
    print("Types:", type(num), type(string), type(boolean))
execute()`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int num = 42;
        String str = "Hello";
        boolean bool = true;
        System.out.println("Integer: " + num + ", String: " + str + ", Boolean: " + bool);
    }
}`,
    cpp: `// Data Types
#include <iostream>
#include <string>
using namespace std;
int main() {
    int num = 42;
    string str = "Hello";
    bool b = true;
    cout << "Integer: " << num << ", String: " << str << ", Boolean: " << b << endl;
    return 0;
}`,
    c: `// Data Types
#include <stdio.h>
#include <stdbool.h>
int main() {
    int num = 42;
    char* str = "Hello";
    bool b = true;
    printf("Integer: %d, String: %s, Boolean: %d\\n", num, str, b);
    return 0;
}`
  },
  'Operators': {
    javascript: `// Operators
function execute() {
    let sum = 5 + 3;
    let mul = 5 * 3;
    let rem = 5 % 3;
    console.log("Sum:", sum, "Mul:", mul, "Rem:", rem);
}
execute();`,
    python: `# Operators
def execute():
    sum_val = 5 + 3
    mul_val = 5 * 3
    rem_val = 5 % 3
    print("Sum:", sum_val, "Mul:", mul_val, "Rem:", rem_val)
execute()`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int sum = 5 + 3;
        int mul = 5 * 3;
        int rem = 5 % 3;
        System.out.println("Sum: " + sum + ", Mul: " + mul + ", Rem: " + rem);
    }
}`,
    cpp: `// Operators
#include <iostream>
using namespace std;
int main() {
    int sum = 5 + 3;
    int mul = 5 * 3;
    int rem = 5 % 3;
    cout << "Sum: " << sum << ", Mul: " << mul << ", Rem: " << rem << endl;
    return 0;
}`,
    c: `// Operators
#include <stdio.h>
int main() {
    int sum = 5 + 3;
    int mul = 5 * 3;
    int rem = 5 % 3;
    printf("Sum: %d, Mul: %d, Rem: %d\\n", sum, mul, rem);
    return 0;
}`
  },
  'Conditionals': {
    javascript: `// Conditionals
function execute(val) {
    if (val > 10) console.log("Greater than 10");
    else if (val === 10) console.log("Exactly 10");
    else console.log("Less than 10");
}
execute(15);`,
    python: `# Conditionals
def execute(val):
    if val > 10:
        print("Greater than 10")
    elif val == 10:
        print("Exactly 10")
    else:
        print("Less than 10")
execute(15)`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int val = 15;
        if (val > 10) System.out.println("Greater than 10");
        else if (val == 10) System.out.println("Exactly 10");
        else System.out.println("Less than 10");
    }
}`,
    cpp: `// Conditionals
#include <iostream>
using namespace std;
int main() {
    int val = 15;
    if (val > 10) cout << "Greater than 10" << endl;
    else if (val == 10) cout << "Exactly 10" << endl;
    else cout << "Less than 10" << endl;
    return 0;
}`,
    c: `// Conditionals
#include <stdio.h>
int main() {
    int val = 15;
    if (val > 10) printf("Greater than 10\\n");
    else if (val == 10) printf("Exactly 10\\n");
    else printf("Less than 10\\n");
    return 0;
}`
  },
  'Loops': {
    javascript: `// Loops
function execute() {
    for (let i = 0; i < 3; i++) {
        console.log("For loop:", i);
    }
    let j = 0;
    while(j < 3) {
        console.log("While loop:", j);
        j++;
    }
}
execute();`,
    python: `# Loops
def execute():
    for i in range(3):
        print("For loop:", i)
    j = 0
    while j < 3:
        print("While loop:", j)
        j += 1
execute()`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println("For loop: " + i);
        }
        int j = 0;
        while(j < 3) {
            System.out.println("While loop: " + j);
            j++;
        }
    }
}`,
    cpp: `// Loops
#include <iostream>
using namespace std;
int main() {
    for (int i = 0; i < 3; i++) {
        cout << "For loop: " << i << endl;
    }
    int j = 0;
    while(j < 3) {
        cout << "While loop: " << j << endl;
        j++;
    }
    return 0;
}`,
    c: `// Loops
#include <stdio.h>
int main() {
    for (int i = 0; i < 3; i++) {
        printf("For loop: %d\\n", i);
    }
    int j = 0;
    while(j < 3) {
        printf("While loop: %d\\n", j);
        j++;
    }
    return 0;
}`
  },
  'Functions': {
    javascript: `// Functions
function add(a, b) {
    return a + b;
}
console.log("Result:", add(3, 4));`,
    python: `# Functions
def add(a, b):
    return a + b
print("Result:", add(3, 4))`,
    java: `public class YourClassName {
    public static int add(int a, int b) {
        return a + b;
    }
    public static void main(String[] args) {
        System.out.println("Result: " + add(3, 4));
    }
}`,
    cpp: `// Functions
#include <iostream>
using namespace std;
int add(int a, int b) {
    return a + b;
}
int main() {
    cout << "Result: " << add(3, 4) << endl;
    return 0;
}`,
    c: `// Functions
#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main() {
    printf("Result: %d\\n", add(3, 4));
    return 0;
}`
  },
  'Arrays Basics': {
    javascript: `// Arrays & Strings
function execute() {
    let arr1D = [1, 2, 3];
    let arr2D = [[1, 2], [3, 4]];
    let str = "hello";
    console.log("1D:", arr1D, "2D:", arr2D, "String length:", str.length);
}
execute();`,
    python: `# Arrays & Strings
def execute():
    arr1D = [1, 2, 3]
    arr2D = [[1, 2], [3, 4]]
    string = "hello"
    print("1D:", arr1D, "2D:", arr2D, "String length:", len(string))
execute()`,
    java: `// Arrays & Strings
import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr1D = {1, 2, 3};
        int[][] arr2D = {{1, 2}, {3, 4}};
        String str = "hello";
        System.out.println("1D: " + Arrays.toString(arr1D));
        System.out.println("String length: " + str.length());
    }
}`,
    cpp: `// Arrays & Strings
#include <iostream>
#include <vector>
#include <string>
using namespace std;
int main() {
    vector<int> arr1D = {1, 2, 3};
    vector<vector<int>> arr2D = {{1, 2}, {3, 4}};
    string str = "hello";
    cout << "1D Size: " << arr1D.size() << ", String length: " << str.length() << endl;
    return 0;
}`,
    c: `// Arrays & Strings
#include <stdio.h>
#include <string.h>
int main() {
    int arr1D[] = {1, 2, 3};
    int arr2D[2][2] = {{1, 2}, {3, 4}};
    char* str = "hello";
    printf("1D Array first element: %d, String length: %lu\\n", arr1D[0], strlen(str));
    return 0;
}`
  },
  'Basic OOP': {
    javascript: `// Basic OOP
class Person {
    constructor(name) { this.name = name; }
    greet() { console.log("Hello, " + this.name); }
}
new Person("Alice").greet();`,
    python: `# Basic OOP
class Person:
    def __init__(self, name):
        self.name = name
    def greet(self):
        print("Hello, " + self.name)
Person("Alice").greet()`,
    java: `// Basic OOP
class Person {
    String name;
    Person(String name) { this.name = name; }
    void greet() { System.out.println("Hello, " + name); }
}
public class YourClassName {
    public static void main(String[] args) {
        new Person("Alice").greet();
    }
}`,
    cpp: `// Basic OOP
#include <iostream>
#include <string>
using namespace std;
class Person {
public:
    string name;
    Person(string n) : name(n) {}
    void greet() { cout << "Hello, " << name << endl; }
};
int main() {
    Person p("Alice");
    p.greet();
    return 0;
}`,
    c: `// C does not have native OOP, using struct
#include <stdio.h>
struct Person {
    char* name;
};
void greet(struct Person p) {
    printf("Hello, %s\\n", p.name);
}
int main() {
    struct Person p = {"Alice"};
    greet(p);
    return 0;
}`
  },
  'Time Space Complexity Basics': {
    javascript: `// Complexity
console.log("Time Complexity evaluates how execution time scales.");
console.log("Space Complexity evaluates how memory scales.");`,
    python: `# Complexity
print("Time Complexity evaluates how execution time scales.")
print("Space Complexity evaluates how memory scales.")`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("Time Complexity evaluates how execution time scales.");
        System.out.println("Space Complexity evaluates how memory scales.");
    }
}`,
    cpp: `// Complexity
#include <iostream>
using namespace std;
int main() {
    cout << "Time Complexity evaluates how execution time scales." << endl;
    cout << "Space Complexity evaluates how memory scales." << endl;
    return 0;
}`,
    c: `// Complexity
#include <stdio.h>
int main() {
    printf("Time Complexity evaluates how execution time scales.\\n");
    printf("Space Complexity evaluates how memory scales.\\n");
    return 0;
}`
  },
  'Big O Notation': {
    javascript: `// Big O Notation
console.log("O(1) - Constant: direct array access");
console.log("O(log n) - Logarithmic: Binary search");
console.log("O(n) - Linear: For loop");
console.log("O(n²) - Quadratic: Nested for loops");`,
    python: `# Big O Notation
print("O(1) - Constant: direct array access")
print("O(log n) - Logarithmic: Binary search")
print("O(n) - Linear: For loop")
print("O(n²) - Quadratic: Nested for loops")`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("O(1) - Constant: direct array access");
        System.out.println("O(n) - Linear: For loop");
    }
}`,
    cpp: `// Big O Notation
#include <iostream>
using namespace std;
int main() {
    cout << "O(1) - Constant: direct array access" << endl;
    cout << "O(n) - Linear: For loop" << endl;
    return 0;
}`,
    c: `// Big O Notation
#include <stdio.h>
int main() {
    printf("O(1) - Constant: direct array access\\n");
    printf("O(n) - Linear: For loop\\n");
    return 0;
}`
  },
  'Drop Constants Rule': {
    javascript: `// Rules
console.log("O(2N) becomes O(N)");
console.log("O(N² + N) becomes O(N²)");`,
    python: `# Rules
print("O(2N) becomes O(N)")
print("O(N² + N) becomes O(N²)")`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("O(2N) becomes O(N)");
        System.out.println("O(N^2 + N) becomes O(N^2)");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "O(2N) becomes O(N)" << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    printf("O(2N) becomes O(N)\\n");
    return 0;
}`
  },
  'Sequential Steps Rule': {
    javascript: `// Sequential Steps
function sequential(n, m) {
    for(let i=0; i<n; i++) {} // O(n)
    for(let j=0; j<m; j++) {} // O(m)
    // Total = O(n + m)
    console.log("Executed sequential O(n+m)");
}
sequential(5, 5);`,
    python: `# Sequential Steps
def sequential(n, m):
    for i in range(n): pass
    for j in range(m): pass
    print("Executed sequential O(n+m)")
sequential(5, 5)`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int n = 5, m = 5;
        for(int i=0; i<n; i++) {}
        for(int j=0; j<m; j++) {}
        System.out.println("Executed sequential O(n+m)");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    int n=5, m=5;
    for(int i=0; i<n; i++) {}
    for(int j=0; j<m; j++) {}
    cout << "Executed sequential O(n+m)" << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int n=5, m=5;
    for(int i=0; i<n; i++) {}
    for(int j=0; j<m; j++) {}
    printf("Executed sequential O(n+m)\\n");
    return 0;
}`
  },
  'Nested Steps Rule': {
    javascript: `// Nested Steps
function nested(n, m) {
    let count = 0;
    for(let i=0; i<n; i++) {
        for(let j=0; j<m; j++) {
            count++;
        }
    }
    console.log("Executed inner loop " + count + " times. O(n*m)");
}
nested(3, 4);`,
    python: `# Nested Steps
def nested(n, m):
    count = 0
    for i in range(n):
        for j in range(m):
            count += 1
    print(f"Executed inner loop {count} times. O(n*m)")
nested(3, 4)`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int n=3, m=4, count=0;
        for(int i=0; i<n; i++) {
            for(int j=0; j<m; j++) count++;
        }
        System.out.println("Executed inner loop " + count + " times. O(n*m)");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    int n=3, m=4, count=0;
    for(int i=0; i<n; i++) {
        for(int j=0; j<m; j++) count++;
    }
    cout << "Executed inner loop " << count << " times. O(n*m)" << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int n=3, m=4, count=0;
    for(int i=0; i<n; i++) {
        for(int j=0; j<m; j++) count++;
    }
    printf("Executed inner loop %d times. O(n*m)\\n", count);
    return 0;
}`
  },
  'Loop Complexities': {
    javascript: `// Loop complexities
console.log("Single: O(n)");
console.log("Nested: O(n²)");
console.log("Halving: i=i/2 -> O(log n)");`,
    python: `# Loop complexities
print("Single: O(n)")
print("Nested: O(n²)")
print("Halving: i=i//2 -> O(log n)")`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("Halving loop runs in O(log n)");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Halving loop runs in O(log n)" << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    printf("Halving loop runs in O(log n)\\n");
    return 0;
}`
  },
  'Space Complexity Basics': {
    javascript: `// Space Complexity
console.log("Total Space = Input Space + Auxiliary Space");
console.log("Recursion stack depth counts toward auxiliary space.");`,
    python: `# Space Complexity
print("Total Space = Input Space + Auxiliary Space")
print("Recursion stack depth counts toward auxiliary space.")`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        System.out.println("Total Space = Input Space + Auxiliary Space");
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Total Space = Input Space + Auxiliary Space" << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    printf("Total Space = Input Space + Auxiliary Space\\n");
    return 0;
}`
  }
};
