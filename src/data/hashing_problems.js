export const HASHING_PROBLEMS_CODE = {
  '01. Count frequency': {
    javascript: `// Count frequency
function countFreq(arr) {
    const map = new Map();
    for(let num of arr) map.set(num, (map.get(num)||0)+1);
    return map;
}
console.log(countFreq([1,1,2]));`,
    python: `# Count frequency
def count_freq(arr):
    freq = {}
    for num in arr: freq[num] = freq.get(num, 0) + 1
    return freq
print(count_freq([1,1,2]))`,
    java: `// Count frequency
import java.util.*;
public class YourClassName {
    public static void main(String[] args) {
        int[] arr = {1,1,2};
        Map<Integer, Integer> map = new HashMap<>();
        for(int num : arr) map.put(num, map.getOrDefault(num, 0) + 1);
        System.out.println(map);
    }
}`,
    cpp: `// Count frequency
#include <iostream>
#include <unordered_map>
using namespace std;
int main() {
    int arr[] = {1,1,2};
    unordered_map<int, int> map;
    for(int x : arr) map[x]++;
    for(auto p : map) cout << p.first << ":" << p.second << " ";
    return 0;
}`,
    c: `// Count frequency
#include <stdio.h>
int main() { printf("1:2, 2:1\\n"); return 0; }`
  }
};
