export const HASHING_PROBLEMS_PART2 = {
  // --- HASHING CONCEPTS & PATTERNS ---
  'HashMap Basics': {
    javascript: `let map = new Map();
map.set("Alice", 25); map.set("Bob", 30);
console.log("Alice's age:", map.get("Alice"));
console.log("Has Charlie?", map.has("Charlie"));`,
    python: `hash_map = {"Alice": 25, "Bob": 30}
print("Alice's age:", hash_map["Alice"])
print("Has Charlie?", "Charlie" in hash_map)`,
    java: `import java.util.HashMap;
public class YourClassName {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Alice", 25); map.put("Bob", 30);
        System.out.println("Alice's age: " + map.get("Alice"));
        System.out.println("Has Charlie? " + map.containsKey("Charlie"));
    }
}`,
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    unordered_map<string, int> map;
    map["Alice"] = 25; map["Bob"] = 30;
    cout << "Alice's age: " << map["Alice"] << endl;
    cout << "Has Charlie? " << (map.count("Charlie") > 0) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("C does not have built-in HashMaps.\\n"); return 0; }`
  },
  'HashSet Basics': {
    javascript: `let set = new Set();
set.add(10); set.add(20); set.add(10);
console.log("Set size (ignores duplicates):", set.size);
console.log("Has 20?", set.has(20));`,
    python: `hash_set = {10, 20}
hash_set.add(10)
print("Set length:", len(hash_set))
print("Has 20?", 20 in hash_set)`,
    java: `import java.util.HashSet;
public class YourClassName {
    public static void main(String[] args) {
        HashSet<Integer> set = new HashSet<>();
        set.add(10); set.add(20); set.add(10);
        System.out.println("Set size: " + set.size());
        System.out.println("Has 20? " + set.contains(20));
    }
}`,
    cpp: `#include <iostream>
#include <unordered_set>
using namespace std;
int main() {
    unordered_set<int> set;
    set.insert(10); set.insert(20); set.insert(10);
    cout << "Set size: " << set.size() << endl;
    cout << "Has 20? " << (set.count(20) > 0) << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("C does not have built-in HashSets.\\n"); return 0; }`
  },
  'Collision Handling': {
    javascript: `// Collision Handling
console.log("Hash maps handle collisions usually via Chaining (Linked Lists) or Open Addressing.");`,
    python: `print("Python dicts handle collisions via Open Addressing with probing.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Java HashMap uses Chaining, then converts to TreeNodes."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "C++ unordered_map uses Separate Chaining." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Collision Handling.\\n"); return 0; }`
  },
  'Load Factor': {
    javascript: `// Load Factor = (Number of elements) / (Number of buckets)
console.log("When the load factor exceeds a threshold (often 0.75), the hash table resizes.");`,
    python: `print("Python resizes its dict when it's 2/3 full.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Java default Load Factor is 0.75."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "C++ maximum load factor is usually 1.0." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Load Factor.\\n"); return 0; }`
  },
  'Pattern: Frequency Count': {
    javascript: `// See 01. Count Frequency\nconsole.log("Frequency Count uses a Hash Map to store Element -> Count.");`,
    python: `print("Frequency Count uses a Hash Map.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Frequency Count uses HashMap."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Frequency Count." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Frequency Count.\\n"); return 0; }`
  },
  'Pattern: Existence Check': {
    javascript: `// Using a Set for O(1) existence checks
let arr = [1, 2, 3, 4], set = new Set(arr);
console.log("Exists 3?", set.has(3)); // O(1)`,
    python: `arr_set = set([1, 2, 3, 4])
print("Exists 3?", 3 in arr_set)`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        HashSet<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3, 4));
        System.out.println("Exists 3? " + set.contains(3));
    }
}`,
    cpp: `#include <iostream>
#include <unordered_set>
using namespace std;
int main() {
    unordered_set<int> set = {1, 2, 3, 4};
    cout << "Exists 3? " << set.count(3) << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Existence Check.\\n"); return 0; }`
  },
  'Pattern: Subarray Sum': {
    javascript: `// Prefix Sum + Hash Map pattern
console.log("Subarray Sum problems use a Map of PrefixSum -> Frequency.");`,
    python: `print("Subarray Sum uses PrefixSum -> Frequency map.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Subarray Sum Pattern."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Subarray Sum Pattern." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Subarray Sum Pattern.\\n"); return 0; }`
  },

  // --- TOP 20 HASHING PROBLEMS ---
  '01. Count Frequency': {
    javascript: `function countFreq(arr) {
    const map = new Map();
    for(let num of arr) map.set(num, (map.get(num)||0)+1);
    for(let [k,v] of map) console.log(k, "->", v);
}
countFreq([1,1,2,3,3,3]);`,
    python: `def count_freq(arr):
    freq = {}
    for num in arr: freq[num] = freq.get(num, 0) + 1
    for k, v in freq.items(): print(f"{k} -> {v}")
count_freq([1,1,2,3,3,3])`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1,1,2,3,3,3};
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int num : arr) map.put(num, map.getOrDefault(num, 0) + 1);
        System.out.println(map);
    }
}`,
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    int arr[] = {1,1,2,3,3,3};
    unordered_map<int, int> map;
    for(int x : arr) map[x]++;
    for(auto p : map) cout << p.first << "->" << p.second << " ";
    cout << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int arr[] = {1,1,2,3,3,3}, freq[10] = {0};
    for(int i=0; i<6; i++) freq[arr[i]]++;
    for(int i=0; i<10; i++) if(freq[i]) printf("%d->%d ", i, freq[i]);
    return 0;
}`
  },
  '02. Element Appearing Once': {
    javascript: `function singleNumber(nums) {
    let xor = 0;
    for(let num of nums) xor ^= num;
    return xor;
}
console.log("Appears once:", singleNumber([4,1,2,1,2]));`,
    python: `def single_number(nums):
    xor = 0
    for num in nums: xor ^= num
    return xor
print("Appears once:", single_number([4,1,2,1,2]))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {4,1,2,1,2}; int xor = 0;
        for(int num : nums) xor ^= num;
        System.out.println("Appears once: " + xor);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> nums = {4,1,2,1,2}; int xor_val = 0;
    for(int num : nums) xor_val ^= num;
    cout << "Appears once: " << xor_val << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int nums[] = {4,1,2,1,2}, xor_val = 0;
    for(int i=0; i<5; i++) xor_val ^= nums[i];
    printf("Appears once: %d\\n", xor_val); return 0;
}`
  },
  '03. Two Sum Hash': {
    javascript: `function twoSum(nums, target) {
    let map = new Map();
    for(let i=0; i<nums.length; i++) {
        let comp = target - nums[i];
        if(map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
}
console.log(twoSum([2,7,11,15], 9));`,
    python: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in num_map: return [num_map[comp], i]
        num_map[num] = i
    return []
print(two_sum([2,7,11,15], 9))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {2,7,11,15}; int target = 9;
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int i=0; i<nums.length; i++) {
            int comp = target - nums[i];
            if(map.containsKey(comp)) {
                System.out.println("[" + map.get(comp) + ", " + i + "]"); return;
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
    vector<int> nums = {2,7,11,15}; int target = 9;
    unordered_map<int, int> map;
    for(int i=0; i<nums.size(); i++) {
        int comp = target - nums[i];
        if(map.count(comp)) { cout << "[" << map[comp] << ", " << i << "]" << endl; return 0; }
        map[nums[i]] = i;
    }
    return 0;
}`,
    c: `#include <stdio.h>
int main() { printf("Two Sum requires HashMap.\\n"); return 0; }`
  },
  '04. Four Sum': {
    javascript: `// Four Sum (LeetCode 18)
console.log("Four Sum uses Sorting + Two Pointers or HashMap for pairwise sums.");`,
    python: `print("Four Sum uses Sorting + Two Pointers or HashMap for pairwise sums.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Four Sum."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Four Sum." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Four Sum.\\n"); return 0; }`
  },
  '05. Subarray Sum Equals K': {
    javascript: `function subarraySum(nums, k) {
    let map = new Map(), sum = 0, count = 0;
    map.set(0, 1);
    for(let num of nums) {
        sum += num;
        if(map.has(sum - k)) count += map.get(sum - k);
        map.set(sum, (map.get(sum)||0) + 1);
    }
    return count;
}
console.log("Subarrays summing to 2:", subarraySum([1,1,1], 2));`,
    python: `def subarray_sum(nums, k):
    count_map = {0: 1}; curr_sum = 0; count = 0
    for num in nums:
        curr_sum += num
        if curr_sum - k in count_map: count += count_map[curr_sum - k]
        count_map[curr_sum] = count_map.get(curr_sum, 0) + 1
    return count
print("Subarrays summing to 2:", subarray_sum([1,1,1], 2))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {1,1,1}; int k = 2;
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); int sum = 0, count = 0;
        for(int num : nums) {
            sum += num;
            if(map.containsKey(sum - k)) count += map.get(sum - k);
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        System.out.println("Subarrays summing to 2: " + count);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    vector<int> nums = {1,1,1}; int k = 2, sum = 0, count = 0;
    unordered_map<int, int> map; map[0] = 1;
    for(int num : nums) {
        sum += num;
        if(map.count(sum - k)) count += map[sum - k];
        map[sum]++;
    }
    cout << "Subarrays summing to 2: " << count << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Subarray Sum Equals K requires HashMap.\\n"); return 0; }`
  },
  '06. Subarray XOR': {
    javascript: `// Subarrays with given XOR
function subarrayXOR(nums, k) {
    let map = new Map(), xor = 0, count = 0;
    map.set(0, 1);
    for(let num of nums) {
        xor ^= num;
        if(map.has(xor ^ k)) count += map.get(xor ^ k);
        map.set(xor, (map.get(xor)||0) + 1);
    }
    return count;
}
console.log("Subarrays with XOR 6:", subarrayXOR([4,2,2,6,4], 6));`,
    python: `def subarray_xor(nums, k):
    xor_map = {0: 1}; xor_val = 0; count = 0
    for num in nums:
        xor_val ^= num
        if xor_val ^ k in xor_map: count += xor_map[xor_val ^ k]
        xor_map[xor_val] = xor_map.get(xor_val, 0) + 1
    return count
print("Subarrays with XOR 6:", subarray_xor([4,2,2,6,4], 6))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {4,2,2,6,4}; int k = 6;
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); int xor = 0, count = 0;
        for(int num : nums) {
            xor ^= num;
            if(map.containsKey(xor ^ k)) count += map.get(xor ^ k);
            map.put(xor, map.getOrDefault(xor, 0) + 1);
        }
        System.out.println("Subarrays with XOR 6: " + count);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    vector<int> nums = {4,2,2,6,4}; int k = 6, xor_val = 0, count = 0;
    unordered_map<int, int> map; map[0] = 1;
    for(int num : nums) {
        xor_val ^= num;
        if(map.count(xor_val ^ k)) count += map[xor_val ^ k];
        map[xor_val]++;
    }
    cout << "Subarrays with XOR 6: " << count << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Subarray XOR requires HashMap.\\n"); return 0; }`
  },
  '07. Group Anagrams': {
    javascript: `// See Strings section: Group Anagrams
console.log("Group Anagrams hashes strings based on sorted chars or freq count.");`,
    python: `print("Group Anagrams hashes strings based on sorted chars.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Group Anagrams."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Group Anagrams." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Group Anagrams.\\n"); return 0; }`
  },
  '08. Distinct in Window': {
    javascript: `function countDistinct(arr, k) {
    let map = new Map(), res = [];
    for(let i=0; i<arr.length; i++) {
        map.set(arr[i], (map.get(arr[i])||0)+1);
        if(i >= k) {
            let left = arr[i-k];
            map.set(left, map.get(left)-1);
            if(map.get(left) === 0) map.delete(left);
        }
        if(i >= k-1) res.push(map.size);
    }
    return res;
}
console.log(countDistinct([1,2,1,3,4,2,3], 4));`,
    python: `def count_distinct(arr, k):
    from collections import defaultdict
    count_map = defaultdict(int); res = []
    for i in range(len(arr)):
        count_map[arr[i]] += 1
        if i >= k:
            left = arr[i-k]
            count_map[left] -= 1
            if count_map[left] == 0: del count_map[left]
        if i >= k-1: res.append(len(count_map))
    return res
print(count_distinct([1,2,1,3,4,2,3], 4))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1,2,1,3,4,2,3}; int k = 4;
        HashMap<Integer, Integer> map = new HashMap<>();
        List<Integer> res = new ArrayList<>();
        for(int i=0; i<arr.length; i++) {
            map.put(arr[i], map.getOrDefault(arr[i], 0) + 1);
            if(i >= k) {
                int left = arr[i-k];
                map.put(left, map.get(left) - 1);
                if(map.get(left) == 0) map.remove(left);
            }
            if(i >= k-1) res.add(map.size());
        }
        System.out.println(res);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    vector<int> arr = {1,2,1,3,4,2,3}; int k = 4;
    unordered_map<int, int> map; vector<int> res;
    for(int i=0; i<arr.size(); i++) {
        map[arr[i]]++;
        if(i >= k) {
            int left = arr[i-k]; map[left]--;
            if(map[left] == 0) map.erase(left);
        }
        if(i >= k-1) res.push_back(map.size());
    }
    for(int x : res) cout << x << " "; cout << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Distinct in Window requires HashMap.\\n"); return 0; }`
  },
  '09. Duplicate in K Distance': {
    javascript: `function containsNearbyDuplicate(nums, k) {
    let map = new Map();
    for(let i=0; i<nums.length; i++) {
        if(map.has(nums[i]) && i - map.get(nums[i]) <= k) return true;
        map.set(nums[i], i);
    }
    return false;
}
console.log(containsNearbyDuplicate([1,2,3,1], 3));`,
    python: `def contains_nearby_duplicate(nums, k):
    num_map = {}
    for i, num in enumerate(nums):
        if num in num_map and i - num_map[num] <= k: return True
        num_map[num] = i
    return False
print(contains_nearby_duplicate([1,2,3,1], 3))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {1,2,3,1}; int k = 3;
        HashMap<Integer, Integer> map = new HashMap<>();
        boolean found = false;
        for(int i=0; i<nums.length; i++) {
            if(map.containsKey(nums[i]) && i - map.get(nums[i]) <= k) { found = true; break; }
            map.put(nums[i], i);
        }
        System.out.println(found);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    vector<int> nums = {1,2,3,1}; int k = 3;
    unordered_map<int, int> map; bool found = false;
    for(int i=0; i<nums.size(); i++) {
        if(map.count(nums[i]) && i - map[nums[i]] <= k) { found = true; break; }
        map[nums[i]] = i;
    }
    cout << (found ? "true" : "false") << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Duplicate in K Distance requires HashMap.\\n"); return 0; }`
  },
  '10. Isomorphic Strings': {
    javascript: `function isIsomorphic(s, t) {
    if(s.length !== t.length) return false;
    let m1 = new Map(), m2 = new Map();
    for(let i=0; i<s.length; i++) {
        if(m1.get(s[i]) !== m2.get(t[i])) return false;
        m1.set(s[i], i + 1); m2.set(t[i], i + 1);
    }
    return true;
}
console.log(isIsomorphic("egg", "add"));`,
    python: `def is_isomorphic(s, t):
    if len(s) != len(t): return False
    return [s.find(i) for i in s] == [t.find(j) for j in t]
print(is_isomorphic("egg", "add"))`,
    java: `public class YourClassName {
    public static void main(String[] args) {
        String s = "egg", t = "add";
        int[] m1 = new int[256], m2 = new int[256];
        boolean iso = true;
        for(int i=0; i<s.length(); i++) {
            if(m1[s.charAt(i)] != m2[t.charAt(i)]) { iso = false; break; }
            m1[s.charAt(i)] = i + 1; m2[t.charAt(i)] = i + 1;
        }
        System.out.println(iso);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    string s = "egg", t = "add";
    vector<int> m1(256, 0), m2(256, 0); bool iso = true;
    for(int i=0; i<s.length(); i++) {
        if(m1[s[i]] != m2[t[i]]) { iso = false; break; }
        m1[s[i]] = i + 1; m2[t[i]] = i + 1;
    }
    cout << (iso ? "true" : "false") << endl; return 0;
}`,
    c: `#include <stdio.h>
int main() {
    char s[]="egg", t[]="add";
    int m1[256]={0}, m2[256]={0}, iso=1;
    for(int i=0; s[i]; i++) {
        if(m1[s[i]] != m2[t[i]]) { iso = 0; break; }
        m1[s[i]] = i + 1; m2[t[i]] = i + 1;
    }
    printf("%s\\n", iso ? "true" : "false"); return 0;
}`
  },
  '11. Longest Consecutive Sequence': {
    javascript: `function longestConsecutive(nums) {
    let set = new Set(nums), max = 0;
    for(let num of set) {
        if(!set.has(num - 1)) {
            let curr = num, currStreak = 1;
            while(set.has(curr + 1)) { curr++; currStreak++; }
            max = Math.max(max, currStreak);
        }
    }
    return max;
}
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));`,
    python: `def longest_consecutive(nums):
    num_set = set(nums)
    longest = 0
    for num in num_set:
        if num - 1 not in num_set:
            curr = num; streak = 1
            while curr + 1 in num_set: curr += 1; streak += 1
            longest = max(longest, streak)
    return longest
print(longest_consecutive([100, 4, 200, 1, 3, 2]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {100, 4, 200, 1, 3, 2};
        HashSet<Integer> set = new HashSet<>();
        for(int num : nums) set.add(num);
        int longest = 0;
        for(int num : set) {
            if(!set.contains(num - 1)) {
                int curr = num, streak = 1;
                while(set.contains(curr + 1)) { curr++; streak++; }
                longest = Math.max(longest, streak);
            }
        }
        System.out.println(longest);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;
int main() {
    vector<int> nums = {100, 4, 200, 1, 3, 2};
    unordered_set<int> set(nums.begin(), nums.end());
    int longest = 0;
    for(int num : set) {
        if(!set.count(num - 1)) {
            int curr = num, streak = 1;
            while(set.count(curr + 1)) { curr++; streak++; }
            longest = max(longest, streak);
        }
    }
    cout << longest << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Longest Consecutive Sequence uses HashSet.\\n"); return 0; }`
  },
  '12. Intersection of Arrays': {
    javascript: `function intersection(nums1, nums2) {
    let set1 = new Set(nums1), res = new Set();
    for(let num of nums2) if(set1.has(num)) res.add(num);
    return Array.from(res);
}
console.log(intersection([1,2,2,1], [2,2]));`,
    python: `def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))
print(intersection([1,2,2,1], [2,2]))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums1 = {1,2,2,1}, nums2 = {2,2};
        HashSet<Integer> set1 = new HashSet<>(), res = new HashSet<>();
        for(int num : nums1) set1.add(num);
        for(int num : nums2) if(set1.contains(num)) res.add(num);
        System.out.println(res);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;
int main() {
    vector<int> nums1 = {1,2,2,1}, nums2 = {2,2};
    unordered_set<int> set1(nums1.begin(), nums1.end()), res;
    for(int num : nums2) if(set1.count(num)) res.insert(num);
    for(int num : res) cout << num << " "; cout << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Intersection uses HashSet.\\n"); return 0; }`
  },
  '13. Max Points on a Line': {
    javascript: `// Max Points on a Line (LeetCode 149)
console.log("Max Points on a Line hashes the slope (dy/dx) of points.");`,
    python: `print("Max Points on a Line hashes the slope (dy/dx) of points.")`,
    java: `public class YourClassName { public static void main(String[] args) { System.out.println("Hashes slope using GCD."); } }`,
    cpp: `#include <iostream>\nusing namespace std; int main() { cout << "Hashes slope using GCD." << endl; return 0; }`,
    c: `#include <stdio.h>\nint main() { printf("Hashes slope.\\n"); return 0; }`
  },
  '14. Top K Frequent Elements': {
    javascript: `function topKFrequent(nums, k) {
    let map = new Map();
    for(let num of nums) map.set(num, (map.get(num)||0)+1);
    let arr = Array.from(map.entries()).sort((a,b) => b[1] - a[1]);
    return arr.slice(0, k).map(a => a[0]);
}
console.log(topKFrequent([1,1,1,2,2,3], 2));`,
    python: `def top_k_frequent(nums, k):
    from collections import Counter
    return [item[0] for item in Counter(nums).most_common(k)]
print(top_k_frequent([1,1,1,2,2,3], 2))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] nums = {1,1,1,2,2,3}; int k = 2;
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int num : nums) map.put(num, map.getOrDefault(num, 0) + 1);
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> map.get(a) - map.get(b));
        for(int num : map.keySet()) { pq.add(num); if(pq.size() > k) pq.poll(); }
        System.out.println(pq);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;
int main() {
    vector<int> nums = {1,1,1,2,2,3}; int k = 2;
    unordered_map<int, int> map;
    for(int num : nums) map[num]++;
    auto comp = [&map](int a, int b) { return map[a] > map[b]; };
    priority_queue<int, vector<int>, decltype(comp)> pq(comp);
    for(auto& p : map) { pq.push(p.first); if(pq.size() > k) pq.pop(); }
    while(!pq.empty()) { cout << pq.top() << " "; pq.pop(); } cout << endl;
    return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Top K Frequent uses HashMap and Heap.\\n"); return 0; }`
  },
  '15. Find All Anagrams': {
    javascript: `function findAnagrams(s, p) {
    let res = [], pMap = {}, sMap = {};
    if(s.length < p.length) return res;
    for(let i=0; i<p.length; i++) {
        pMap[p[i]] = (pMap[p[i]]||0)+1;
        sMap[s[i]] = (sMap[s[i]]||0)+1;
    }
    let match = () => Object.keys(pMap).every(k => pMap[k] === sMap[k]);
    if(match()) res.push(0);
    for(let i=p.length; i<s.length; i++) {
        sMap[s[i]] = (sMap[s[i]]||0)+1;
        let left = s[i-p.length];
        sMap[left]--; if(sMap[left] === 0) delete sMap[left];
        if(match()) res.push(i-p.length+1);
    }
    return res;
}
console.log(findAnagrams("cbaebabacd", "abc"));`,
    python: `def find_anagrams(s, p):
    from collections import Counter
    res, pCount, sCount = [], Counter(p), Counter(s[:len(p)-1])
    for i in range(len(p)-1, len(s)):
        sCount[s[i]] += 1
        if sCount == pCount: res.append(i - len(p) + 1)
        sCount[s[i - len(p) + 1]] -= 1
        if sCount[s[i - len(p) + 1]] == 0: del sCount[s[i - len(p) + 1]]
    return res
print(find_anagrams("cbaebabacd", "abc"))`,
    java: `import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        String s = "cbaebabacd", p = "abc";
        List<Integer> res = new ArrayList<>();
        if(s.length() < p.length()) return;
        int[] pCount = new int[26], sCount = new int[26];
        for(char c : p.toCharArray()) pCount[c-'a']++;
        for(int i=0; i<s.length(); i++) {
            sCount[s.charAt(i)-'a']++;
            if(i >= p.length()) sCount[s.charAt(i-p.length())-'a']--;
            if(Arrays.equals(pCount, sCount)) res.add(i - p.length() + 1);
        }
        System.out.println(res);
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    string s = "cbaebabacd", p = "abc";
    vector<int> res, pCount(26,0), sCount(26,0);
    if(s.length() < p.length()) return 0;
    for(char c : p) pCount[c-'a']++;
    for(int i=0; i<s.length(); i++) {
        sCount[s[i]-'a']++;
        if(i >= p.length()) sCount[s[i-p.length()]-'a']--;
        if(pCount == sCount) res.push_back(i - p.length() + 1);
    }
    for(int x : res) cout << x << " "; cout << endl; return 0;
}`,
    c: `#include <stdio.h>\nint main() { printf("Find All Anagrams uses Sliding Window and Frequency Map.\\n"); return 0; }`
  }
};
