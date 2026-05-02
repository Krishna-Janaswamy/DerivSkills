export const ARRAY_PROBLEMS_PART2 = {
  'Pattern: Prefix Sum': {
    javascript: `// Pattern: Prefix Sum
function prefixSum(arr) {
    let p = new Array(arr.length);
    p[0] = arr[0];
    for(let i=1; i<arr.length; i++) p[i] = p[i-1] + arr[i];
    return p;
}
console.log(prefixSum([1, 2, 3, 4]));`,
    python: `# Pattern: Prefix Sum
def prefix_sum(arr):
    p = [0]*len(arr)
    p[0] = arr[0]
    for i in range(1, len(arr)): p[i] = p[i-1] + arr[i]
    return p
print(prefix_sum([1, 2, 3, 4]))`,
    java: `import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4}, p = new int[arr.length];
        p[0] = arr[0];
        for(int i=1; i<arr.length; i++) p[i] = p[i-1] + arr[i];
        System.out.println(Arrays.toString(p));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={1,2,3,4}, p(4);
    p[0]=arr[0];
    for(int i=1; i<4; i++) p[i]=p[i-1]+arr[i];
    for(int x: p) cout << x << " ";
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[]={1,2,3,4}, p[4];
    p[0]=arr[0];
    for(int i=1; i<4; i++) p[i]=p[i-1]+arr[i];
    for(int i=0; i<4; i++) printf("%d ", p[i]);
    return 0;
}`
  },
  'Pattern: Two Pointer': {
    javascript: `// Pattern: Two Pointer (Reverse Array)
function twoPointer(arr) {
    let l=0, r=arr.length-1;
    while(l<r) { [arr[l], arr[r]] = [arr[r], arr[l]]; l++; r--; }
    return arr;
}
console.log(twoPointer([1,2,3,4]));`,
    python: `# Pattern: Two Pointer
def two_pointer(arr):
    l, r = 0, len(arr)-1
    while l<r:
        arr[l], arr[r] = arr[r], arr[l]
        l+=1; r-=1
    return arr
print(two_pointer([1,2,3,4]))`,
    java: `import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1,2,3,4};
        int l=0, r=arr.length-1;
        while(l<r) { int t=arr[l]; arr[l]=arr[r]; arr[r]=t; l++; r--; }
        System.out.println(Arrays.toString(arr));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={1,2,3,4};
    int l=0, r=3;
    while(l<r) swap(arr[l++], arr[r--]);
    for(int x: arr) cout << x << " ";
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[]={1,2,3,4};
    int l=0, r=3;
    while(l<r) { int t=arr[l]; arr[l]=arr[r]; arr[r]=t; l++; r--; }
    for(int i=0; i<4; i++) printf("%d ", arr[i]);
    return 0;
}`
  },
  'Pattern: Kadane Algorithm': {
    javascript: `// Kadane's Algorithm
function kadane(arr) {
    let maxSoFar = arr[0], maxEndingHere = arr[0];
    for(let i=1; i<arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}
console.log(kadane([-2,1,-3,4,-1,2,1,-5,4]));`,
    python: `# Kadane's Algorithm
def kadane(arr):
    max_so_far = max_ending_here = arr[0]
    for x in arr[1:]:
        max_ending_here = max(x, max_ending_here + x)
        max_so_far = max(max_so_far, max_ending_here)
    return max_so_far
print(kadane([-2,1,-3,4,-1,2,1,-5,4]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {-2,1,-3,4,-1,2,1,-5,4};
        int maxSoFar = arr[0], maxEndingHere = arr[0];
        for(int i=1; i<arr.length; i++) {
            maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        System.out.println(maxSoFar);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={-2,1,-3,4,-1,2,1,-5,4};
    int maxSoFar = arr[0], maxEndingHere = arr[0];
    for(int i=1; i<arr.size(); i++) {
        maxEndingHere = max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = max(maxSoFar, maxEndingHere);
    }
    cout << maxSoFar << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
int main() {
    int arr[]={-2,1,-3,4,-1,2,1,-5,4};
    int maxSoFar = arr[0], maxEndingHere = arr[0];
    for(int i=1; i<9; i++) {
        maxEndingHere = MAX(arr[i], maxEndingHere + arr[i]);
        maxSoFar = MAX(maxSoFar, maxEndingHere);
    }
    printf("%d\\n", maxSoFar);
    return 0;
}`
  },
  '11. Kadane Max Subarray': {
    javascript: `// Same as Kadane pattern
function kadane(arr) { let m=arr[0], e=arr[0]; for(let i=1; i<arr.length; i++) { e = Math.max(arr[i], e+arr[i]); m = Math.max(m,e); } return m; }
console.log(kadane([-2,1,-3,4,-1,2,1,-5,4]));`,
    python: `def kadane(arr): m=e=arr[0]; 
for x in arr[1:]: e=max(x,e+x); m=max(m,e)
print(kadane([-2,1,-3,4,-1,2,1,-5,4]))`,
    java: `public class YourClassName { public static void main(String[] args) { int[] a={-2,1,-3,4,-1,2,1,-5,4}; int m=a[0], e=a[0]; for(int i=1;i<a.length;i++){e=Math.max(a[i],e+a[i]); m=Math.max(m,e);} System.out.println(m); } }`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() { vector<int> a={-2,1,-3,4,-1,2,1,-5,4}; int m=a[0], e=a[0]; for(int i=1;i<a.size();i++){e=max(a[i],e+a[i]); m=max(m,e);} cout<<m; return 0; }`,
    c: `#include <stdio.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
int main() { int a[]={-2,1,-3,4,-1,2,1,-5,4}, m=a[0], e=a[0]; for(int i=1;i<9;i++){e=MAX(a[i],e+a[i]); m=MAX(m,e);} printf("%d",m); return 0; }`
  },
  '08. Missing Number': {
    javascript: `function missingNumber(arr, n) {
    let sum = (n * (n + 1)) / 2;
    let actualSum = arr.reduce((a, b) => a + b, 0);
    return sum - actualSum;
}
console.log(missingNumber([1, 2, 4, 5], 5));`,
    python: `def missing_number(arr, n):
    return (n * (n + 1)) // 2 - sum(arr)
print(missing_number([1, 2, 4, 5], 5))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 5}; int n = 5;
        int sum = (n * (n + 1)) / 2;
        for(int x : arr) sum -= x;
        System.out.println(sum);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr = {1, 2, 4, 5}; int n = 5;
    int sum = (n * (n + 1)) / 2;
    for(int x : arr) sum -= x;
    cout << sum << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {1, 2, 4, 5}, n = 5;
    int sum = (n * (n + 1)) / 2;
    for(int i=0; i<4; i++) sum -= arr[i];
    printf("%d\\n", sum);
    return 0;
}`
  }
};
