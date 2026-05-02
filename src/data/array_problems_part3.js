export const ARRAY_PROBLEMS_PART3 = {
  'Pattern: Sliding Window': {
    javascript: `// Pattern: Sliding Window (Max sum subarray of size K)
function maxSumSubarray(arr, k) {
    let max = 0, sum = 0;
    for(let i=0; i<k; i++) sum += arr[i];
    max = sum;
    for(let i=k; i<arr.length; i++) {
        sum += arr[i] - arr[i-k];
        max = Math.max(max, sum);
    }
    return max;
}
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3));`,
    python: `# Pattern: Sliding Window
def max_sum_subarray(arr, k):
    if len(arr) < k: return 0
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i-k]
        max_sum = max(max_sum, window_sum)
    return max_sum
print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2}; int k = 3;
        int max = 0, sum = 0;
        for(int i=0; i<k; i++) sum += arr[i];
        max = sum;
        for(int i=k; i<arr.length; i++) {
            sum += arr[i] - arr[i-k];
            max = Math.max(max, sum);
        }
        System.out.println(max);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={2,1,5,1,3,2}; int k=3, max_sum=0, sum=0;
    for(int i=0; i<k; i++) sum += arr[i];
    max_sum = sum;
    for(int i=k; i<arr.size(); i++) {
        sum += arr[i] - arr[i-k];
        max_sum = max(max_sum, sum);
    }
    cout << max_sum << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
int main() {
    int arr[]={2,1,5,1,3,2}, k=3, max_sum=0, sum=0;
    for(int i=0; i<k; i++) sum += arr[i];
    max_sum = sum;
    for(int i=k; i<6; i++) {
        sum += arr[i] - arr[i-k];
        max_sum = MAX(max_sum, sum);
    }
    printf("%d\\n", max_sum);
    return 0;
}`
  },
  'Pattern: Dutch National Flag': {
    javascript: `// Sort 0s, 1s, and 2s
function sortColors(arr) {
    let low = 0, mid = 0, high = arr.length - 1;
    while(mid <= high) {
        if(arr[mid] === 0) { [arr[low], arr[mid]] = [arr[mid], arr[low]]; low++; mid++; }
        else if(arr[mid] === 1) mid++;
        else { [arr[mid], arr[high]] = [arr[high], arr[mid]]; high--; }
    }
    return arr;
}
console.log(sortColors([2, 0, 2, 1, 1, 0]));`,
    python: `def sort_colors(arr):
    low, mid, high = 0, 0, len(arr) - 1
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]; low += 1; mid += 1
        elif arr[mid] == 1: mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]; high -= 1
    return arr
print(sort_colors([2, 0, 2, 1, 1, 0]))`,
    java: `import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {2, 0, 2, 1, 1, 0};
        int low=0, mid=0, high=arr.length-1;
        while(mid <= high) {
            if(arr[mid]==0) { int t=arr[low]; arr[low]=arr[mid]; arr[mid]=t; low++; mid++; }
            else if(arr[mid]==1) mid++;
            else { int t=arr[mid]; arr[mid]=arr[high]; arr[high]=t; high--; }
        }
        System.out.println(Arrays.toString(arr));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={2,0,2,1,1,0};
    int low=0, mid=0, high=5;
    while(mid <= high) {
        if(arr[mid]==0) swap(arr[low++], arr[mid++]);
        else if(arr[mid]==1) mid++;
        else swap(arr[mid], arr[high--]);
    }
    for(int x: arr) cout << x << " ";
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[]={2,0,2,1,1,0}, low=0, mid=0, high=5;
    while(mid <= high) {
        if(arr[mid]==0) { int t=arr[low]; arr[low]=arr[mid]; arr[mid]=t; low++; mid++; }
        else if(arr[mid]==1) mid++;
        else { int t=arr[mid]; arr[mid]=arr[high]; arr[high]=t; high--; }
    }
    for(int i=0; i<6; i++) printf("%d ", arr[i]);
    return 0;
}`
  },
  'Pattern: Moore Voting': {
    javascript: `// Moore's Voting Algorithm (Find Majority Element)
function majorityElement(arr) {
    let count = 0, candidate = null;
    for(let num of arr) {
        if(count === 0) candidate = num;
        count += (num === candidate) ? 1 : -1;
    }
    return candidate;
}
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));`,
    python: `def majority_element(arr):
    count, candidate = 0, None
    for num in arr:
        if count == 0: candidate = num
        count += 1 if num == candidate else -1
    return candidate
print(majority_element([2, 2, 1, 1, 1, 2, 2]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {2, 2, 1, 1, 1, 2, 2};
        int count = 0, candidate = 0;
        for(int num : arr) {
            if(count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        System.out.println(candidate);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={2, 2, 1, 1, 1, 2, 2};
    int count = 0, candidate = 0;
    for(int num : arr) {
        if(count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    cout << candidate << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[]={2, 2, 1, 1, 1, 2, 2};
    int count = 0, candidate = 0;
    for(int i=0; i<7; i++) {
        if(count == 0) candidate = arr[i];
        count += (arr[i] == candidate) ? 1 : -1;
    }
    printf("%d\\n", candidate);
    return 0;
}`
  },
  '13. Sort 0s 1s 2s': {
    javascript: `// Sort 0s, 1s, and 2s
function sortColors(arr) {
    let low = 0, mid = 0, high = arr.length - 1;
    while(mid <= high) {
        if(arr[mid] === 0) { [arr[low], arr[mid]] = [arr[mid], arr[low]]; low++; mid++; }
        else if(arr[mid] === 1) mid++;
        else { [arr[mid], arr[high]] = [arr[high], arr[mid]]; high--; }
    }
    return arr;
}
console.log(sortColors([2, 0, 2, 1, 1, 0]));`,
    python: `def sort_colors(arr):
    low, mid, high = 0, 0, len(arr) - 1
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]; low += 1; mid += 1
        elif arr[mid] == 1: mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]; high -= 1
    return arr
print(sort_colors([2, 0, 2, 1, 1, 0]))`,
    java: `import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {2, 0, 2, 1, 1, 0};
        int low=0, mid=0, high=arr.length-1;
        while(mid <= high) {
            if(arr[mid]==0) { int t=arr[low]; arr[low]=arr[mid]; arr[mid]=t; low++; mid++; }
            else if(arr[mid]==1) mid++;
            else { int t=arr[mid]; arr[mid]=arr[high]; arr[high]=t; high--; }
        }
        System.out.println(Arrays.toString(arr));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={2,0,2,1,1,0};
    int low=0, mid=0, high=5;
    while(mid <= high) {
        if(arr[mid]==0) swap(arr[low++], arr[mid++]);
        else if(arr[mid]==1) mid++;
        else swap(arr[mid], arr[high--]);
    }
    for(int x: arr) cout << x << " ";
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[]={2,0,2,1,1,0}, low=0, mid=0, high=5;
    while(mid <= high) {
        if(arr[mid]==0) { int t=arr[low]; arr[low]=arr[mid]; arr[mid]=t; low++; mid++; }
        else if(arr[mid]==1) mid++;
        else { int t=arr[mid]; arr[mid]=arr[high]; arr[high]=t; high--; }
    }
    for(int i=0; i<6; i++) printf("%d ", arr[i]);
    return 0;
}`
  },
  '14. Majority Element': {
    javascript: `// Moore's Voting Algorithm (Find Majority Element)
function majorityElement(arr) {
    let count = 0, candidate = null;
    for(let num of arr) {
        if(count === 0) candidate = num;
        count += (num === candidate) ? 1 : -1;
    }
    return candidate;
}
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));`,
    python: `def majority_element(arr):
    count, candidate = 0, None
    for num in arr:
        if count == 0: candidate = num
        count += 1 if num == candidate else -1
    return candidate
print(majority_element([2, 2, 1, 1, 1, 2, 2]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {2, 2, 1, 1, 1, 2, 2};
        int count = 0, candidate = 0;
        for(int num : arr) {
            if(count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        System.out.println(candidate);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> arr={2, 2, 1, 1, 1, 2, 2};
    int count = 0, candidate = 0;
    for(int num : arr) {
        if(count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    cout << candidate << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[]={2, 2, 1, 1, 1, 2, 2};
    int count = 0, candidate = 0;
    for(int i=0; i<7; i++) {
        if(count == 0) candidate = arr[i];
        count += (arr[i] == candidate) ? 1 : -1;
    }
    printf("%d\\n", candidate);
    return 0;
}`
  },
  '07. Union and Intersection': {
    javascript: `function unionIntersection(a, b) {
    let union = [...new Set([...a, ...b])];
    let intersection = a.filter(x => b.includes(x));
    console.log("Union:", union, "Intersection:", intersection);
}
unionIntersection([1, 2, 3], [2, 3, 4]);`,
    python: `def union_intersection(a, b):
    print("Union:", list(set(a) | set(b)))
    print("Intersection:", list(set(a) & set(b)))
union_intersection([1, 2, 3], [2, 3, 4])`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        HashSet<Integer> s1 = new HashSet<>(Arrays.asList(1,2,3));
        HashSet<Integer> s2 = new HashSet<>(Arrays.asList(2,3,4));
        HashSet<Integer> union = new HashSet<>(s1); union.addAll(s2);
        HashSet<Integer> inter = new HashSet<>(s1); inter.retainAll(s2);
        System.out.println("Union: " + union + " Inter: " + inter);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <set>
#include <algorithm>
using namespace std;
int main() {
    set<int> a={1,2,3}, b={2,3,4}, u, i;
    set_union(a.begin(),a.end(),b.begin(),b.end(),inserter(u,u.begin()));
    set_intersection(a.begin(),a.end(),b.begin(),b.end(),inserter(i,i.begin()));
    cout << "Union size: " << u.size() << " Inter size: " << i.size() << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    printf("Union/Intersection in C usually requires sorting and two pointers.\\n"); return 0;
}`
  },
  '09. Find Duplicate': {
    javascript: `function findDuplicate(nums) {
    let slow = nums[0], fast = nums[0];
    do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
    slow = nums[0];
    while(slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
    return slow;
}
console.log(findDuplicate([1, 3, 4, 2, 2]));`,
    python: `def find_duplicate(nums):
    slow, fast = nums[0], nums[0]
    while True:
        slow = nums[slow]; fast = nums[nums[fast]]
        if slow == fast: break
    slow = nums[0]
    while slow != fast: slow, fast = nums[slow], nums[fast]
    return slow
print(find_duplicate([1, 3, 4, 2, 2]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {1, 3, 4, 2, 2};
        int slow = nums[0], fast = nums[0];
        do { slow = nums[slow]; fast = nums[nums[fast]]; } while(slow != fast);
        slow = nums[0];
        while(slow != fast) { slow = nums[slow]; fast = nums[fast]; }
        System.out.println(slow);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums = {1, 3, 4, 2, 2};
    int slow = nums[0], fast = nums[0];
    do { slow = nums[slow]; fast = nums[nums[fast]]; } while(slow != fast);
    slow = nums[0];
    while(slow != fast) { slow = nums[slow]; fast = nums[fast]; }
    cout << slow << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int nums[] = {1, 3, 4, 2, 2}, slow = nums[0], fast = nums[0];
    do { slow = nums[slow]; fast = nums[nums[fast]]; } while(slow != fast);
    slow = nums[0];
    while(slow != fast) { slow = nums[slow]; fast = nums[fast]; }
    printf("%d\\n", slow);
    return 0;
}`
  },
  '12. Buy and Sell Stock': {
    javascript: `function maxProfit(prices) {
    let minPrice = Infinity, maxProf = 0;
    for(let p of prices) {
        if(p < minPrice) minPrice = p;
        else if(p - minPrice > maxProf) maxProf = p - minPrice;
    }
    return maxProf;
}
console.log(maxProfit([7, 1, 5, 3, 6, 4]));`,
    python: `def max_profit(prices):
    min_price, max_prof = float('inf'), 0
    for p in prices:
        if p < min_price: min_price = p
        elif p - min_price > max_prof: max_prof = p - min_price
    return max_prof
print(max_profit([7, 1, 5, 3, 6, 4]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] prices = {7, 1, 5, 3, 6, 4};
        int minPrice = Integer.MAX_VALUE, maxProf = 0;
        for(int p : prices) {
            if(p < minPrice) minPrice = p;
            else if(p - minPrice > maxProf) maxProf = p - minPrice;
        }
        System.out.println(maxProf);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;
int main() {
    vector<int> prices = {7, 1, 5, 3, 6, 4};
    int minPrice = INT_MAX, maxProf = 0;
    for(int p : prices) {
        if(p < minPrice) minPrice = p;
        else if(p - minPrice > maxProf) maxProf = p - minPrice;
    }
    cout << maxProf << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#include <limits.h>
int main() {
    int prices[] = {7, 1, 5, 3, 6, 4};
    int minPrice = INT_MAX, maxProf = 0;
    for(int i=0; i<6; i++) {
        if(prices[i] < minPrice) minPrice = prices[i];
        else if(prices[i] - minPrice > maxProf) maxProf = prices[i] - minPrice;
    }
    printf("%d\\n", maxProf);
    return 0;
}`
  },
  '15. Max Product Subarray': {
    javascript: `function maxProduct(nums) {
    let maxSoFar = nums[0], minSoFar = nums[0], result = maxSoFar;
    for(let i=1; i<nums.length; i++) {
        let curr = nums[i];
        let tempMax = Math.max(curr, maxSoFar * curr, minSoFar * curr);
        minSoFar = Math.min(curr, maxSoFar * curr, minSoFar * curr);
        maxSoFar = tempMax;
        result = Math.max(maxSoFar, result);
    }
    return result;
}
console.log(maxProduct([2,3,-2,4]));`,
    python: `def max_product(nums):
    max_so_far = min_so_far = res = nums[0]
    for n in nums[1:]:
        temp = max(n, max_so_far*n, min_so_far*n)
        min_so_far = min(n, max_so_far*n, min_so_far*n)
        max_so_far = temp
        res = max(res, max_so_far)
    return res
print(max_product([2,3,-2,4]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {2, 3, -2, 4};
        int max = nums[0], min = nums[0], res = nums[0];
        for(int i=1; i<nums.length; i++) {
            int curr = nums[i];
            int temp = Math.max(curr, Math.max(max*curr, min*curr));
            min = Math.min(curr, Math.min(max*curr, min*curr));
            max = temp;
            res = Math.max(res, max);
        }
        System.out.println(res);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> nums = {2, 3, -2, 4};
    int max_s = nums[0], min_s = nums[0], res = nums[0];
    for(int i=1; i<nums.size(); i++) {
        int curr = nums[i];
        int temp = max({curr, max_s*curr, min_s*curr});
        min_s = min({curr, max_s*curr, min_s*curr});
        max_s = temp;
        res = max(res, max_s);
    }
    cout << res << endl;
    return 0;
}`,
    c: `#include <stdio.h>
#define MAX(a,b) ((a)>(b)?(a):(b))
#define MIN(a,b) ((a)<(b)?(a):(b))
int main() {
    int nums[] = {2, 3, -2, 4};
    int max = nums[0], min = nums[0], res = nums[0];
    for(int i=1; i<4; i++) {
        int curr = nums[i];
        int temp = MAX(curr, MAX(max*curr, min*curr));
        min = MIN(curr, MIN(max*curr, min*curr));
        max = temp;
        res = MAX(res, max);
    }
    printf("%d\\n", res);
    return 0;
}`
  },
  '16. Pairs with Sum': {
    javascript: `function twoSum(arr, target) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(arr[i], i);
    }
    return [];
}
console.log(twoSum([2, 7, 11, 15], 9));`,
    python: `def two_sum(arr, target):
    num_map = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in num_map: return [num_map[complement], i]
        num_map[num] = i
    return []
print(two_sum([2, 7, 11, 15], 9))`,
    java: `import java.util.HashMap;
import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                System.out.println("[" + map.get(complement) + ", " + i + "]");
                return;
            }
            map.put(nums[i], i);
        }
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            cout << "[" << map[complement] << ", " << i << "]" << endl;
            return 0;
        }
        map[nums[i]] = i;
    }
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int nums[] = {2, 7, 11, 15};
    int n = sizeof(nums)/sizeof(nums[0]);
    int target = 9;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                printf("[%d, %d]\\n", i, j);
                return 0;
            }
        }
    }
    return 0;
}`
  },
  '17. Subarray Zero Sum': {
    javascript: `function hasZeroSum(arr) {
    let sum = 0, set = new Set();
    for(let x of arr) {
        sum += x;
        if(sum === 0 || set.has(sum)) return true;
        set.add(sum);
    }
    return false;
}
console.log(hasZeroSum([4, 2, -3, 1, 6]));`,
    python: `def has_zero_sum(arr):
    s, seen = 0, set()
    for x in arr:
        s += x
        if s == 0 or s in seen: return True
        seen.add(s)
    return False
print(has_zero_sum([4, 2, -3, 1, 6]))`,
    java: `import java.util.HashSet;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {4, 2, -3, 1, 6};
        int sum = 0; HashSet<Integer> set = new HashSet<>();
        for(int x : arr) {
            sum += x;
            if(sum == 0 || set.contains(sum)) { System.out.println(true); return; }
            set.add(sum);
        }
        System.out.println(false);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;
int main() {
    vector<int> arr = {4, 2, -3, 1, 6};
    int sum = 0; unordered_set<int> set;
    for(int x : arr) {
        sum += x;
        if(sum == 0 || set.count(sum)) { cout << "true" << endl; return 0; }
        set.insert(sum);
    }
    cout << "false" << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {4, 2, -3, 1, 6};
    printf("Subarray Zero Sum needs HashMap or O(n^2) loop.\\n"); return 0;
}`
  },
  '18. Longest Subarray with Sum': {
    javascript: `function longestSubarray(arr, k) {
    let map = new Map(), sum = 0, maxLen = 0;
    for(let i=0; i<arr.length; i++) {
        sum += arr[i];
        if(sum === k) maxLen = i + 1;
        if(!map.has(sum)) map.set(sum, i);
        if(map.has(sum - k)) maxLen = Math.max(maxLen, i - map.get(sum - k));
    }
    return maxLen;
}
console.log(longestSubarray([10, 5, 2, 7, 1, 9], 15));`,
    python: `def longest_subarray(arr, k):
    map, curr_sum, max_len = {}, 0, 0
    for i, x in enumerate(arr):
        curr_sum += x
        if curr_sum == k: max_len = i + 1
        if curr_sum not in map: map[curr_sum] = i
        if curr_sum - k in map: max_len = max(max_len, i - map[curr_sum - k])
    return max_len
print(longest_subarray([10, 5, 2, 7, 1, 9], 15))`,
    java: `import java.util.HashMap;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {10, 5, 2, 7, 1, 9}; int k = 15;
        HashMap<Integer, Integer> map = new HashMap<>();
        int sum = 0, maxLen = 0;
        for(int i=0; i<arr.length; i++) {
            sum += arr[i];
            if(sum == k) maxLen = i + 1;
            if(!map.containsKey(sum)) map.put(sum, i);
            if(map.containsKey(sum - k)) maxLen = Math.max(maxLen, i - map.get(sum - k));
        }
        System.out.println(maxLen);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;
int main() {
    vector<int> arr = {10, 5, 2, 7, 1, 9}; int k = 15;
    unordered_map<int, int> map;
    int sum = 0, maxLen = 0;
    for(int i=0; i<arr.size(); i++) {
        sum += arr[i];
        if(sum == k) maxLen = i + 1;
        if(!map.count(sum)) map[sum] = i;
        if(map.count(sum - k)) maxLen = max(maxLen, i - map[sum - k]);
    }
    cout << maxLen << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    printf("Needs hashmap for O(N) or O(N^2) loop.\\n"); return 0;
}`
  },
  '19. Trapping Rain Water': {
    javascript: `function trap(height) {
    let l=0, r=height.length-1, lmax=0, rmax=0, res=0;
    while(l <= r) {
        if(height[l] <= height[r]) {
            if(height[l] >= lmax) lmax = height[l]; else res += lmax - height[l];
            l++;
        } else {
            if(height[r] >= rmax) rmax = height[r]; else res += rmax - height[r];
            r--;
        }
    }
    return res;
}
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));`,
    python: `def trap(height):
    l, r, lmax, rmax, res = 0, len(height)-1, 0, 0, 0
    while l <= r:
        if height[l] <= height[r]:
            if height[l] >= lmax: lmax = height[l]
            else: res += lmax - height[l]
            l += 1
        else:
            if height[r] >= rmax: rmax = height[r]
            else: res += rmax - height[r]
            r -= 1
    return res
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] h = {0,1,0,2,1,0,1,3,2,1,2,1};
        int l=0, r=h.length-1, lmax=0, rmax=0, res=0;
        while(l <= r) {
            if(h[l] <= h[r]) {
                if(h[l] >= lmax) lmax = h[l]; else res += lmax - h[l]; l++;
            } else {
                if(h[r] >= rmax) rmax = h[r]; else res += rmax - h[r]; r--;
            }
        }
        System.out.println(res);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> h = {0,1,0,2,1,0,1,3,2,1,2,1};
    int l=0, r=h.size()-1, lmax=0, rmax=0, res=0;
    while(l <= r) {
        if(h[l] <= h[r]) {
            if(h[l] >= lmax) lmax = h[l]; else res += lmax - h[l]; l++;
        } else {
            if(h[r] >= rmax) rmax = h[r]; else res += rmax - h[r]; r--;
        }
    }
    cout << res << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int h[] = {0,1,0,2,1,0,1,3,2,1,2,1};
    int l=0, r=11, lmax=0, rmax=0, res=0;
    while(l <= r) {
        if(h[l] <= h[r]) {
            if(h[l] >= lmax) lmax = h[l]; else res += lmax - h[l]; l++;
        } else {
            if(h[r] >= rmax) rmax = h[r]; else res += rmax - h[r]; r--;
        }
    }
    printf("%d\\n", res);
    return 0;
}`
  },
  '20. Merge Two Sorted Arrays': {
    javascript: `function mergeArrays(nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while(j >= 0) {
        if(i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
        else nums1[k--] = nums2[j--];
    }
    return nums1;
}
console.log(mergeArrays([1,2,3,0,0,0], 3, [2,5,6], 3));`,
    python: `def merge(nums1, m, nums2, n):
    i, j, k = m - 1, n - 1, m + n - 1
    while j >= 0:
        if i >= 0 and nums1[i] > nums2[j]:
            nums1[k] = nums1[i]; i -= 1
        else:
            nums1[k] = nums2[j]; j -= 1
        k -= 1
    return nums1
print(merge([1,2,3,0,0,0], 3, [2,5,6], 3))`,
    java: `import java.util.Arrays;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums1 = {1,2,3,0,0,0}; int m = 3;
        int[] nums2 = {2,5,6}; int n = 3;
        int i=m-1, j=n-1, k=m+n-1;
        while(j >= 0) {
            if(i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
        System.out.println(Arrays.toString(nums1));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums1 = {1,2,3,0,0,0}, nums2 = {2,5,6};
    int m = 3, n = 3, i = m-1, j = n-1, k = m+n-1;
    while(j >= 0) {
        if(i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
        else nums1[k--] = nums2[j--];
    }
    for(int x: nums1) cout << x << " ";
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int nums1[6] = {1,2,3,0,0,0}, nums2[] = {2,5,6};
    int m = 3, n = 3, i = m-1, j = n-1, k = m+n-1;
    while(j >= 0) {
        if(i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
        else nums1[k--] = nums2[j--];
    }
    for(int x=0; x<6; x++) printf("%d ", nums1[x]);
    return 0;
}`
  }
};
