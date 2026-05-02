export const BINARY_SEARCH_PROBLEMS_CODE = {
  '01. Basic': {
    javascript: `// Binary Search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while(left <= right) {
        let mid = Math.floor((left + right)/2);
        if(arr[mid] === target) return mid;
        if(arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
console.log(binarySearch([1,2,3,4,5], 3));`,
    python: `# Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1
print(binary_search([1,2,3,4,5], 3))`,
    java: `public class YourClassName {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while(left <= right) {
            int mid = left + (right - left) / 2;
            if(arr[mid] == target) return mid;
            if(arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    public static void main(String[] args) {
        System.out.println(binarySearch(new int[]{1,2,3,4,5}, 3));
    }
}`,
    cpp: `// Binary Search
#include <iostream>
#include <vector>
using namespace std;
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) return mid;
        if(arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
int main() {
    vector<int> arr = {1,2,3,4,5};
    cout << binarySearch(arr, 3) << endl;
    return 0;
}`,
    c: `// Binary Search
#include <stdio.h>
int binarySearch(int arr[], int size, int target) {
    int left = 0, right = size - 1;
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(arr[mid] == target) return mid;
        if(arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
int main() {
    int arr[] = {1,2,3,4,5};
    printf("%d\\n", binarySearch(arr, 5, 3));
    return 0;
}`
  }
};
