export const RECURSION_PROBLEMS_CODE = {
  '01. Print': {
    javascript: `// Factorial recursion
function factorial(n) {
    if(n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5));`,
    python: `# Factorial recursion
def factorial(n):
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
    cpp: `// Factorial recursion
#include <iostream>
using namespace std;
int factorial(int n) {
    if(n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}
int main() {
    cout << factorial(5) << endl;
    return 0;
}`,
    c: `// Factorial recursion
#include <stdio.h>
int factorial(int n) {
    if(n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}
int main() {
    printf("%d\\n", factorial(5));
    return 0;
}`
  }
};
