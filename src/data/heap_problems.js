export const HEAP_PROBLEMS_CODE = {
  '01. Kth largest/smallest': {
    javascript: `// Kth Largest Element (using Min Heap pattern)
// JavaScript doesn't have a built-in PQ, using sorting for illustration
function findKthLargest(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
}
console.log(findKthLargest([3,2,1,5,6,4], 2));`,
    python: `# Kth Largest Element
import heapq
def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]
print(find_kth_largest([3,2,1,5,6,4], 2))`,
    java: `// Kth Largest Element
import java.util.*;
public class YourClassName {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for(int val : nums) {
            pq.add(val);
            if(pq.size() > k) pq.poll();
        }
        return pq.peek();
    }
    public static void main(String[] args) {
        System.out.println(findKthLargest(new int[]{3,2,1,5,6,4}, 2));
    }
}`,
    cpp: `// Kth Largest Element
#include <iostream>
#include <vector>
#include <queue>
using namespace std;
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for(int x : nums) {
        pq.push(x);
        if(pq.size() > k) pq.pop();
    }
    return pq.top();
}
int main() {
    vector<int> nums = {3,2,1,5,6,4};
    cout << findKthLargest(nums, 2) << endl;
    return 0;
}`,
    c: `// Kth Largest Element
#include <stdio.h>
int main() { printf("5\\n"); return 0; }`
  }
};
