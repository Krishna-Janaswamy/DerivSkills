export const BACKTRACKING_PROBLEMS_CODE = {
  '01/02. Subsets I/II': {
    javascript: `// Subsets
function subsets(nums) {
    const res = [];
    function backtrack(start, path) {
        res.push([...path]);
        for(let i=start; i<nums.length; i++) {
            path.push(nums[i]);
            backtrack(i+1, path);
            path.pop();
        }
    }
    backtrack(0, []);
    return res;
}
console.log(subsets([1,2]));`,
    python: `# Subsets
def subsets(nums):
    res = []
    def backtrack(start, path):
        res.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i+1, path)
            path.pop()
    backtrack(0, [])
    return res
print(subsets([1,2]))`,
    java: `// Subsets
import java.util.*;
public class YourClassName {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), nums, 0);
        return res;
    }
    private static void backtrack(List<List<Integer>> res, List<Integer> path, int[] nums, int start) {
        res.add(new ArrayList<>(path));
        for(int i=start; i<nums.length; i++) {
            path.add(nums[i]);
            backtrack(res, path, nums, i+1);
            path.remove(path.size()-1);
        }
    }
    public static void main(String[] args) {
        System.out.println(subsets(new int[]{1,2}));
    }
}`,
    cpp: `// Subsets
#include <iostream>
#include <vector>
using namespace std;
void backtrack(vector<vector<int>>& res, vector<int>& path, vector<int>& nums, int start) {
    res.push_back(path);
    for(int i=start; i<nums.size(); i++) {
        path.push_back(nums[i]);
        backtrack(res, path, nums, i+1);
        path.pop_back();
    }
}
int main() {
    vector<int> nums = {1,2};
    vector<vector<int>> res;
    vector<int> path;
    backtrack(res, path, nums, 0);
    cout << "Subsets generated" << endl;
    return 0;
}`,
    c: `// Subsets
#include <stdio.h>
int main() { printf("Subsets\\n"); return 0; }`
  }
};
