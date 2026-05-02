export const BIT_MANIPULATION_PROBLEMS_CODE = {
  '01. Count bits': {
    javascript: `// Single Number
function singleNumber(nums) {
    let res = 0;
    for(let num of nums) res ^= num;
    return res;
}
console.log(singleNumber([4,1,2,1,2]));`,
    python: `# Single Number
def single_number(nums):
    res = 0
    for num in nums:
        res ^= num
    return res
print(single_number([4,1,2,1,2]))`,
    java: `public class YourClassName {
    public static int singleNumber(int[] nums) {
        int res = 0;
        for(int num : nums) res ^= num;
        return res;
    }
    public static void main(String[] args) {
        System.out.println(singleNumber(new int[]{4,1,2,1,2}));
    }
}`,
    cpp: `// Single Number
#include <iostream>
#include <vector>
using namespace std;
int singleNumber(vector<int>& nums) {
    int res = 0;
    for(int num : nums) res ^= num;
    return res;
}
int main() {
    vector<int> nums = {4,1,2,1,2};
    cout << singleNumber(nums) << endl;
    return 0;
}`,
    c: `// Single Number
#include <stdio.h>
int singleNumber(int* nums, int numsSize) {
    int res = 0;
    for(int i=0; i<numsSize; i++) res ^= nums[i];
    return res;
}
int main() {
    int nums[] = {4,1,2,1,2};
    printf("%d\\n", singleNumber(nums, 5));
    return 0;
}`
  }
};
