export const ARRAY_PROBLEMS_CODE = {
  'Array Declaration': {
    javascript: `// Arrays Basics: Declaration
function execute() {
    let arr1 = [10, 20, 30]; // Literal
    let arr2 = new Array(5).fill(0); // With length
    console.log("Array 1:", arr1);
    console.log("Array 2:", arr2);
}
execute();`,
    python: `# Arrays Basics: Declaration
def execute():
    arr1 = [10, 20, 30] # Literal
    arr2 = [0] * 5 # With length
    print("Array 1:", arr1)
    print("Array 2:", arr2)
execute()`,
    java: `// Arrays Basics: Declaration
import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr1 = {10, 20, 30}; // Literal
        int[] arr2 = new int[5]; // With length
        System.out.println("Array 1: " + Arrays.toString(arr1));
        System.out.println("Array 2: " + Arrays.toString(arr2));
    }
}`,
    cpp: `// Arrays Basics: Declaration
#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr1 = {10, 20, 30}; // Literal
    vector<int> arr2(5, 0); // With length
    cout << "Array 1 size: " << arr1.size() << endl;
    cout << "Array 2 size: " << arr2.size() << endl;
    return 0;
}`,
    c: `// Arrays Basics: Declaration
#include <stdio.h>
int main() {
    int arr1[] = {10, 20, 30}; // Literal
    int arr2[5] = {0}; // With length
    printf("Array 1 first element: %d\\n", arr1[0]);
    printf("Array 2 first element: %d\\n", arr2[0]);
    return 0;
}`
  },
  'Array Indexing': {
    javascript: `// Arrays Basics: Indexing
function execute() {
    let arr = [10, 20, 30, 40];
    console.log("First element:", arr[0]);
    console.log("Third element:", arr[2]);
    arr[1] = 99; // Modification
    console.log("Modified Array:", arr);
}
execute();`,
    python: `# Arrays Basics: Indexing
def execute():
    arr = [10, 20, 30, 40]
    print("First element:", arr[0])
    print("Third element:", arr[2])
    arr[1] = 99 # Modification
    print("Modified Array:", arr)
execute()`,
    java: `// Arrays Basics: Indexing
import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40};
        System.out.println("First element: " + arr[0]);
        System.out.println("Third element: " + arr[2]);
        arr[1] = 99; // Modification
        System.out.println("Modified Array: " + Arrays.toString(arr));
    }
}`,
    cpp: `// Arrays Basics: Indexing
#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr = {10, 20, 30, 40};
    cout << "First element: " << arr[0] << endl;
    cout << "Third element: " << arr[2] << endl;
    arr[1] = 99; // Modification
    cout << "Modified Array: ";
    for(int x : arr) cout << x << " ";
    return 0;
}`,
    c: `// Arrays Basics: Indexing
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40};
    printf("First element: %d\\n", arr[0]);
    printf("Third element: %d\\n", arr[2]);
    arr[1] = 99; // Modification
    printf("Modified Array: ");
    for(int i=0; i<4; i++) printf("%d ", arr[i]);
    return 0;
}`
  },
  'Array Length': {
    javascript: `// Arrays Basics: Length
function execute() {
    let arr = [10, 20, 30, 40, 50];
    console.log("Length of array is:", arr.length);
    console.log("Last element is:", arr[arr.length - 1]);
}
execute();`,
    python: `# Arrays Basics: Length
def execute():
    arr = [10, 20, 30, 40, 50]
    print("Length of array is:", len(arr))
    print("Last element is:", arr[-1])
execute()`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        System.out.println("Length of array is: " + arr.length);
        System.out.println("Last element is: " + arr[arr.length - 1]);
    }
}`,
    cpp: `// Arrays Basics: Length
#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr = {10, 20, 30, 40, 50};
    cout << "Length of array is: " << arr.size() << endl;
    cout << "Last element is: " << arr[arr.size() - 1] << endl;
    return 0;
}`,
    c: `// Arrays Basics: Length
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int length = sizeof(arr) / sizeof(arr[0]);
    printf("Length of array is: %d\\n", length);
    printf("Last element is: %d\\n", arr[length - 1]);
    return 0;
}`
  },
  'Array Traversal': {
    javascript: `// Arrays Basics: Traversal
function execute() {
    let arr = [10, 20, 30, 40, 50];
    console.log("Traversing Array:");
    for(let i = 0; i < arr.length; i++) {
        console.log(\`Index \${i}: \${arr[i]}\`);
    }
}
execute();`,
    python: `# Arrays Basics: Traversal
def execute():
    arr = [10, 20, 30, 40, 50]
    print("Traversing Array:")
    for i in range(len(arr)):
        print(f"Index {i}: {arr[i]}")
execute()`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        System.out.println("Traversing Array:");
        for(int i = 0; i < arr.length; i++) {
            System.out.println("Index " + i + ": " + arr[i]);
        }
    }
}`,
    cpp: `// Arrays Basics: Traversal
#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr = {10, 20, 30, 40, 50};
    cout << "Traversing Array:\\n";
    for(int i = 0; i < arr.size(); i++) {
        cout << "Index " << i << ": " << arr[i] << "\\n";
    }
    return 0;
}`,
    c: `// Arrays Basics: Traversal
#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int length = sizeof(arr) / sizeof(arr[0]);
    printf("Traversing Array:\\n");
    for(int i = 0; i < length; i++) {
        printf("Index %d: %d\\n", i, arr[i]);
    }
    return 0;
}`
  },
  'Time Complexity: Insert & Delete': {
    javascript: `// Time Complexity: Insert/Delete O(n), Access O(1), Search O(n) or O(log n)
function arrayOperationsDemo() {
    let arr = [10, 20, 30, 40, 50];
    console.log("Original array:", arr);
    
    // 1. Access: O(1) Time Complexity
    console.log("O(1) Access -> Element at index 2 is:", arr[2]);
    
    // 2. Insert (at end is O(1), but at arbitrary index is O(n))
    // Simulating O(n) insertion at index 1
    arr.splice(1, 0, 15);
    console.log("O(n) Insertion -> Insert 15 at index 1:", arr);
    
    // 3. Delete (from arbitrary index is O(n) because elements shift)
    // Simulating O(n) deletion at index 3
    arr.splice(3, 1);
    console.log("O(n) Deletion -> Remove element at index 3:", arr);
    
    // 4. Linear Search: O(n) Time Complexity
    const target = 40;
    let foundIndex = -1;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) { foundIndex = i; break; }
    }
    console.log(\`O(n) Linear Search -> Found \${target} at index \${foundIndex}\`);
}
arrayOperationsDemo();`,
    python: `# Time Complexity: Insert/Delete O(n), Access O(1), Search O(n) or O(log n)
def array_operations_demo():
    arr = [10, 20, 30, 40, 50]
    print("Original array:", arr)
    
    # 1. Access: O(1) Time Complexity
    print("O(1) Access -> Element at index 2 is:", arr[2])
    
    # 2. Insert (at arbitrary index is O(n))
    # Simulating O(n) insertion at index 1
    arr.insert(1, 15)
    print("O(n) Insertion -> Insert 15 at index 1:", arr)
    
    # 3. Delete (from arbitrary index is O(n) because elements shift)
    # Simulating O(n) deletion at index 3
    arr.pop(3)
    print("O(n) Deletion -> Remove element at index 3:", arr)
    
    # 4. Linear Search: O(n) Time Complexity
    target = 40
    found_index = -1
    for i in range(len(arr)):
        if arr[i] == target:
            found_index = i
            break
    print(f"O(n) Linear Search -> Found {target} at index {found_index}")

array_operations_demo()`,
    java: `// Time Complexity: Insert/Delete O(n), Access O(1), Search O(n) or O(log n)
import java.util.ArrayList;

public class YourClassName {
    public static void main(String[] args) {
        ArrayList<Integer> arr = new ArrayList<>();
        arr.add(10); arr.add(20); arr.add(30); arr.add(40); arr.add(50);
        System.out.println("Original array: " + arr);
        
        // 1. Access: O(1) Time Complexity
        System.out.println("O(1) Access -> Element at index 2 is: " + arr.get(2));
        
        // 2. Insert (at arbitrary index is O(n))
        arr.add(1, 15);
        System.out.println("O(n) Insertion -> Insert 15 at index 1: " + arr);
        
        // 3. Delete (from arbitrary index is O(n) because elements shift)
        arr.remove(3);
        System.out.println("O(n) Deletion -> Remove element at index 3: " + arr);
        
        // 4. Linear Search: O(n) Time Complexity
        int target = 40;
        int foundIndex = -1;
        for(int i = 0; i < arr.size(); i++) {
            if(arr.get(i) == target) {
                foundIndex = i;
                break;
            }
        }
        System.out.println("O(n) Linear Search -> Found " + target + " at index " + foundIndex);
    }
}`,
    cpp: `// Time Complexity: Insert/Delete O(n), Access O(1), Search O(n) or O(log n)
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {10, 20, 30, 40, 50};
    
    // 1. Access: O(1) Time Complexity
    cout << "O(1) Access -> Element at index 2 is: " << arr[2] << endl;
    
    // 2. Insert (at arbitrary index is O(n))
    arr.insert(arr.begin() + 1, 15);
    cout << "O(n) Insertion -> Array size is now " << arr.size() << endl;
    
    // 3. Delete (from arbitrary index is O(n) because elements shift)
    arr.erase(arr.begin() + 3);
    cout << "O(n) Deletion -> Array size is now " << arr.size() << endl;
    
    // 4. Linear Search: O(n) Time Complexity
    int target = 40;
    int foundIndex = -1;
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] == target) {
            foundIndex = i;
            break;
        }
    }
    cout << "O(n) Linear Search -> Found " << target << " at index " << foundIndex << endl;
    
    return 0;
}`,
    c: `// Time Complexity: Insert/Delete O(n), Access O(1), Search O(n) or O(log n)
#include <stdio.h>

int main() {
    int arr[10] = {10, 20, 30, 40, 50}; // Fixed size array for C
    int size = 5;
    
    // 1. Access: O(1) Time Complexity
    printf("O(1) Access -> Element at index 2 is: %d\\n", arr[2]);
    
    // 2. Insert: O(n) (shifting elements to the right)
    for(int i = size; i > 1; i--) {
        arr[i] = arr[i - 1];
    }
    arr[1] = 15;
    size++;
    printf("O(n) Insertion -> Size is now %d\\n", size);
    
    // 3. Delete: O(n) (shifting elements to the left)
    for(int i = 3; i < size - 1; i++) {
        arr[i] = arr[i + 1];
    }
    size--;
    printf("O(n) Deletion -> Size is now %d\\n", size);
    
    // 4. Linear Search: O(n) Time Complexity
    int target = 40;
    int foundIndex = -1;
    for(int i = 0; i < size; i++) {
        if(arr[i] == target) {
            foundIndex = i;
            break;
        }
    }
    printf("O(n) Linear Search -> Found %d at index %d\\n", target, foundIndex);
    
    return 0;
}`
  },
  'Time Complexity: Access': {
    javascript: `// Accessing an array element by index is O(1)
function accessElement(arr, index) {
    if (index >= 0 && index < arr.length) {
        console.log("Element at index " + index + ": " + arr[index]);
        return arr[index];
    }
    return null;
}
accessElement([10, 20, 30, 40], 2);`,
    python: `# Accessing an array element by index is O(1)
def access_element(arr, index):
    if 0 <= index < len(arr):
        print(f"Element at index {index}: {arr[index]}")
        return arr[index]
    return None
access_element([10, 20, 30, 40], 2)`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40};
        int index = 2;
        if (index >= 0 && index < arr.length) {
            System.out.println("Element at index " + index + ": " + arr[index]);
        }
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr = {10, 20, 30, 40};
    int index = 2;
    if (index >= 0 && index < arr.size()) {
        cout << "Element at index " << index << ": " << arr[index] << endl;
    }
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {10, 20, 30, 40};
    int index = 2;
    int length = sizeof(arr)/sizeof(arr[0]);
    if (index >= 0 && index < length) {
        printf("Element at index %d: %d\\n", index, arr[index]);
    }
    return 0;
}`
  },
  'Time Complexity: Search': {
    javascript: `// Linear Search is O(n), Binary Search is O(log n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
console.log("Found at index:", linearSearch([10, 20, 30, 40], 30));`,
    python: `# Linear Search is O(n), Binary Search is O(log n)
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target: return i
    return -1
print("Found at index:", linear_search([10, 20, 30, 40], 30))`,
    java: `public class YourClassName {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40};
        System.out.println("Found at index: " + linearSearch(arr, 30));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
int main() {
    vector<int> arr = {10, 20, 30, 40};
    cout << "Found at index: " << linearSearch(arr, 30) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
int main() {
    int arr[] = {10, 20, 30, 40};
    printf("Found at index: %d\\n", linearSearch(arr, 4, 30));
    return 0;
}`
  },
  '01. Find Max and Min': {
    javascript: `// 01. Find max & min in array
function findMaxMin(arr) {
    if (!arr.length) return null;
    let max = arr[0], min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }
    return { max, min };
}

// Test the function
const testArray = [3, 1, 9, -4, 2, 8];
console.log("Array:", testArray);
console.log("Result:", findMaxMin(testArray));`,
    python: `# 01. Find max & min in array
def find_max_min(arr):
    if not arr: return None
    max_val, min_val = arr[0], arr[0]
    for num in arr[1:]:
        if num > max_val: max_val = num
        if num < min_val: min_val = num
    return {"max": max_val, "min": min_val}

test_array = [3, 1, 9, -4, 2, 8]
print("Array:", test_array)
print("Result:", find_max_min(test_array))`,
    java: `// 01. Find max & min in array
import java.util.Arrays;

public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {3, 1, 9, -4, 2, 8};
        if (arr.length == 0) return;
        int max = arr[0], min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }
        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Result: { max: " + max + ", min: " + min + " }");
    }
}`,
    cpp: `// 01. Find max & min in array
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {3, 1, 9, -4, 2, 8};
    if (arr.empty()) return 0;
    int max_val = arr[0], min_val = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > max_val) max_val = arr[i];
        if (arr[i] < min_val) min_val = arr[i];
    }
    cout << "Result: max=" << max_val << ", min=" << min_val << endl;
    return 0;
}`,
    c: `// 01. Find max & min in array
#include <stdio.h>

int main() {
    int arr[] = {3, 1, 9, -4, 2, 8};
    int n = sizeof(arr) / sizeof(arr[0]);
    if (n == 0) return 0;
    int max_val = arr[0], min_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
        if (arr[i] < min_val) min_val = arr[i];
    }
    printf("Result: max=%d, min=%d\\n", max_val, min_val);
    return 0;
}`
  },
  '02. Reverse Array': {
    javascript: `// 02. Reverse an array
function reverseArray(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

// Test the function
const testArray = [1, 2, 3, 4, 5];
console.log("Original:", [...testArray]);
console.log("Reversed:", reverseArray(testArray));`,
    python: `# 02. Reverse an array
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

test_array = [1, 2, 3, 4, 5]
print("Original:", list(test_array))
print("Reversed:", reverse_array(test_array))`,
    java: `// 02. Reverse an array
import java.util.Arrays;

public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println("Original: " + Arrays.toString(arr));
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        System.out.println("Reversed: " + Arrays.toString(arr));
    }
}`,
    cpp: `// 02. Reverse an array
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
    cout << "Reversed: ";
    for(int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
    c: `// 02. Reverse an array
#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int left = 0, right = n - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    printf("Reversed: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`
  },
  '03. Check if Sorted': {
    javascript: `// 03. Check if array is sorted
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

// Test the function
console.log("Sorted Array [1, 2, 3, 4]:", isSorted([1, 2, 3, 4]));
console.log("Unsorted Array [1, 3, 2, 4]:", isSorted([1, 3, 2, 4]));`,
    python: `# 03. Check if array is sorted
def is_sorted(arr):
    for i in range(1, len(arr)):
        if arr[i] < arr[i - 1]:
            return False
    return True

print("Sorted Array [1, 2, 3, 4]:", is_sorted([1, 2, 3, 4]))
print("Unsorted Array [1, 3, 2, 4]:", is_sorted([1, 3, 2, 4]))`,
    java: `public class YourClassName {
    public static boolean isSorted(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }
    public static void main(String[] args) {
        System.out.println("Sorted Array [1, 2, 3, 4]: " + isSorted(new int[]{1, 2, 3, 4}));
        System.out.println("Unsorted Array [1, 3, 2, 4]: " + isSorted(new int[]{1, 3, 2, 4}));
    }
}`,
    cpp: `// 03. Check if array is sorted
#include <iostream>
#include <vector>
using namespace std;

bool isSorted(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

int main() {
    vector<int> sorted = {1, 2, 3, 4};
    vector<int> unsorted = {1, 3, 2, 4};
    cout << "Sorted Array: " << (isSorted(sorted) ? "true" : "false") << endl;
    cout << "Unsorted Array: " << (isSorted(unsorted) ? "true" : "false") << endl;
    return 0;
}`,
    c: `// 03. Check if array is sorted
#include <stdio.h>
#include <stdbool.h>

bool isSorted(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

int main() {
    int sorted[] = {1, 2, 3, 4};
    int unsorted[] = {1, 3, 2, 4};
    printf("Sorted Array: %s\\n", isSorted(sorted, 4) ? "true" : "false");
    printf("Unsorted Array: %s\\n", isSorted(unsorted, 4) ? "true" : "false");
    return 0;
}`
  },
  '04. Remove Duplicates': {
    javascript: `// 04. Remove duplicates from sorted array
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] !== arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
}

// Test the function
const testArray = [1, 1, 2, 2, 2, 3, 4, 4];
const newLength = removeDuplicates(testArray);
console.log("New length:", newLength);
console.log("Modified array:", testArray.slice(0, newLength));`,
    python: `# 04. Remove duplicates from sorted array
def remove_duplicates(arr):
    if not arr: return 0
    i = 0
    for j in range(1, len(arr)):
        if arr[j] != arr[i]:
            i += 1
            arr[i] = arr[j]
    return i + 1

test_array = [1, 1, 2, 2, 2, 3, 4, 4]
new_length = remove_duplicates(test_array)
print("New length:", new_length)
print("Modified array:", test_array[:new_length])`,
    java: `// 04. Remove duplicates from sorted array
import java.util.Arrays;

public class YourClassName {
    public static int removeDuplicates(int[] arr) {
        if (arr.length == 0) return 0;
        int i = 0;
        for (int j = 1; j < arr.length; j++) {
            if (arr[j] != arr[i]) {
                i++;
                arr[i] = arr[j];
            }
        }
        return i + 1;
    }
    public static void main(String[] args) {
        int[] arr = {1, 1, 2, 2, 2, 3, 4, 4};
        int newLength = removeDuplicates(arr);
        System.out.println("New length: " + newLength);
        System.out.println("Modified array: " + Arrays.toString(Arrays.copyOfRange(arr, 0, newLength)));
    }
}`,
    cpp: `// 04. Remove duplicates from sorted array
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {1, 1, 2, 2, 2, 3, 4, 4};
    if (arr.empty()) return 0;
    int i = 0;
    for (int j = 1; j < arr.size(); j++) {
        if (arr[j] != arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    cout << "New length: " << (i + 1) << endl;
    cout << "Modified array: ";
    for(int k=0; k<=i; k++) cout << arr[k] << " ";
    cout << endl;
    return 0;
}`,
    c: `// 04. Remove duplicates from sorted array
#include <stdio.h>

int main() {
    int arr[] = {1, 1, 2, 2, 2, 3, 4, 4};
    int n = sizeof(arr) / sizeof(arr[0]);
    if (n == 0) return 0;
    int i = 0;
    for (int j = 1; j < n; j++) {
        if (arr[j] != arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    printf("New length: %d\\n", i + 1);
    printf("Modified array: ");
    for(int k=0; k<=i; k++) printf("%d ", arr[k]);
    printf("\\n");
    return 0;
}`
  },
  '05. Move Zeros': {
    javascript: `// 05. Move zeros to end
function moveZeroes(arr) {
    let insertPos = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            [arr[insertPos], arr[i]] = [arr[i], arr[insertPos]];
            insertPos++;
        }
    }
    return arr;
}

// Test the function
const testArray = [0, 1, 0, 3, 12];
console.log("Original:", [0, 1, 0, 3, 12]);
console.log("Result:", moveZeroes(testArray));`,
    python: `# 05. Move zeros to end
def move_zeroes(arr):
    insert_pos = 0
    for i in range(len(arr)):
        if arr[i] != 0:
            arr[insert_pos], arr[i] = arr[i], arr[insert_pos]
            insert_pos += 1
    return arr

test_array = [0, 1, 0, 3, 12]
print("Original:", [0, 1, 0, 3, 12])
print("Result:", move_zeroes(test_array))`,
    java: `// 05. Move zeros to end
import java.util.Arrays;

public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {0, 1, 0, 3, 12};
        int insertPos = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                int temp = arr[insertPos];
                arr[insertPos] = arr[i];
                arr[i] = temp;
                insertPos++;
            }
        }
        System.out.println("Result: " + Arrays.toString(arr));
    }
}`,
    cpp: `// 05. Move zeros to end
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {0, 1, 0, 3, 12};
    int insertPos = 0;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] != 0) {
            swap(arr[insertPos], arr[i]);
            insertPos++;
        }
    }
    cout << "Result: ";
    for(int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
    c: `// 05. Move zeros to end
#include <stdio.h>

int main() {
    int arr[] = {0, 1, 0, 3, 12};
    int n = sizeof(arr) / sizeof(arr[0]);
    int insertPos = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != 0) {
            int temp = arr[insertPos];
            arr[insertPos] = arr[i];
            arr[i] = temp;
            insertPos++;
        }
    }
    printf("Result: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`
  },
  '06. Left Rotate by K': {
    javascript: `// 06. Left rotate array by K
function rotateLeft(arr, k) {
    k = k % arr.length;
    const reverse = (start, end) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    };
    reverse(0, k - 1);
    reverse(k, arr.length - 1);
    reverse(0, arr.length - 1);
    return arr;
}

// Test the function
const testArray = [1, 2, 3, 4, 5, 6, 7];
const k = 3;
console.log("Original:", [1, 2, 3, 4, 5, 6, 7]);
console.log("Rotated left by " + k + ":", rotateLeft(testArray, k));`,
    python: `# 06. Left rotate array by K
def rotate_left(arr, k):
    n = len(arr)
    k = k % n
    def reverse(start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1
    reverse(0, k - 1)
    reverse(k, n - 1)
    reverse(0, n - 1)
    return arr

test_array = [1, 2, 3, 4, 5, 6, 7]
k = 3
print("Rotated left by", k, ":", rotate_left(test_array, k))`,
    java: `// 06. Left rotate array by K
import java.util.Arrays;

public class YourClassName {
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        int k = 3;
        k = k % arr.length;
        reverse(arr, 0, k - 1);
        reverse(arr, k, arr.length - 1);
        reverse(arr, 0, arr.length - 1);
        System.out.println("Rotated: " + Arrays.toString(arr));
    }
}`,
    cpp: `// 06. Left rotate array by K
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7};
    int k = 3;
    k = k % arr.size();
    reverse(arr.begin(), arr.begin() + k);
    reverse(arr.begin() + k, arr.end());
    reverse(arr.begin(), arr.end());
    
    cout << "Rotated: ";
    for(int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
    c: `// 06. Left rotate array by K
#include <stdio.h>

void reverse(int arr[], int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    int k = 3;
    k = k % n;
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
    reverse(arr, 0, n - 1);
    
    printf("Rotated: ");
    for(int i=0; i<n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`
  },
  '10. Two Sum': {
    javascript: `// 10. Two sum (pair with given sum)
function twoSum(arr, target) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(arr[i], i);
    }
    return [];
}

// Test the function
const testArray = [2, 7, 11, 15];
const target = 9;
console.log("Array:", testArray, "| Target:", target);
const result = twoSum(testArray, target);
console.log("Indices found:", result, "Values:", [testArray[result[0]], testArray[result[1]]]);`,
    python: `# 10. Two sum (pair with given sum)
def two_sum(arr, target):
    num_map = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []

test_array = [2, 7, 11, 15]
target = 9
print("Array:", test_array, "| Target:", target)
result = two_sum(test_array, target)
print("Indices found:", result)`,
    java: `// 10. Two sum (pair with given sum)
import java.util.HashMap;
import java.util.Arrays;

public class YourClassName {
    public static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
    public static void main(String[] args) {
        int[] arr = {2, 7, 11, 15};
        int target = 9;
        System.out.println("Result: " + Arrays.toString(twoSum(arr, target)));
    }
}`,
    cpp: `// 10. Two sum (pair with given sum)
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            cout << "Indices: " << map[complement] << ", " << i << endl;
            return 0;
        }
        map[nums[i]] = i;
    }
    return 0;
}`,
    c: `// 10. Two sum (O(n^2) without hashmap for simplicity)
#include <stdio.h>

int main() {
    int nums[] = {2, 7, 11, 15};
    int n = sizeof(nums)/sizeof(nums[0]);
    int target = 9;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                printf("Indices: %d, %d\\n", i, j);
                return 0;
            }
        }
    }
    return 0;
}`
  }
};

// Fallback utility to dynamically map missing translations in dev
export function getTranslatedCode(problemName, lang) {
  const problem = ARRAY_PROBLEMS_CODE[problemName];
  if (problem && problem[lang]) return problem[lang];
  return null;
}
