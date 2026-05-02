export const RECURSION_PROBLEMS_PART2 = {
  // --- RECURSION CONCEPTS ---
  'Mental Model: Trust recursion': {
    javascript: `console.log("Trust the recursive leap of faith: assume the recursive call works for smaller inputs.");`,
    python: `print("Trust the recursive leap of faith.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Trust the recursion."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Trust the recursion." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Trust the recursion.\\n"); return 0; }`
  },
  'base case': {
    javascript: `console.log("Base case: The condition that stops the recursion to prevent infinite loops.");`,
    python: `print("Base case prevents infinite recursion.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Base case prevents StackOverflow."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Base case stops recursion." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Base case.\\n"); return 0; }`
  },
  'recursive call': {
    javascript: `console.log("Recursive call: The function calls itself with a modified (usually smaller) input.");`,
    python: `print("Recursive call: function calls itself.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Function calls itself."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Recursive call." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Recursive call.\\n"); return 0; }`
  },
  'Tree Template': {
    javascript: `console.log("Tree Template: Make multiple recursive calls per function (like left and right nodes in a tree).");`,
    python: `print("Tree Template uses multiple recursive calls.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Tree Template."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Tree Template." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Tree Template.\\n"); return 0; }`
  },
  'Types (Linear, Tree, Tail, Head, Mutual)': {
    javascript: `console.log("Types of Recursion: Linear (1 call), Tree (>1 call), Tail (last action), Head (first action), Mutual (A calls B, B calls A).");`,
    python: `print("Linear, Tree, Tail, Head, Mutual recursion types.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Recursion Types."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Recursion Types." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Recursion Types.\\n"); return 0; }`
  },

  // --- TOP 20 RECURSION PROBLEMS ---
  '01. Print': {
    javascript: `function printN(n) {
    if(n === 0) return;
    printN(n - 1);
    console.log(n);
}
printN(5);`,
    python: `def print_n(n):
    if n == 0: return
    print_n(n - 1)
    print(n)
print_n(5)`,
    java: `public class YourClassName {
    public static void printN(int n) {
        if(n == 0) return;
        printN(n - 1);
        System.out.println(n);
    }
    public static void main(String[] args) {
        printN(5);
    }
}`,
    cpp: `#include <iostream>
using namespace std;
void printN(int n) {
    if(n == 0) return;
    printN(n - 1);
    cout << n << endl;
}
int main() {
    printN(5); return 0;
}`,
    c: `#include <stdio.h>
void printN(int n) {
    if(n == 0) return;
    printN(n - 1);
    printf("%d\\n", n);
}
int main() { printN(5); return 0; }`
  },
  '02. Sum digits': {
    javascript: `function sumDigits(n) {
    if(n === 0) return 0;
    return (n % 10) + sumDigits(Math.floor(n / 10));
}
console.log(sumDigits(1234));`,
    python: `def sum_digits(n):
    if n == 0: return 0
    return (n % 10) + sum_digits(n // 10)
print(sum_digits(1234))`,
    java: `public class YourClassName {
    public static int sumDigits(int n) {
        if(n == 0) return 0;
        return (n % 10) + sumDigits(n / 10);
    }
    public static void main(String[] args) {
        System.out.println(sumDigits(1234));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int sumDigits(int n) {
    if(n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}
int main() {
    cout << sumDigits(1234) << endl; return 0;
}`,
    c: `#include <stdio.h>
int sumDigits(int n) {
    if(n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}
int main() { printf("%d\\n", sumDigits(1234)); return 0; }`
  },
  '03. Factorial': {
    javascript: `function factorial(n) {
    if(n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5));`,
    python: `def factorial(n):
    if n == 0 or n == 1: return 1
    return n * factorial(n - 1)
print(factorial(5))`,
    java: `public class YourClassName {
    public static int factorial(int n) {
        if(n == 0 || n == 1) return 1;
        return n * factorial(n - 1);
    }
    public static void main(String[] args) {
        System.out.println(factorial(5));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int factorial(int n) {
    if(n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}
int main() {
    cout << factorial(5) << endl; return 0;
}`,
    c: `#include <stdio.h>
int factorial(int n) {
    if(n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}
int main() { printf("%d\\n", factorial(5)); return 0; }`
  },
  '04. Power': {
    javascript: `function power(x, n) {
    if(n === 0) return 1;
    let half = power(x, Math.floor(n / 2));
    if(n % 2 === 0) return half * half;
    return x * half * half;
}
console.log(power(2, 5));`,
    python: `def power(x, n):
    if n == 0: return 1
    half = power(x, n // 2)
    if n % 2 == 0: return half * half
    return x * half * half
print(power(2, 5))`,
    java: `public class YourClassName {
    public static int power(int x, int n) {
        if(n == 0) return 1;
        int half = power(x, n / 2);
        if(n % 2 == 0) return half * half;
        return x * half * half;
    }
    public static void main(String[] args) {
        System.out.println(power(2, 5));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int power(int x, int n) {
    if(n == 0) return 1;
    int half = power(x, n / 2);
    if(n % 2 == 0) return half * half;
    return x * half * half;
}
int main() {
    cout << power(2, 5) << endl; return 0;
}`,
    c: `#include <stdio.h>
int power(int x, int n) {
    if(n == 0) return 1;
    int half = power(x, n / 2);
    if(n % 2 == 0) return half * half;
    return x * half * half;
}
int main() { printf("%d\\n", power(2, 5)); return 0; }`
  },
  '06. Fibonacci': {
    javascript: `function fib(n) {
    if(n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
console.log(fib(6));`,
    python: `def fib(n):
    if n <= 1: return n
    return fib(n - 1) + fib(n - 2)
print(fib(6))`,
    java: `public class YourClassName {
    public static int fib(int n) {
        if(n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
    public static void main(String[] args) {
        System.out.println(fib(6));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
int fib(int n) {
    if(n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
int main() {
    cout << fib(6) << endl; return 0;
}`,
    c: `#include <stdio.h>
int fib(int n) {
    if(n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
int main() { printf("%d\\n", fib(6)); return 0; }`
  },
  '07. Array/String reverse': {
    javascript: `function reverse(arr, l, r) {
    if(l >= r) return arr;
    [arr[l], arr[r]] = [arr[r], arr[l]];
    return reverse(arr, l + 1, r - 1);
}
console.log(reverse([1, 2, 3, 4, 5], 0, 4));`,
    python: `def reverse(arr, l, r):
    if l >= r: return arr
    arr[l], arr[r] = arr[r], arr[l]
    return reverse(arr, l + 1, r - 1)
print(reverse([1, 2, 3, 4, 5], 0, 4))`,
    java: `import java.util.*;
public class YourClassName {
    public static void reverse(int[] arr, int l, int r) {
        if(l >= r) return;
        int t = arr[l]; arr[l] = arr[r]; arr[r] = t;
        reverse(arr, l + 1, r - 1);
    }
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5}; reverse(arr, 0, 4);
        System.out.println(Arrays.toString(arr));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
void reverse(vector<int>& arr, int l, int r) {
    if(l >= r) return;
    swap(arr[l], arr[r]);
    reverse(arr, l + 1, r - 1);
}
int main() {
    vector<int> arr = {1, 2, 3, 4, 5}; reverse(arr, 0, 4);
    for(int x : arr) cout << x << " "; cout << endl; return 0;
}`,
    c: `#include <stdio.h>
void reverse(int arr[], int l, int r) {
    if(l >= r) return;
    int t = arr[l]; arr[l] = arr[r]; arr[r] = t;
    reverse(arr, l + 1, r - 1);
}
int main() {
    int arr[] = {1, 2, 3, 4, 5}; reverse(arr, 0, 4);
    for(int i=0; i<5; i++) printf("%d ", arr[i]); return 0;
}`
  },
  '08. Palindrome': {
    javascript: `function isPalindrome(s, l, r) {
    if(l >= r) return true;
    if(s[l] !== s[r]) return false;
    return isPalindrome(s, l + 1, r - 1);
}
console.log(isPalindrome("racecar", 0, 6));`,
    python: `def is_palindrome(s, l, r):
    if l >= r: return True
    if s[l] != s[r]: return False
    return is_palindrome(s, l + 1, r - 1)
print(is_palindrome("racecar", 0, 6))`,
    java: `public class YourClassName {
    public static boolean isPalindrome(String s, int l, int r) {
        if(l >= r) return true;
        if(s.charAt(l) != s.charAt(r)) return false;
        return isPalindrome(s, l + 1, r - 1);
    }
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar", 0, 6));
    }
}`,
    cpp: `#include <iostream>
using namespace std;
bool isPalindrome(string s, int l, int r) {
    if(l >= r) return true;
    if(s[l] != s[r]) return false;
    return isPalindrome(s, l + 1, r - 1);
}
int main() {
    cout << (isPalindrome("racecar", 0, 6) ? "true" : "false") << endl; return 0;
}`,
    c: `#include <stdio.h>
#include <stdbool.h>
bool isPalindrome(char s[], int l, int r) {
    if(l >= r) return true;
    if(s[l] != s[r]) return false;
    return isPalindrome(s, l + 1, r - 1);
}
int main() { printf("%s\\n", isPalindrome("racecar", 0, 6) ? "true" : "false"); return 0; }`
  },
  '09. Binary search': {
    javascript: `function binarySearch(arr, target, l, r) {
    if(l > r) return -1;
    let mid = Math.floor(l + (r - l) / 2);
    if(arr[mid] === target) return mid;
    if(arr[mid] > target) return binarySearch(arr, target, l, mid - 1);
    return binarySearch(arr, target, mid + 1, r);
}
console.log(binarySearch([1, 2, 3, 4, 5], 4, 0, 4));`,
    python: `def binary_search(arr, target, l, r):
    if l > r: return -1
    mid = l + (r - l) // 2
    if arr[mid] == target: return mid
    if arr[mid] > target: return binary_search(arr, target, l, mid - 1)
    return binary_search(arr, target, mid + 1, r)
print(binary_search([1, 2, 3, 4, 5], 4, 0, 4))`,
    java: `public class YourClassName {
    public static int binarySearch(int[] arr, int target, int l, int r) {
        if(l > r) return -1;
        int mid = l + (r - l) / 2;
        if(arr[mid] == target) return mid;
        if(arr[mid] > target) return binarySearch(arr, target, l, mid - 1);
        return binarySearch(arr, target, mid + 1, r);
    }
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println(binarySearch(arr, 4, 0, 4));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int binarySearch(vector<int>& arr, int target, int l, int r) {
    if(l > r) return -1;
    int mid = l + (r - l) / 2;
    if(arr[mid] == target) return mid;
    if(arr[mid] > target) return binarySearch(arr, target, l, mid - 1);
    return binarySearch(arr, target, mid + 1, r);
}
int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    cout << binarySearch(arr, 4, 0, 4) << endl; return 0;
}`,
    c: `#include <stdio.h>
int binarySearch(int arr[], int target, int l, int r) {
    if(l > r) return -1;
    int mid = l + (r - l) / 2;
    if(arr[mid] == target) return mid;
    if(arr[mid] > target) return binarySearch(arr, target, l, mid - 1);
    return binarySearch(arr, target, mid + 1, r);
}
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printf("%d\\n", binarySearch(arr, 4, 0, 4)); return 0;
}`
  },
  '11. Merge/Quick sort': {
    javascript: `// Recursion is heavily used in Sorting algorithms
console.log("Merge Sort and Quick Sort use recursive divide and conquer.");`,
    python: `print("Merge Sort and Quick Sort use recursive divide and conquer.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Merge/Quick Sort use recursion."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Merge/Quick Sort." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Merge/Quick Sort.\\n"); return 0; }`
  },
  '13. Tower of Hanoi': {
    javascript: `function hanoi(n, source, auxiliary, target) {
    if(n === 0) return;
    hanoi(n - 1, source, target, auxiliary);
    console.log(\`Move disk \${n} from \${source} to \${target}\`);
    hanoi(n - 1, auxiliary, source, target);
}
hanoi(3, 'A', 'B', 'C');`,
    python: `def hanoi(n, source, auxiliary, target):
    if n == 0: return
    hanoi(n - 1, source, target, auxiliary)
    print(f"Move disk {n} from {source} to {target}")
    hanoi(n - 1, auxiliary, source, target)
hanoi(3, 'A', 'B', 'C')`,
    java: `public class YourClassName {
    public static void hanoi(int n, char source, char auxiliary, char target) {
        if(n == 0) return;
        hanoi(n - 1, source, target, auxiliary);
        System.out.println("Move disk " + n + " from " + source + " to " + target);
        hanoi(n - 1, auxiliary, source, target);
    }
    public static void main(String[] args) {
        hanoi(3, 'A', 'B', 'C');
    }
}`,
    cpp: `#include <iostream>
using namespace std;
void hanoi(int n, char source, char auxiliary, char target) {
    if(n == 0) return;
    hanoi(n - 1, source, target, auxiliary);
    cout << "Move disk " << n << " from " << source << " to " << target << endl;
    hanoi(n - 1, auxiliary, source, target);
}
int main() {
    hanoi(3, 'A', 'B', 'C'); return 0;
}`,
    c: `#include <stdio.h>
void hanoi(int n, char source, char auxiliary, char target) {
    if(n == 0) return;
    hanoi(n - 1, source, target, auxiliary);
    printf("Move disk %d from %c to %c\\n", n, source, target);
    hanoi(n - 1, auxiliary, source, target);
}
int main() { hanoi(3, 'A', 'B', 'C'); return 0; }`
  },
  '15. Subsets': {
    javascript: `// Subsets (Also a backtracking problem)
console.log("Subsets uses a take/not-take recursive decision tree.");`,
    python: `print("Subsets uses a take/not-take decision tree.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Subsets recursive tree."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Subsets recursive tree." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Subsets.\\n"); return 0; }`
  },
  '16. Permutations': {
    javascript: `// Permutations
console.log("Permutations uses swapping and backtracking recursively.");`,
    python: `print("Permutations uses swapping and backtracking recursively.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Permutations uses recursion."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Permutations." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Permutations.\\n"); return 0; }`
  },
  '17. Rat in maze': {
    javascript: `// Rat in a Maze
console.log("Rat in Maze uses 4-directional recursion with backtracking.");`,
    python: `print("Rat in Maze uses 4-directional recursion.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Rat in Maze recursion."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Rat in Maze." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Rat in Maze.\\n"); return 0; }`
  },
  '18. Flood fill': {
    javascript: `// Flood Fill
console.log("Flood Fill uses 4-directional recursion to paint connected identical colors.");`,
    python: `print("Flood Fill uses 4-directional DFS recursion.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Flood Fill DFS."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Flood Fill DFS." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Flood Fill DFS.\\n"); return 0; }`
  },
  '19. N-Queens': {
    javascript: `// N-Queens
console.log("N-Queens places a queen row by row and recurses if safe.");`,
    python: `print("N-Queens places a queen row by row and recurses.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("N-Queens recursion."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "N-Queens." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("N-Queens.\\n"); return 0; }`
  },
  '20. Sudoku': {
    javascript: `// Sudoku Solver
console.log("Sudoku tries digits 1-9 recursively for empty cells.");`,
    python: `print("Sudoku tries digits 1-9 recursively.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Sudoku backtracking."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Sudoku." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Sudoku.\\n"); return 0; }`
  }
};
